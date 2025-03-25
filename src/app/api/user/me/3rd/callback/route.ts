import { NextRequest, NextResponse } from "next/server";
import { getLogtoContext, getAccessToken } from "@logto/next/server-actions";
import { logtoConfig } from "@/lib/config";
import { Logto } from "@/lib/external/Logto";

export async function GET(request: NextRequest) {
  const user = await getLogtoContext(logtoConfig);
  const token = await getAccessToken(logtoConfig);

  if (!user.isAuthenticated) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/settings?error=unauthorized`);
  }

  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/settings?error=${error}`);
  }

  if (!code || !state) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/settings?error=invalid_request`);
  }

  try {
    await Logto.VerifySocialIdentity(state, {
      code,
      state,
      redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/user/me/3rd/callback`,
    }, token);

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/settings?success=true`);
  } catch (error) {
    console.error('Social identity verification error:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/settings?error=verification_failed`);
  }
}
