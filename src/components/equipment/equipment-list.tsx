"use client"

import { useEffect, useState } from "react"
import { Equipment } from "@/types/equipment"
import { EquipmentCard } from "./equipment-card"

export function EquipmentList() {
  const [equipment, setEquipment] = useState<Equipment[]>([])

  useEffect(() => {
    async function fetchEquipment() {
      const response = await fetch("/api/equipment")
      const data = await response.json()
      setEquipment(data)
    }

    fetchEquipment()
  }, [])

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {equipment.map((item) => (
        <EquipmentCard key={item.id} id={item.id} />
      ))}
    </div>
  )
}

