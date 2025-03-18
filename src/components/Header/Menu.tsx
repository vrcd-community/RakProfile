"use client";

import * as React from "react"
import Link from "next/link"
import { Menu as MenuIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import VRCD from "@/assets/VRCD"

interface NavItem {
  title: string
  href: string
  disabled?: boolean
}

export function Menu({ navItems }: { navItems: NavItem[] }) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <div className="hidden md:flex justify-left flex-1">
        <nav className="flex">
          <ul className="flex gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    item.disabled && "cursor-not-allowed opacity-80",
                    "hover:text-blue-400"
                  )}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">切换菜单</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pl-0">
          <div className="px-7 pt-6">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <VRCD className="h-6" />
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
    </>
  )
}