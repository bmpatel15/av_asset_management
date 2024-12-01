import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { ApiError } from '@/types/error'
import { Category, Status } from '@prisma/client'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') as Category | null
  const status = searchParams.get('status') as Status | null

  const where = {
    ...(category && { category }),
    ...(status && { status })
  }

  try {
    const equipment = await prisma.equipment.findMany({ where })
    return NextResponse.json(equipment)
  } catch (error: unknown) {
    const apiError = error as ApiError
    return NextResponse.json(
      { error: apiError.message || 'Failed to fetch equipment' }, 
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log('Received data:', data)
    
    const equipment = await prisma.equipment.create({
      data: {
        name: data.name,
        category: data.category,
        makeModel: data.makeModel,
        location: data.location,
        purchaseDate: new Date(data.purchaseDate),
        purchaseCost: data.purchaseCost,
        status: "AVAILABLE"
      }
    })
    console.log('Created equipment:', equipment)
    return NextResponse.json(equipment)
  } catch (error: unknown) {
    const apiError = error as ApiError
    console.error('Error creating equipment:', apiError)
    return NextResponse.json(
      { error: 'Failed to create equipment', details: apiError.message },
      { status: 500 }
    )
  }
}

