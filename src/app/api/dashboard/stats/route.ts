import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { ApiError } from '@/types/error'

export async function GET() {
  try {
    console.log('Fetching stats...')
    const [total, available, inUse, maintenance] = await Promise.all([
      prisma.equipment.count(),
      prisma.equipment.count({ where: { status: "AVAILABLE" } }),
      prisma.equipment.count({ where: { status: "IN_USE" } }),
      prisma.equipment.count({ where: { status: "MAINTENANCE" } }),
    ])

    const stats = {
      total,
      available,
      checkedOut: inUse,
      maintenance
    }
    console.log('Stats fetched:', stats)
    return NextResponse.json(stats)
  } catch (error: unknown) {
    const apiError = error as ApiError
    console.error('Error in stats API:', apiError)
    return NextResponse.json(
      { error: 'Failed to fetch stats', details: apiError.message }, 
      { status: 500 }
    )
  }
} 