import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/firebase-admin'
import { ApiError } from "@/types/error"

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get the user to find their firebaseId
    const user = await prisma.user.findUnique({
      where: { id: params.id }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Delete from Firebase first
    if (user.firebaseId) {
      await auth.deleteUser(user.firebaseId)
    }

    // Then delete from your database
    await prisma.user.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error: unknown) {
    const apiError = error as ApiError
    console.error('Error deleting user:', apiError)
    return NextResponse.json(
      { error: apiError.message || 'Failed to delete user' }, 
      { status: apiError.status || 500 }
    )
  }
} 