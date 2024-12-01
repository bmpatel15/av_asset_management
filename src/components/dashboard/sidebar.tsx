"use client"

import Link from "next/link"
import { LayoutDashboard, Package, FileText, Settings, Shield, LucideIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/hooks/use-auth"

type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
}

export function Sidebar() {
  const { hasPermission } = useAuth()

  const sidebarNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    hasPermission('VIEW_EQUIPMENT') && {
      title: "Equipment",
      href: "/dashboard/equipment",
      icon: Package,
    },
    hasPermission('VIEW_REPORTS') && {
      title: "Reports",
      href: "/dashboard/reports",
      icon: FileText,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
    hasPermission('ACCESS_ADMIN_PANEL') && {
      title: "Admin",
      href: "/dashboard/admin",
      icon: Shield,
    },
  ].filter(Boolean)

  return (
    <div className="flex flex-col w-64 border-r bg-background">
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

