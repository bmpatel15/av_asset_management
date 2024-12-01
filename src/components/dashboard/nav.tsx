"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Equipment",
    href: "/dashboard/equipment",
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
  },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

