export type Role = "ADMIN" | "USER"

export interface User {
  id: string
  email: string
  name?: string
  role: Role
}

export interface UserSession {
  user: User
  expires: string
}

