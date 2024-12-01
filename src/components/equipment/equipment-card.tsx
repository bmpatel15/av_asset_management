"use client"

import { useEffect, useState } from "react"
import { Equipment } from "@/types/equipment"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency, formatDate } from "@/lib/utils"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"

interface EquipmentCardProps {
  id: string
}

export function EquipmentCard({ id }: EquipmentCardProps) {
  const { hasPermission } = useAuth()
  const [equipment, setEquipment] = useState<Equipment | null>(null)

  useEffect(() => {
    async function fetchEquipment() {
      const response = await fetch(`/api/equipment/${id}`)
      const data = await response.json()
      setEquipment(data)
    }

    fetchEquipment()
  }, [id])

  if (!equipment) {
    return <div>Loading...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{equipment.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p>Category: {equipment.category}</p>
          <p>Make/Model: {equipment.makeModel}</p>
          <p>Status: {equipment.status}</p>
          <p>Location: {equipment.location}</p>
          <p>Purchase Date: {formatDate(equipment.purchaseDate)}</p>
          <p>Cost: {formatCurrency(equipment.purchaseCost)}</p>
        </div>
        <div className="flex space-x-2">
          <Link href={`/dashboard/equipment/${id}`}>
            <Button variant="outline">View</Button>
          </Link>
          {hasPermission('EDIT_EQUIPMENT') && (
            <Link href={`/dashboard/equipment/${id}/edit`}>
              <Button variant="outline">Edit</Button>
            </Link>
          )}
          {hasPermission('DELETE_EQUIPMENT') && (
            <Button variant="destructive">Delete</Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

