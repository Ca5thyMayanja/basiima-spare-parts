"use client"
import React, { useCallback, useEffect, useState } from "react"
import useCart from "../hooks/useCart"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Button from "../components/Button"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm"
import { FaBackward } from "react-icons/fa6"
import Link from "next/link"
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js"

type Props = {}
const stripePromise = loadStripe(
  "pk_test_51Puv0KRrf3sxMm2NFLzAMvbb53WIMe0cF0oNw0u8DTqn1WfID9er9tqXG5kxfNS3ITWhicjpaoYN7K7WRMUEphG500hhkUwNCi"
)

export default function CheckoutClient({}: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const router = useRouter()

  const {
    cartProducts,
    paymentIntent,
    clientSecret,
    handleSetPaymentIntent,
    handleSetClientSecret,
  } = useCart()

  useEffect(() => {
    // creating a payment intent as soon as the checkout page loads
    if (cartProducts) {
      setLoading(true)
      setError(false)
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false)
          if (res.status === 401) {
            return router.push("/login")
          }
          return res.json()
        })
        .then((data) => {
          console.log(
            " --------------------- paymentIntent on client",
            paymentIntent
          )
          console.log(
            "----------------- response data from api route",
            data.paymentIntent.id
          )

          handleSetPaymentIntent(data.paymentIntent.id)
          handleSetClientSecret(data.paymentIntent.client_secret)
        })
        .catch((err) => {
          setError(true)
          console.log("+++++++++++++++++ Checkout Error: ", err)

          toast.error("Something went wrong" + err, {
            duration: 10000,
            id: "1",
          })
        })
    }
  }, [])

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  }

  const handleSetPaymentSuccess = useCallback((val: boolean) => {
    setPaymentSuccess(val)
  }, [])

  //  const handleShowCheckOutForm = useCallback((val: boolean) => {
  //    setshowcheckoutform(val)
  //  }, [])

  if (!cartProducts && clientSecret) {
    ;<div className=" flex flex-col items-center">
      <div className=" text-2xl mb-4">No products to checkout</div>
      <div>
        <Link
          href={"/"}
          className=" text-slate-500 flex items-center gap-1 top-2"
        >
          <FaBackward />
          <span>Start Shopping</span>
        </Link>
      </div>
    </div>
  }

  return (
    <div className=" w-full ">
      {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSuccess={handleSetPaymentSuccess}
            // handleShowCheckOutForm={handleShowCheckOutForm}
          />
        </Elements>
      )}
      {loading && <div className=" text-center">Loading Checkout ....</div>}
      {error && <div>Something went wrong ....</div>}
      {paymentSuccess && (
        <div className=" flex items-center flex-col gap-4">
          <div className=" text-teal-500 text-center">Payment Successful</div>
          <div className=" flex justify-center items-center">
            <Button
              label={"View Your orders"}
              custom="w-[200px] text-sm"
              onClick={() => {
                router.push("/orders")
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
