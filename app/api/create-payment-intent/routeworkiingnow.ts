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

export async function POST2(request: Request) {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return NextResponse.json({ error: "UnAuthorized" }, { status: 401 })
  }
  const body = await request.json()
  const { items, payment_intent_id } = body
  const total = calculateOrderAmount(items) * 100
  console.log(`Calculated total amount: ${total}`)

  const MINIMUM_CHARGE_AMOUNT_USD = 50 // Set this according to Stripe's minimum amount for USD

  if (total < MINIMUM_CHARGE_AMOUNT_USD) {
    // console.log(`Total amount (${total}) is less than the minimum charge amount (${MINIMUM_CHARGE_AMOUNT_USD})`);
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

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return NextResponse.json({ error: "UnAuthorized" }, { status: 401 })
  }
  const body = await request.json()
  const { items, payment_intent_id } = body
  const total = calculateOrderAmount(items) * 100
  console.log(`Calculated total amount: ${total}`)

  const MINIMUM_CHARGE_AMOUNT_USD = 50 // Set this according to Stripe's minimum amount for USD

  if (total < MINIMUM_CHARGE_AMOUNT_USD) {
    // console.log(`Total amount (${total}) is less than the minimum charge amount (${MINIMUM_CHARGE_AMOUNT_USD})`);
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

    if (current_intent.status === "succeeded") {
      console.log(`PaymentIntent ${payment_intent_id} has already succeeded.`)
      return NextResponse.json(
        {
          error:
            "This PaymentIntent has already succeeded and cannot be updated.",
        },
        { status: 400 }
      )
    } else {
      // if (allowedStatuses.includes(current_intent.status)) {
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
}
