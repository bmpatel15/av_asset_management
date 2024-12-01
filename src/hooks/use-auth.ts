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
  name?: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          console.log('Firebase User ID:', firebaseUser.uid)
          const response = await fetch(`/api/users/${firebaseUser.uid}`)
          const userData = await response.json()
          
          console.log('User data from API:', userData)
          
          if (userData.role) {
            setUser({
              id: userData.id,
              email: userData.email,
              role: userData.role,
              name: userData.name
            })
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
          setUser(null)
        }
      } else {
        setUser(null)
        router.push('/login')
      }
    })
    return () => unsubscribe()
  }, [router])

  return {
    user,
    hasPermission: (permission: string) => {
      console.log('Current user role:', user?.role)
      console.log('Checking permission:', permission)
      return hasPermission(user?.role ?? UserRole.BASIC, permission)
    }
  }
}

