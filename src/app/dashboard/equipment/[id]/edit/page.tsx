"use client"

import { useEffect, useState } from "react"
import { EquipmentForm } from "@/components/equipment/equipment-form"
import { Equipment } from "@/types/equipment"

export default function EditEquipmentPage({
  params,
}: {
  params: { id: string }
}) {
  const [equipment, setEquipment] = useState<Equipment>()

  useEffect(() => {
    fetch(`/api/equipment/${params.id}`)
      .then(res => res.json())
      .then(data => setEquipment(data))
  }, [params.id])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Equipment</h1>
      {equipment && <EquipmentForm equipment={equipment} />}
    </div>
  )
} 