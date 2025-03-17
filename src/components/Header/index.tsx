"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ModeToggle } from "./mode-toggle"

interface NavItem {
  title: string
  href: string
  disabled?: boolean
}

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)

  const navItems: NavItem[] = [
    {
      title: "首页",
      href: "/",
    },
    {
      title: "贡献榜",
      href: "/ranking",
    },
    {
      title: "关于",
      href: "/about",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center m-auto px-4">
        <div className="mr-8 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">VRCD 贡献榜</span>
          </Link>
        </div>

        <div className="hidden md:flex justify-left flex-1">
          <nav className="flex">
            <ul className="flex gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ModeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">切换菜单</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="pr-0">
                <div className="px-7 pt-6">
                  <Link
                    href="/"
                    className="flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="font-bold">VRCD 贡献榜</span>
                  </Link>
                </div>
                <nav className="mt-6 flex flex-col gap-4 px-7">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        item.disabled && "cursor-not-allowed opacity-80"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </div>

      <div className="w-full py-1 bg-amber-500/60 text-white text-center font-bold backdrop-blur">
        当前所有内容均为开发版本，不代表最终效果！
      </div>
    </header>
  )
}