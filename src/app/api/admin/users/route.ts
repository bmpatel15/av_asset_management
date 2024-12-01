import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { ApiError } from '@/types/error'

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        firebaseId: true,
        createdAt: true,
        updatedAt: true,
      },
    })
    return NextResponse.json(users)
  } catch (error: unknown) {
    const apiError = error as ApiError
    console.error('Error fetching users:', apiError)
    return NextResponse.json(
      { error: apiError.message || 'Failed to fetch users' }, 
      { status: apiError.status || 500 }
    )
  }
} 