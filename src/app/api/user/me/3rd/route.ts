import { NextRequest, NextResponse } from "next/server";
import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "@/lib/config";
import { Logto } from "@/lib/external/Logto";

export async function GET(request: NextRequest) {
  const user = await getLogtoContext(logtoConfig);

  if (!user.isAuthenticated) {
    return NextResponse.json({ message: "未登录" });
  }

  const sub = user.claims?.sub!;

  if (!sub) {
    return NextResponse.json({ message: "未登录" });
  }

  try {
    const logtoUser = await Logto.getUser(sub);
    const identities = logtoUser.identities;

    return NextResponse.json({
      data: {
        identities
      }
    });
  } catch (error) {
    return NextResponse.json({ message: "获取失败" });
  }
}