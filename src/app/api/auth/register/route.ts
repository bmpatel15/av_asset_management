import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@prisma/client'
import type { ApiError } from '@/types/error'

export async function POST(request: Request) {
  try {
    const { email, firebaseId, name } = await request.json()

    const user = await prisma.user.create({
      data: {
        email,
        firebaseId,
        name,
        role: UserRole.BASIC
      }
    })

    return NextResponse.json(user)
  } catch (error: unknown) {
    const apiError = error as ApiError
    return NextResponse.json(
      { error: apiError.message || 'Failed to register user' }, 
      { status: 500 }
    )
  }
} 