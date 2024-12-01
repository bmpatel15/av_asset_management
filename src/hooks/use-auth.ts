"use client"

import { useEffect, useState } from "react"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { hasPermission } from "@/lib/permissions"
import { UserRole } from '@prisma/client'

interface User {
  id: string
  email: string
  role: UserRole
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const response = await fetch(`/api/users/${firebaseUser.uid}`)
        const userData = await response.json()
        setUser(userData)
      } else {
        setUser(null)
        router.push('/login')
      }
    })
    return () => unsubscribe()
  }, [router])

  return {
    user,
    hasPermission: (permission: string) => hasPermission(user?.role ?? UserRole.BASIC, permission)
  }
}

