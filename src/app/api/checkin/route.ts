import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { ApiError } from '@/types/error'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { checkoutId } = body

    const checkin = await prisma.$transaction(async (tx) => {
      const checkout = await tx.checkout.update({
        where: { id: checkoutId },
        data: { returnDate: new Date() },
      })

      await tx.equipment.update({
        where: { id: checkout.equipmentId },
        data: { status: 'AVAILABLE' },
      })

      return checkout
    })

    return NextResponse.json(checkin)
  } catch (error: unknown) {
    const apiError = error as ApiError
    console.error('Error checking in equipment:', apiError)
    return NextResponse.json(
      { error: 'Failed to check in equipment' }, 
      { status: 500 }
    )
  }
}

