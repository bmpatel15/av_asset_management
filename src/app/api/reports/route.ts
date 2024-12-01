import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import type { ApiError } from "@/types/error"

export async function GET() {
  try {
    const [equipment, checkouts] = await Promise.all([
      prisma.equipment.findMany(),
      prisma.checkout.findMany({
        include: {
          equipment: true,
          user: true,
        },
      }),
    ])

    return NextResponse.json({
      equipment,
      checkouts,
    })
  } catch (error: unknown) {
    const apiError = error as ApiError
    console.error('Error fetching reports:', apiError)
    return NextResponse.json(
      { error: "Failed to fetch reports data" },
      { status: 500 }
    )
  }
}

