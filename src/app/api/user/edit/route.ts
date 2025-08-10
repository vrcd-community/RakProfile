import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { logtoConfig } from "@/lib/config";
import { getLogtoContext } from "@logto/next/server-actions";
import { Logto } from "@/lib/external/Logto";
import { censor } from "@/lib/external/SiliconFlow";

const editUserSchema = z.object({
  uid: z.string(),
  nickname: z.string().min(1).max(20).optional(),
  bio: z.string().max(500).optional(),
  avatar: z.string().optional(),
})

export async function POST(request: NextRequest) {
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);

  // 拒绝未认证用户
  if (!isAuthenticated) {
    return NextResponse.json({ error: "未登录" });
  }

  const body = await request.json();
  const parsedBody = editUserSchema.safeParse(body);

  let sub = claims?.sub;

  if (!parsedBody.success) {
    return NextResponse.json({ error: "参数错误", detail: parsedBody.error });
  }

  const isAdmin = claims?.roles?.includes("RakAdmin")

  if (isAdmin) {
    if (!parsedBody.data?.uid) {
      return NextResponse.json({ error: "参数错误", detail: "uid is required" });
    } else {
      sub = parsedBody.data.uid
    }
  }

  if (sub !== parsedBody.data?.uid) {
    return NextResponse.json({ error: "权限不足" });
  }

  try {
    if (parsedBody.data.bio) {
      const bioCensorResult = (parsedBody.data.bio && !isAdmin) ? await censor(parsedBody.data.bio) : { pass: true, message: "" };

      if (parsedBody.data.bio && !bioCensorResult.pass) {
        return NextResponse.json({ error: "个人简介不合法" });
      }

      await Logto.UpdateCustomData(sub, {
        bio: parsedBody.data.bio,
        "censor.bio": JSON.stringify(bioCensorResult)
      })
    }

    await Logto.updateUser(sub, {
      name: parsedBody.data.nickname,
      avatar: parsedBody.data.avatar
    })

    return NextResponse.json({ message: "修改成功", success: true });
  } catch (error) {
    return NextResponse.json({ message: "内部错误", error: (error as any).message || "Unknown error" });
  }
}