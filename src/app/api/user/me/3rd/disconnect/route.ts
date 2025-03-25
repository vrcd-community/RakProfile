import { NextRequest, NextResponse } from "next/server";
import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "@/lib/config";
import { Logto } from "@/lib/external/Logto";

export async function POST(request: NextRequest) {
  const user = await getLogtoContext(logtoConfig);

  if (!user.isAuthenticated) {
    return NextResponse.json({ message: "未登录" });
  }

  const sub = user.claims?.sub!;
  const { provider } = await request.json();

  if (!sub) {
    return NextResponse.json({ message: "未登录" });
  }

  try {
    await Logto.DeleteSocialIdentity(sub, provider);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: "删除失败" });
  }
} 