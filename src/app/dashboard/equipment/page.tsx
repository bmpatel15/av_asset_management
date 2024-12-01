"use client"

import { EquipmentList } from "@/components/equipment/equipment-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"

export default function EquipmentPage() {
  const { hasPermission } = useAuth()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Equipment</h1>
        {hasPermission('ADD_EQUIPMENT') && (
          <Link href="/dashboard/equipment/add">
            <Button>Add Equipment</Button>
          </Link>
        )}
      </div>
      <EquipmentList />
    </div>
  )
}

