import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"
import { getCurrentUser } from "@/actions/getCurrentUser"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  if (currentUser.role !== "ADMIN") {
    return NextResponse.error()
  }
  const body = await request.json()

  // console.log(' >>> Server side body', body);

  const {
    name,
    description,
    price,
    previousprice,
    brand,
    category,
    instock,
    images,
  } = body

  const product = await prisma.product.create({
    data: {
      name,
      description,
      brand,
      category,
      instock,
      images,
      price: parseFloat(price),
      previousprice: parseFloat(previousprice),
    },
  })
  return NextResponse.json(product)
}

export async function PUT(req: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error()
  }

  const body = await req.json()

  const { id, instock } = body

  const product = await prisma.product.update({
    where: { id: id },
    data: { instock },
  })

  return NextResponse.json(product)
}
