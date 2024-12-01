import { useState, useEffect } from "react"
import { Equipment } from "@/types/equipment"

export function useEquipment(id?: string) {
  const [equipment, setEquipment] = useState<Equipment | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchEquipment() {
      try {
        const response = await fetch(id ? `/api/equipment/${id}` : "/api/equipment")
        if (!response.ok) {
          throw new Error("Failed to fetch equipment")
        }
        const data = await response.json()
        setEquipment(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEquipment()
  }, [id])

  return { equipment, isLoading, error }
}

