import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@prisma/client'

const ADMIN_EMAIL = 'bpatel501@gmail.com'
const FIREBASE_ID = '1I8QVIJ5yoPRpljyAHFyZW8HeHy1'

export async function GET() {
  try {
    const user = await prisma.user.upsert({
      where: { 
        email: ADMIN_EMAIL 
      },
      update: {
        role: UserRole.ADMIN,
        firebaseId: FIREBASE_ID,
        name: 'Bhavesh Patel'
      },
      create: {
        email: ADMIN_EMAIL,
        role: UserRole.ADMIN,
        firebaseId: FIREBASE_ID,
        name: 'Bhavesh Patel'
      }
    })

    return NextResponse.json({ 
      message: 'Admin role assigned successfully', 
      user 
    })
  } catch (error: unknown) {
    console.error('Error setting up admin:', error)
    return NextResponse.json(
      { error: 'Failed to setup admin', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    )
  }
} 