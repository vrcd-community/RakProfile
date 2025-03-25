import { NextRequest, NextResponse } from "next/server";
import { logtoConfig } from "@/lib/config";
import { getLogtoContext } from "@logto/next/server-actions";
import { db } from "@/lib/db";
import { Logto } from "@/lib/external/Logto";

export async function GET(request: NextRequest) {
  const user = await getLogtoContext(logtoConfig);

  if (!user.isAuthenticated) {
    return NextResponse.json({ message: "未登录" });
  }

  const dbUser = await db.User.where("logto_id", user.claims?.sub).first();

  return NextResponse.json({
    message: "登录成功",
    user: {
      ...user,
      claims: {
        ...user.claims,
        picture: dbUser?.avatar,
        bio: dbUser?.custom_data ? JSON.parse(dbUser.custom_data).bio : ""
      }
    }
  });
}
