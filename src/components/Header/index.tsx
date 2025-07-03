"use server";

import * as React from "react"
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { User } from "./User"
import { Menu } from "./Menu"
import VRCD from "@/assets/icons/VRCD"

const navItems = [
  {
    title: "博客",
    href: "/blog",
  },
  // {
  //   title: "贡献榜",
  //   href: "/ranking",
  // }
]

export async function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[var(--bg-2)]">
      <div className="container flex h-14 items-center m-auto px-4">
        <div className="flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <VRCD className="h-6" />
          </Link>
        </div>
 
        <Menu navItems={navItems} />

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <User />
            <ModeToggle />
          </nav>
        </div>
      </div>

      <div className="w-full py-1 bg-amber-500/60 dark:text-white text-black text-center backdrop-blur">
        当前所有内容均为开发版本，不代表最终效果！
      </div>
    </header>
  )
}