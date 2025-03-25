import { NextRequest, NextResponse } from "next/server";
import { getLogtoContext, getAccessToken } from "@logto/next/server-actions";
import { logtoConfig } from "@/lib/config";
import { Logto } from "@/lib/external/Logto";
import { AxiosError } from "axios";

export async function POST(request: NextRequest) {
  const user = await getLogtoContext(logtoConfig);
  const token = await getAccessToken(logtoConfig);

  if (!user.isAuthenticated) {
    return NextResponse.json({ message: "未登录" });
  }

  const { provider } = await request.json();

  try {
    const social = await Logto.CreateSocialIdentity(provider, token);
    return NextResponse.json(social);
  } catch (error) {
    console.error('Social identity creation error:', (error as AxiosError).response?.data);
    return NextResponse.json({ message: `创建失败: ${(error as Error).message}` });
  }
}