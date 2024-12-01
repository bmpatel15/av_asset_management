import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { ApiError } from '@/types/error'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { equipmentId, userId, returnDate } = body

    const checkout = await prisma.$transaction(async (tx) => {
      const checkout = await tx.checkout.create({
        data: {
          equipmentId,
          userId,
          returnDate,
        },
      })

      await tx.equipment.update({
        where: { id: equipmentId },
        data: { status: 'IN_USE' },
      })

      return checkout
    })

    return NextResponse.json(checkout, { status: 201 })
  } catch (error: unknown) {
    const apiError = error as ApiError
    console.error('Error creating checkout:', apiError)
    return NextResponse.json(
      { error: 'Failed to create checkout' }, 
      { status: 500 }
    )
  }
}

