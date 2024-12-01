import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { ApiError } from '@/types/error'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findFirst({
      where: { firebaseId: params.id },
    })
    
    if (!user) {
      return NextResponse.json({ role: 'BASIC' })
    }
    
    return NextResponse.json(user)
  } catch (error: unknown) {
    const apiError = error as ApiError
    console.error('Error fetching user:', apiError)
    return NextResponse.json(
      { error: 'Failed to fetch user' }, 
      { status: 500 }
    )
  }
} 