import { NextRequest, NextResponse } from "next/server";
import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "@/lib/config";
import { Logto } from "@/lib/external/Logto";

const allowedTypes = [
  "Totp",
  "WebAuthn",
  "BackupCode"
]

export async function GET(request: NextRequest) {
  const user = await getLogtoContext(logtoConfig);

  if (!user.isAuthenticated) {
    return NextResponse.json({ message: "未登录" });
  }

  const sub = user.claims?.sub!

  if (!sub) {
    return NextResponse.json({ message: "未登录" });
  }

  try {
    const mfa = await Logto.getMFA(sub);

    return NextResponse.json({ mfa });
  } catch (error) {
    return NextResponse.json({ message: "获取失败" });
  }
}

export async function POST(request: NextRequest) {
  const user = await getLogtoContext(logtoConfig);

  if (!user.isAuthenticated) {
    return NextResponse.json({ message: "未登录" });
  }

  const sub = user.claims?.sub!

  if (!sub) {
    return NextResponse.json({ message: "未登录" });
  }

  const { type } = await request.json();
  
  if (!allowedTypes.includes(type)) {
    return NextResponse.json({ message: "不支持的类型" });
  }

  try {
    const mfa = await Logto.CreateMFA(sub, type);

    return NextResponse.json({ mfa });
  } catch (error) {
    return NextResponse.json({ message: "创建失败" });
  }
}

export async function DELETE(request: NextRequest) {
  const user = await getLogtoContext(logtoConfig);

  if (!user.isAuthenticated) {
    return NextResponse.json({ message: "未登录" });
  }

  const sub = user.claims?.sub!

  if (!sub) {
    return NextResponse.json({ message: "未登录" });
  }

  const { mfaId } = await request.json();

  try {
    await Logto.DeleteMFA(sub, mfaId);

    return NextResponse.json({ message: "删除成功" });
  } catch (error) {
    return NextResponse.json({ message: "删除失败" });
  }
}
