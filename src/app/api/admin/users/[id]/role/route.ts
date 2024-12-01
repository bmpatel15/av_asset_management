import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@prisma/client'
import type { ApiError } from '@/types/error'

export async function put(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { role } = await request.json()

    // Validate the role is a valid UserRole
    if (!Object.values(UserRole).includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role value' },
        { status: 400 }
      )
    }

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: { role },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    })

    return NextResponse.json(updatedUser)
  } catch (error: unknown) {
    const apiError = error as ApiError
    console.error('Error updating user role:', apiError)
    return NextResponse.json(
      { error: apiError.message || 'Failed to update role' },
      { status: 500 }
    )
  }
} 