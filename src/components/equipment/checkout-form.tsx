"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import type { ApiError } from "@/types/error"

interface CheckoutFormProps {
  equipmentId: string
}

export function CheckoutForm({ equipmentId }: CheckoutFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(event.currentTarget)
      const returnDate = formData.get("returnDate")

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ equipmentId, returnDate }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Checkout failed")
      }

      router.refresh()
      toast({
        title: "Success",
        description: "Equipment checked out successfully.",
      })
    } catch (error: unknown) {
      const apiError = error as ApiError
      console.error('Checkout error:', apiError)
      toast({
        title: "Error",
        description: apiError.message || "Failed to checkout equipment.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Checkout Equipment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="returnDate">Expected Return Date</Label>
            <Input
              id="returnDate"
              name="returnDate"
              type="date"
              required
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Processing..." : "Checkout"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

