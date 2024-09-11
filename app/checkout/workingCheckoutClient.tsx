'use client'
import React, { useCallback, useEffect, useState } from 'react'
import useCart from '../hooks/useCart'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import CheckoutForm from './CheckoutForm'
import Button from '../components/Button'
import { FaBackward } from 'react-icons/fa6'
import Link from 'next/link'

const stripePromise = loadStripe(
  'pk_test_51PWnyELD4jNSFkrVW2apWbpXMfzAosUoHMNsHfD80d4msdXXG1U0EUmM0AZSVOMK4FZxnzCMyZDvTgalZTMP6gP200LG6cBrPA',
)

type Props = {}

export default function CheckoutClient({}: Props) {
  const {
    cartProducts,
    paymentIntent,
    clientSecret,
    handleSetClientSecret,
    handleSetPaymentIntent,
  } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const router = useRouter()
  const [requestInProgress, setRequestInProgress] = useState(false)

  const [showcheckoutform, setshowcheckoutform] = useState(true)

  console.log('++++++++ First Payment intent', paymentIntent)
  console.log('++++++++ Client secret', clientSecret)

  useEffect(() => {
    async function fetchClientSecret() {
      try {
        if (requestInProgress || !cartProducts || cartProducts.length === 0)
          return
        setRequestInProgress(true)

        setLoading(true)
        setError(false)
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: cartProducts,
            payment_intent_id: paymentIntent,
          }),
        })
        setLoading(false)
        setRequestInProgress(false)

        if (response.status === 401) {
          return router.push('/login')
        }

        const data = await response.json()

        console.log('------------------------------ API  DATA', data)
        console.log(
          '>>>>>>>>>>>>>>>>>>> API PAYMENT INTENT DATA',
          data.paymentIntent,
        )

        if (!data.paymentIntent) {
          const secondpaymentintent: any = localStorage.getItem(
            'zionvitengepaymentIntent',
          )
          const intentvar = JSON.parse(secondpaymentintent)

          const secondclientsecret: any = localStorage.getItem('clientSecret')
          const clientsecretvar = JSON.parse(secondclientsecret)

          handleSetPaymentIntent(intentvar)
          handleSetClientSecret(clientsecretvar)
          // throw new Error('Payment Intent not found in API response');
        }
        console.log(
          '++++++++ Second Payment intent After operation',
          paymentIntent,
        )
        handleSetClientSecret(data.paymentIntent.client_secret)
        handleSetPaymentIntent(data.paymentIntent.id)
      } catch (error) {
        setLoading(false)
        setRequestInProgress(false)
        setError(true)

        console.log('+++++++++++++++++ Checkout Error: ', error)
        toast.error('Something went wrong' + error, {
          duration: 10000,
          id: '1',
        })
      }
    }
    if (cartProducts) {
      fetchClientSecret()
    }
  }, [cartProducts])

  useEffect(() => {
    // creating a payment intent as soon as the checkout page loads
    if (cartProducts) {
      setLoading(true)
      setError(false)
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false)
          if (res.status === 401) {
            return router.push('/login')
          }
          return res.json()
        })
        .then((data) => {
          handleSetPaymentIntent(data.paymentIntent.id)
        })
        .catch((err) => {
          setError(true)
          console.log('+++++++++++++++++ Checkout Error: ', err)

          toast.error('Something went wrong' + err, {
            duration: 10000,
            id: '1',
          })
        })
    }
  }, [cartProducts])

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      labels: 'floating',
    },
  }

  const handleSetPaymentSuccess = useCallback((val: boolean) => {
    setPaymentSuccess(val)
  }, [])

  const handleShowCheckOutForm = useCallback((val: boolean) => {
    setshowcheckoutform(val)
  }, [])

  if (!cartProducts && clientSecret) {
    ;<div className=" flex flex-col items-center">
      <div className=" text-2xl mb-4">No products to checkout</div>
      <div>
        <Link
          href={'/'}
          className=" text-slate-500 flex items-center gap-1 top-2"
        >
          <FaBackward />
          <span>Start Shopping</span>
        </Link>
      </div>
    </div>
  }

  return (
    <div className=" w-full">
      {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSuccess={handleSetPaymentSuccess}
            handleShowCheckOutForm={handleShowCheckOutForm}
          />
        </Elements>
      )}
      {loading && <div className=" text-center">Loading Checkout ....</div>}
      {error && <div>Something went wrong ....</div>}
      {paymentSuccess && (
        <div className=" flex items-center flex-col gap-4">
          <div className=" text-teal-500 text-center">Payment Successful</div>
          <div className=" max-w-[220px] w-full">
            <Button
              label={'View Your orders'}
              custom={''}
              onClick={() => {
                router.push('/order')
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
