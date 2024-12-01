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
import { formatDate } from "@/lib/utils"

interface Checkout {
  id: string
  equipmentId: string
  userId: string
  checkoutDate: string
  returnDate: string | null
  equipment: {
    name: string
  }
  user: {
    name: string
  }
}

export function UsageReport() {
  const [checkouts, setCheckouts] = useState<Checkout[]>([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/reports")
      const data = await response.json()
      setCheckouts(data.checkouts)
    }

    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage Report</CardTitle>
        <CardDescription>Equipment checkout history</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Equipment</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Checkout Date</TableHead>
              <TableHead>Return Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {checkouts.map((checkout) => (
              <TableRow key={checkout.id}>
                <TableCell>{checkout.equipment.name}</TableCell>
                <TableCell>{checkout.user.name}</TableCell>
                <TableCell>{formatDate(checkout.checkoutDate)}</TableCell>
                <TableCell>
                  {checkout.returnDate ? formatDate(checkout.returnDate) : "Not returned"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

