import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { ApiError } from '@/types/error'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const equipment = await prisma.equipment.findUnique({
      where: { id: params.id },
    })
    if (!equipment) {
      return NextResponse.json({ error: 'Equipment not found' }, { status: 404 })
    }
    return NextResponse.json(equipment)
  } catch (error: unknown) {
    const apiError = error as ApiError
    console.error('Error fetching equipment:', apiError)
    return NextResponse.json(
      { error: 'Failed to fetch equipment' }, 
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const equipment = await prisma.equipment.update({
      where: { id: params.id },
      data: body,
    })
    return NextResponse.json(equipment)
  } catch (error: unknown) {
    const apiError = error as ApiError
    console.error('Error updating equipment:', apiError)
    return NextResponse.json(
      { error: 'Failed to update equipment' }, 
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.equipment.delete({
      where: { id: params.id },
    })
    return NextResponse.json({ message: 'Equipment deleted successfully' })
  } catch (error: unknown) {
    const apiError = error as ApiError
    console.error('Error deleting equipment:', apiError)
    return NextResponse.json(
      { error: 'Failed to delete equipment' }, 
      { status: 500 }
    )
  }
}

