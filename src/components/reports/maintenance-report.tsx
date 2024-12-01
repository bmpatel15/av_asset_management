"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Equipment } from "@/types/equipment"
import { formatDate } from "@/lib/utils"

export function MaintenanceReport() {
  const [equipment, setEquipment] = useState<Equipment[]>([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/reports")
      const data = await response.json()
      setEquipment(data.equipment.filter((item: Equipment) => item.maintenanceDate))
    }

    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance Report</CardTitle>
        <CardDescription>Equipment maintenance schedule and history</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Equipment</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Last Maintenance</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipment.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  {item.maintenanceDate ? formatDate(item.maintenanceDate) : "N/A"}
                </TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

