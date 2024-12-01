"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Equipment } from "@/types/equipment"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ApiError } from "@/types/error"

interface EquipmentFormProps {
  equipment?: Equipment
}

export function EquipmentForm({ equipment }: EquipmentFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(event.currentTarget)
      const data = {
        name: formData.get("name"),
        category: formData.get("category"),
        makeModel: formData.get("makeModel"),
        location: formData.get("location"),
        purchaseDate: formData.get("purchaseDate"),
        purchaseCost: parseFloat(formData.get("purchaseCost") as string),
        status: "AVAILABLE"
      }

      console.log('Submitting data:', data) // Debug log

      const response = await fetch("/api/equipment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || "Failed to save equipment")
      }

      const result = await response.json()
      console.log('Response:', result) // Debug log

      toast({
        title: "Success",
        description: "Equipment added successfully",
      })
      
      router.push("/dashboard/equipment")
      router.refresh()
    } catch (error: unknown) {
      const apiError = error as ApiError
      console.error('Form submission error:', apiError)
      toast({
        title: "Error",
        description: apiError.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{equipment ? "Edit Equipment" : "Add New Equipment"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={equipment?.name}
              placeholder="Equipment name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select name="category" defaultValue={equipment?.category}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CAMERA">Camera</SelectItem>
                <SelectItem value="AUDIO">Audio</SelectItem>
                <SelectItem value="LIGHTING">Lighting</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="makeModel">Make/Model</Label>
            <Input
              id="makeModel"
              name="makeModel"
              defaultValue={equipment?.makeModel}
              placeholder="Make and model"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              defaultValue={equipment?.location}
              placeholder="Storage location"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="purchaseDate">Purchase Date</Label>
            <Input
              id="purchaseDate"
              name="purchaseDate"
              type="date"
              defaultValue={equipment?.purchaseDate ? new Date(equipment.purchaseDate).toISOString().split('T')[0] : undefined}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="purchaseCost">Purchase Cost ($)</Label>
            <Input
              id="purchaseCost"
              name="purchaseCost"
              type="number"
              step="0.01"
              defaultValue={equipment?.purchaseCost}
              placeholder="0.00"
              required
            />
          </div>
          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : equipment ? "Update Equipment" : "Add Equipment"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/equipment")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

