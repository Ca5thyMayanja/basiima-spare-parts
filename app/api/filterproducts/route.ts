import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export async function POST(req: Request) {
  const { categories } = await req.json()

  const products = await prisma.product.findMany({
    where: {
      category: {
        in: categories,
      },
    },
  })

  console.log('>>>>> gotten data from the api route', products)

  return NextResponse.json({ data: products })
}
