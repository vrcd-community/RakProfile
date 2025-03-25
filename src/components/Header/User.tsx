import SignIn from "@/components/Logto/SignIn";
import { getLogtoContext, signIn } from "@logto/next/server-actions";
import { logtoConfig } from "@/lib/config";
import { User2 } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export async function User() {
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);

  return (
    isAuthenticated ? (
      <Button
        variant="ghost"
        className="h-8 hover:scale-110 active:scale-90 transition-transform duration-200"
        asChild
      >
        <Link href={`/profile/${claims?.sub!}?edit=1`}>
          <User2 />
          个人资料
        </Link>
      </Button>
    ) : (
      <SignIn onSignIn={async () => {
        "use server";
        await signIn({
          ...logtoConfig,
          scopes: ["custom_data", "roles", "openid", "profile", "identities"]
        })
      }} />
    )
  )
}