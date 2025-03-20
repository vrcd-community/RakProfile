import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { logtoConfig } from "@/lib/config";
import { getLogtoContext } from "@logto/next/server-actions";
import { Logto } from "@/lib/external/Logto";
import { censor } from "@/lib/external/SiliconFlow";
import { db } from "@/lib/db";

const editUserSchema = z.object({
  uid: z.string(),
  nickname: z.string().min(1).max(20),
  bio: z.string().max(500).optional(),
})

export async function POST(request: NextRequest) {
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);

  // 拒绝未认证用户
  if (!isAuthenticated) {
    return NextResponse.json({ message: "未登录" });
  }

  const body = await request.json();
  const parsedBody = editUserSchema.safeParse(body);

  let sub = claims?.sub;

  if (!parsedBody.success) {
    return NextResponse.json({ message: "参数错误", error: parsedBody.error });
  }

  const isAdmin = claims?.roles?.includes("RakAdmin")

  if (isAdmin) {
    if (!parsedBody.data?.uid) {
      return NextResponse.json({ message: "参数错误", error: "uid is required" });
    } else {
      sub = parsedBody.data.uid
    }
  }

  if (sub !== parsedBody.data?.uid) {
    return NextResponse.json({ message: "权限不足" });
  }

  try {
    const bioCensorResult = (parsedBody.data.bio && !isAdmin) ? await censor(parsedBody.data.bio) : { pass: true, message: "" };

    if (parsedBody.data.bio && bioCensorResult.pass === false) {
      return NextResponse.json({ message: "个人简介不合法" });
    }

    await Logto.updateUser(sub, {
      name: parsedBody.data.nickname
    })

    await Logto.UpdateCustomData(sub, {
      bio: parsedBody.data.bio,
      "censor.bio": JSON.stringify(bioCensorResult)
    })

    await db.User.where("logto_id", sub).update({
      name: parsedBody.data.nickname,
    })

    return NextResponse.json({ message: "修改成功", success: true });
  } catch (error) {
    return NextResponse.json({ message: "内部错误", error: (error as any).message || "Unknown error" });
  }
}