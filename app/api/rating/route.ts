import { getCurrentUser } from "@/actions/getCurrentUser"
import { Review } from "@prisma/client"
import { error } from "console"
import { NextResponse } from "next/server"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.json({ error: "No user exists" }, { status: 500 })
  }
  const body = await request.json()

  const { comment, rating, product, userId } = body

  const deliveredOrder = currentUser?.orders.some(
    (order) =>
      order.products.find((item) => item.id === product.id) &&
      order.deliveryStatus === "Delivered"
  )

  const userReview = product.reviews.find((review: Review) => {
    return review.userId === currentUser.id
  })

  if (userReview || !deliveredOrder) {
    return NextResponse.json(
      { error: "You have already reviewed this product" },
      { status: 500 }
    )
  }

  const review = await prisma?.review.create({
    data: {
      comment,
      rating,
      productId: product.id,
      userId,
    },
  })

  return NextResponse.json(review)
}
