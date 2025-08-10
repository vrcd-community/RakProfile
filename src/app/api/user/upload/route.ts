import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "@/lib/config";

const s3Client = new S3Client({
  region: process.env.S3_REGION || "auto",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
  endpoint: process.env.S3_ENDPOINT,
  forcePathStyle: true
});

// 处理文件上传的POST请求
export async function POST(request: NextRequest) {
  try {
    const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);

    if (!isAuthenticated || !claims) {
      return NextResponse.json(
        { error: "用户未登录" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const uid = formData.get("uid") as string;

    if (!file) {
      return NextResponse.json(
        { error: "没有找到上传的文件" },
        { status: 400 }
      );
    }

    const MAX_SIZE = 2 * 1024 * 1024; // 2MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "文件大小超过限制" },
        { status: 400 }
      )
    }

    const ext = file.name.split(".").pop();
    const isAdmin = claims.roles?.includes("RakAdmin");

    // 生成唯一的文件名
    const fileName = isAdmin ? `logto-avatar/${uid}.${ext}` : `logto-avatar/${claims.sub}.${ext}`
    const buffer = await file.arrayBuffer();

    // 配置S3上传参数
    const params = {
      Bucket: process.env.S3_BUCKET!,
      Key: fileName,
      Body: Buffer.from(buffer),
      ContentType: file.type,
    };

    // 执行上传
    await s3Client.send(new PutObjectCommand(params));

    // 返回上传成功的文件URL
    const fileUrl = `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}/${fileName}?_=${Date.now()}`;

    return NextResponse.json({
      data: {
        url: fileUrl
      }
    });

  } catch (error) {
    console.error("文件上传错误:", error);
    return NextResponse.json(
      { error: "文件上传失败" },
      { status: 500 }
    );
  }
}
