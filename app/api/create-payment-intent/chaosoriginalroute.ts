import Stripe from "stripe"
import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"
import { CartProductType } from "@/app/product/[id]/ProductDetails"
import { getCurrentUser } from "@/actions/getCurrentUser"

export const dynamic = "force-dynamic"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

const calculateOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity
    return acc + itemTotal
  }, 0)
  const price: any = parseFloat(totalPrice.toFixed(2))
  return price
}

export const mukisaivansession = {
  user: {
    name: "MUKISA IVAN",
    email: "mukisaivan340@gmail.com",
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocLzfMBR2iz6QWszeBwE_Vo5mDXqP-vX-TppTkS6zaAu1uVn87qY=s96-c",
  },
  accessToken:
    "ya29.a0AXooCgtEBAdXuJHgIRb3z2Cqz7l9vxX_HFEr7f92OJvGmBs6R4BrYHlq-upi_nmEW1bns6V3gisR4BbfdpXNwd80M9GDAM5J2WWB4DyWT1hVk3toXDBg-kCO1zGeHAbiWko0gPk1OH__MMCgLDR7eBlPvfaIl2UECQUaCgYKAd0SARASFQHGX2MiVi6d0ZzyDc2P2AVbe1gzkA0170",
  expires: "2024-08-29T06:26:50.517Z",
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  console.log("++++++++++++= currentUser", currentUser)

  if (!currentUser) {
    return NextResponse.json({ error: "UnAuthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { items, payment_intent_id } = body
  const total = calculateOrderAmount(items) * 100

  const MINIMUM_CHARGE_AMOUNT_USD = 50 // Set this according to Stripe's minimum amount for USD

  if (total < MINIMUM_CHARGE_AMOUNT_USD) {
    return NextResponse.json(
      {
        error: `The amount must be at least  ${
          MINIMUM_CHARGE_AMOUNT_USD / 100
        } USD when dealing with zero decimal currencies`,
      },
      { status: 400 }
    )
  }

  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: "usd",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: payment_intent_id,
    products: items,
  }

  if (payment_intent_id) {
    const current_intent =
      await stripe.paymentIntents.retrieve(payment_intent_id)

    const allowedStatuses = [
      "requires_payment_method",
      "requires_confirmation",
      "requires_action",
    ]

    // if (allowedStatuses.includes(current_intent.status)) {
    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        {
          amount: total,
        }
      )

      // update the order

      const [existing_order, update_order] = await Promise.all([
        prisma.order.findFirst({
          where: { paymentIntentId: payment_intent_id },
        }),

        prisma.order.update({
          where: { paymentIntentId: payment_intent_id },

          data: {
            amount: total,
            products: items,
          },
        }),
      ])

      // update_order

      if (!existing_order) {
        return NextResponse.json(
          { error: "Invalid Payment Intent" },
          { status: 400 }
        )
      }

      // console.log(' >>>>>>>>>>>>>>>>>>>>>>>>> Updated Payment Intent:', updated_intent);

      return NextResponse.json({ paymentIntent: updated_intent })
    }
  } else {
    // create the intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    })

    // then create the order
    orderData.paymentIntentId = paymentIntent.id

    await prisma.order.create({
      data: orderData,
    })

    return NextResponse.json({ paymentIntent })
  }

  // Ensure a response is always returned
  return NextResponse.json(
    { error: "Unexpected error occurred" },
    { status: 500 }
  )
}
