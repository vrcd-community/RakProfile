import { User2 } from "lucide-react"
import { getLogtoContext, signIn, signOut } from "@logto/next/server-actions";
import { logtoConfig } from "@/lib/config";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export async function User() {
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <User2 />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {
          isAuthenticated ? (
            <>
              <DropdownMenuItem>
                <p>欢迎 {claims?.username || claims?.sub}</p>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/edit">编辑资料</Link>
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem
              onClick={async () => {
                'use server';

                await signIn(logtoConfig);
              }}
            >
              登录
            </DropdownMenuItem>
          )
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}