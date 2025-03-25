import { NextRequest, NextResponse } from "next/server";
import { Logto } from "@/lib/external/Logto";
import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "@/lib/config";

export async function POST(request: NextRequest) {
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);

  if (!isAuthenticated) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }
  
  const uid = claims?.sub

  if (!uid) {
    return NextResponse.json({ error: "用户ID缺失" }, { status: 400 });
  }

  const { old_password, password } = await request.json();
  
  try {
    await Logto.UpdatePassword(uid, old_password, password);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: `密码更新失败: ${(error as any).message}` }, { status: 500 });
  }
}