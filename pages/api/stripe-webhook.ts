import { NextApiRequest, NextApiResponse } from "next"
import { buffer } from "micro"
import Stripe from "stripe"
import prisma from "@/libs/prismadb"

export const config = {
  api: { bodyParser: false },
}

const localhostendpointSecret =
  "whsec_a465e05c2786b17bf9296fe8f4a383234ab0c4e29149356b19ad862fc3390c1b"
const endpointSecret = "whsec_oRBHxJFxV1Hes5knXANJEzl8H0jWOZTS"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const buf = await buffer(req)
  const sig = req.headers["stripe-signature"]

  if (!sig) {
    return res.status(400).send("Missing stripe signature")
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret)

    switch (event.type) {
      case "charge.succeeded":
        const charge: any = event.data.object as Stripe.Charge

        if (typeof charge.payment_intent === "string") {
          await prisma?.order.update({
            where: { paymentIntentId: charge.payment_intent },
            data: { status: "complete", address: charge.shipping?.address },
          })
        }

        break

      default:
        console.log("Unhandled event type" + event.type)
    }

    res.json({ received: true })
  } catch (error) {
    return res.status(400).send("Webhook error" + error)
  }
}

// paairing_code:  worthy-tops-like-award
// account_id:    acct_1PWnyELD4jNSFkrV
