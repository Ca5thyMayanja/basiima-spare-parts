import prisma from "@/libs/prismadb"
export const dynamic = "force-dynamic"

import { getCurrentUser } from "@/actions/getCurrentUser"
import { CartProductType } from "@/app/product/[id]/ProductDetails"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

const calculateOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity
    return acc + itemTotal
  }, 0)
  const price: any = parseFloat(totalPrice.toFixed(2))
  return price
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  const { items, payment_intent_id } = body

  const total = calculateOrderAmount(items) * 100

  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: calculateOrderAmount(items),
    currency: "ugx",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: payment_intent_id,
    products: items,
  }

  if (payment_intent_id) {
    const current_intent =
      await stripe.paymentIntents.retrieve(payment_intent_id)

    const updated_intent = await stripe.paymentIntents.update(
      payment_intent_id,
      {
        amount: total,
      }
    )

    console.log(
      " ------------------- payment_intent_id on server from body ",
      updated_intent
    )

    const existing_order = await prisma.order.findFirst({
      where: { paymentIntentId: payment_intent_id },
    })

    if (!existing_order) {
      return NextResponse.error()
    }

    const updatedOrder = await prisma.order.update({
      where: { paymentIntentId: payment_intent_id },

      data: {
        amount: total,
        products: items,
      },
    })

    console.log(" ============================= updated order ", updatedOrder)

    const allOrders = await prisma.order.findMany()

    console.log(
      " ============================= number of orders after updating an order",
      allOrders.length
    )

    return NextResponse.json({ paymentIntent: updated_intent })

    //
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "ugx",
      payment_method_types: ["card"],
    })

    console.log(
      " >>>>>>>>>>>>>>> paymentIntent id on server from server",
      paymentIntent
    )

    orderData.paymentIntentId = paymentIntent.id

    const newlycreatedorder = await prisma.order.create({
      data: orderData,
    })

    console.log(" ============================= new order ", newlycreatedorder)

    //todo: clear all orders whose status is pending

    const allOrders = await prisma.order.findMany()

    console.log(
      " ============================= number of orders after creating a new order ",
      allOrders.length
    )

    return NextResponse.json({ paymentIntent })
  }
}
