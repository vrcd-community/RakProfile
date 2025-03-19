import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { logtoConfig } from "@/lib/config";
import { getLogtoContext } from "@logto/next/server-actions";
import { Logto } from "@/lib/external/Logto";
import { censor } from "@/lib/external/SiliconFlow";
import { db } from "@/lib/db";

const editUserSchema = z.object({
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

  if (!parsedBody.success) {
    return NextResponse.json({ message: "参数错误", error: parsedBody.error });
  }

  try {
    const bioCensorResult = parsedBody.data.bio ? await censor(parsedBody.data.bio) : { pass: true, message: "" };

    if (parsedBody.data.bio && bioCensorResult.pass === false) {
      return NextResponse.json({ message: `个人简介不合法: ${bioCensorResult.message}` });
    }

    await Logto.updateUser(claims?.sub!, {
      name: parsedBody.data.nickname
    })

    await Logto.UpdateCustomData(claims?.sub!, {
      bio: parsedBody.data.bio
    })

    await db.User.where("logto_id", claims?.sub!).update({
      name: parsedBody.data.nickname,
    })

    return NextResponse.json({ message: "修改成功", success: true });
  } catch (error) {
    return NextResponse.json({ message: "内部错误", error: (error as any).message || "Unknown error" });
  }
}