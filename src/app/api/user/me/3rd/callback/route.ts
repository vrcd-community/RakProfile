import { NextRequest, NextResponse } from "next/server";
import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "@/lib/config";
import { Logto } from "@/lib/external/Logto";

export async function GET(request: NextRequest) {
  const user = await getLogtoContext(logtoConfig);

  if (!user.isAuthenticated) {
    return NextResponse.redirect(`${process.env.LOGTO_AUTH_BASE_URL}`);
  }

  const sub = user.claims?.sub!;

  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(`${process.env.LOGTO_AUTH_BASE_URL}/profile/${sub}?error=${error}`);
  }

  if (!code || !state) {
    return NextResponse.redirect(`${process.env.LOGTO_AUTH_BASE_URL}/profile/${sub}?error=invalid_request`);
  }

  try {
    console.log('Social identity verification started');
    console.log('Code:', code);
    console.log('State:', state);
    console.log('Redirect URI:', `${process.env.LOGTO_AUTH_BASE_URL}/api/user/me/3rd/callback`);

    const resp = await Logto.VerifySocialIdentity(state, sub, {
      code,
      state,
      redirectUri: `${process.env.LOGTO_AUTH_BASE_URL}/api/user/me/3rd/callback`,
    });

    console.log('Social identity verification response:', resp);

    return NextResponse.redirect(`${process.env.LOGTO_AUTH_BASE_URL}/profile/${sub}?success=true`);
  } catch (error) {
    console.error('Social identity verification error:', error);
    return NextResponse.redirect(`${process.env.LOGTO_AUTH_BASE_URL}/profile/${sub}?error=verification_failed`);
  }
}
