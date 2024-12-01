import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@prisma/client'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('Looking up user with firebaseId:', params.id)
    
    const user = await prisma.user.findFirst({
      where: { firebaseId: params.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        firebaseId: true
      }
    })
    
    console.log('Found user:', user)
    
    if (!user) {
      console.log('No user found, returning BASIC role')
      return NextResponse.json({ role: UserRole.BASIC })
    }
    
    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' }, 
      { status: 500 }
    )
  }
}