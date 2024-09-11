"use client"

import React, { useEffect, useState } from "react"
import {
  useStripe,
  useElements,
  AddressElement,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js"
import useCart from "../hooks/useCart"
import formatPrice from "../utils/formatPrice"
import { toast } from "react-hot-toast"
import Heading from "../components/Heading"
import Button from "../components/Button"

type Props = {
  clientSecret: string
  handleSetPaymentSuccess: (val: boolean) => void
  handleShowCheckOutForm?: (val: boolean) => void
}

export default function CheckoutForm({
  clientSecret,
  handleSetPaymentSuccess,
  handleShowCheckOutForm,
}: Props) {
  const {
    cartTotalAmount,
    clearCart,
    handleSetClientSecret,
    handleSetPaymentIntent,
  } = useCart()
  const stripe = useStripe()
  const elements = useElements()
  const formatedPrice = formatPrice(cartTotalAmount)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!stripe || !clientSecret) {
      return
    }

    handleSetPaymentSuccess(false)
    // handleShowCheckOutForm(false)
  }, [stripe])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        setIsLoading(false)
        if (!result.error) {
          toast.success("Checkout Success", {
            id: "2",
          })
          clearCart()
          handleSetPaymentIntent(null)
          handleSetClientSecret(undefined)
          handleSetPaymentSuccess(true)
        } else {
          toast.error(`Payment failed: ${result.error.message}`, {
            duration: 8000,
          })
        }
      })
      .catch((e) => {
        toast.error("An error occured" + e, {
          duration: 8000,
          id: "stripeerrid",
        })
      })
      .finally(() => {
        // clearCart()
        // handleShowCheckOutForm(false)
      })
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className=" mb-5 ">
        <Heading
          title={"Enter your details to complete checkout"}
          center={false}
        />

        <h2 className=" font-semibold mb-2 mt-5">Address information</h2>
        <AddressElement
          id="address-element"
          options={{
            mode: "shipping",
            allowedCountries: ["US", "UG", "KE", "TZ"],
          }}
        />

        <h2 className=" font-semibold mt-4 mb-2">Payment information</h2>
        <PaymentElement id="payment-element" options={{ layout: "tabs" }} />

        <div className=" py-4 text-center text-slate-700 text-2xl font-bold">
          Total: {formatedPrice}
        </div>

        <div className=" flex justify-center items-center">
          <Button
            label={isLoading ? "Processing..." : "Pay Now"}
            disabled={isLoading || !stripe || !elements}
            custom="p-2 text-sm md:text-lg"
            onClick={() => {}}
          />
        </div>
      </div>
    </form>
  )
}
