"use client"

import Link from "next/link"
import { LayoutDashboard, Package, FileText, Settings, Shield, LucideIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/hooks/use-auth"
import { UserRole } from "@prisma/client"

type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
}

const STAFF_AND_ABOVE: UserRole[] = [UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF]

export function Sidebar() {
  const { user } = useAuth()

  console.log('Current user data:', {
    user,
    isAdmin: user?.role === UserRole.ADMIN,
    isStaffOrAbove: user?.role && STAFF_AND_ABOVE.includes(user.role)
  })

  const sidebarNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Equipment",
      href: "/dashboard/equipment",
      icon: Package,
    },
    // Show Reports for ADMIN, MANAGER, and STAFF
    user?.role && STAFF_AND_ABOVE.includes(user.role) && {
      title: "Reports",
      href: "/dashboard/reports",
      icon: FileText,
    },
    // Show Admin Panel only for ADMIN
    user?.role === UserRole.ADMIN && {
      title: "Admin",
      href: "/dashboard/admin",
      icon: Shield,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ].filter(Boolean)

  return (
    <div className="flex flex-col h-screen border-r">
      <div className="p-6">
        <h2 className="text-lg font-semibold">AV Asset Management</h2>
      </div>
      <ScrollArea className="flex-1">
        <nav className="grid gap-2 p-4">
          {sidebarNavItems
            .filter((item): item is NavItem => Boolean(item))
            .map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className="justify-start"
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.title}
                </Link>
              </Button>
            ))}
        </nav>
      </ScrollArea>
    </div>
  )
}

