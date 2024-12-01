export type Category = "CAMERA" | "AUDIO" | "LIGHTING" | "OTHER"

export type Status = "AVAILABLE" | "IN_USE" | "MAINTENANCE"

export interface Equipment {
  id: string
  name: string
  category: Category
  makeModel: string
  status: Status
  location: string
  maintenanceDate?: Date
  purchaseDate: Date
  purchaseCost: number
}

export interface EquipmentFormData {
  name: string
  category: Category
  makeModel: string
  location: string
  maintenanceDate?: string
  purchaseDate: string
  purchaseCost: number
}

