import { NextRequest, NextResponse } from "next/server";
import { logtoConfig } from "@/lib/config";
import { getLogtoContext } from "@logto/next/server-actions";
import { Logto } from "@/lib/external/Logto";

export async function GET(request: NextRequest, { params }: { params: { uid: string } }) {
  const uid = (await params).uid;
  const user = await getLogtoContext(logtoConfig);

  const isAdmin = user.isAuthenticated && user.claims?.roles?.includes("RakAdmin");

  if (uid === "me") {
    if (!user.isAuthenticated) {
      return NextResponse.json({ message: "未登录" });
    }

    const uid = user.claims?.sub!;

    const userInfo = await Logto.getUser(uid);

    return NextResponse.json({
      data: {
        user: {
          isAuthenticated: true,
          admin: isAdmin,
          censor: isAdmin ? JSON.parse(userInfo.customData['censor.bio'] as string || "{}") : undefined,
        },
        claims: {
          sub: userInfo.id,
          name: userInfo.name,
          picture: userInfo.avatar,
          bio: userInfo.customData.bio,
        }
      }
    });
  } else {
    const userInfo = await Logto.getUser(uid as string);

    return NextResponse.json({
      data: {
        user: {
          isAuthenticated: false,
          admin: isAdmin,
          censor: isAdmin ? JSON.parse(userInfo.customData['censor.bio'] as string || "{}") : undefined,
        },
        claims: {
          sub: userInfo.id,
          name: userInfo.name,
          picture: userInfo.avatar,
          bio: userInfo.customData.bio,
        }
      }
    })
  }
}
