export const dynamic = "force-dynamic"

import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import prisma from "@/libs/prismadb"

export async function getSession() {
  return await getServerSession(authOptions)
}

export const userEmail = "mukisaivan340@gmail.com"

export async function getCurrentUser() {
  try {
    const session = await getSession()

    if (!session?.user?.email) {
      return null
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },

      include: { orders: true },
    })
    if (!currentUser) {
      return null
    }

    return {
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      emailVerified: currentUser.emailVerified?.toISOString() || null,
      image: currentUser.image,
      hashedPassword: null, // For security, don't return the actual hashed password
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      role: currentUser.role,
      orders: currentUser.orders,
    }
  } catch (error) {
    console.error("Error fetching current user:", error)
    return null
  }
}
