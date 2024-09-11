import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export async function POST(req: Request) {
  const { category } = await req.json()

  // const data = await prisma?.product.findMany({
  //   where: { category: category },
  //   include: { reviews: true },
  // })

  // // console.log('---------------- Category data', data)

  // return NextResponse.json({ data })

  const data = await prisma?.product.findMany({
    where: { category: category },
    include: { reviews: true },
  })

  // Transform the data to wrap each product in an object with a `product` key
  const transformedData = data?.map((product) => ({
    product: {
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      previousprice: product.previousprice,
      images: product.images.map((img) => ({
        color: img.color,
        colorCode: img.colorCode,
        image: img.image,
      })),
      instock: product.instock,
      reviews: product.reviews.map((review) => ({
        id: review.id,
        userId: review.userId,
        productId: review.productId,
        rating: review.rating,
        comment: review.comment,
        createdDate: review.createdDate,
      })),
    },
  }))

  return NextResponse.json({ data: transformedData })
}

export async function GET() {
  const data = await prisma?.product.findMany({
    distinct: ['category'],
    select: { category: true, reviews: true },
  })

  // console.log('---------------- Category data', data)

  return NextResponse.json(data)
}
