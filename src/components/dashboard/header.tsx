"use client"

import { UserNav } from "./user-nav"
import { Nav } from "./nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"

export function Header() {
  const { hasPermission } = useAuth()
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8 w-[300px]" />
          </div>
          <Nav />
        </div>
        <div className="flex items-center space-x-4 mr-4">
          {hasPermission('ADD_EQUIPMENT') && (
            <Link href="/dashboard/equipment/add">
              <Button>Add Equipment</Button>
            </Link>
          )}
          <UserNav />
        </div>
      </div>
    </header>
  )
}

