// get user country

async function getUserCountry(): Promise<string> {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    return data.country_code
  } catch (error) {
    console.error('Error detecting user country:', error)
    return 'KE' // Default to Kenya if detection fails
  }
}

// currency conversion utility

async function convertCurrency(
  amount: number,
  from: string,
  to: string,
): Promise<number> {
  // Placeholder: Replace with actual API call
  const rate = 1 // 1 KES = 1 USD (you need to get the actual rate)
  return amount * rate
}

// Modify your formatPrice function to accept a country code:

export default async function formatPrice(amount: number, countryCode: string) {
  let currencyCode = 'KES'
  let locale = 'en-KE'

  switch (countryCode) {
    case 'US':
      currencyCode = 'USD'
      locale = 'en-US'
      break
    case 'GB':
      currencyCode = 'GBP'
      locale = 'en-GB'
      break
    // Add more countries as needed
  }

  const convertedAmount = await convertCurrency(amount, 'KES', currencyCode)

  return new Intl.NumberFormat(locale, {
    currency: currencyCode,
    style: 'currency',
  }).format(convertedAmount)
}

// In your component or page where you display prices:

import { useState, useEffect } from 'react'

export function ProductPage({ product }: { product: any }) {
  const [formattedPrice, setFormattedPrice] = useState('')
  const [userCountry, setUserCountry] = useState('KE')

  useEffect(() => {
    async function fetchCountryAndFormatPrice() {
      const country = await getUserCountry()
      setUserCountry(country)
      const formatted = await formatPrice(product.price, country)
      setFormattedPrice(formatted)
    }
    fetchCountryAndFormatPrice()
  }, [product.price])

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: {formattedPrice}</p>
    </div>
  )
}

// For the Stripe payment, you'll need to convert the price back to the currency you use for Stripe (assuming USD):
import Stripe from 'stripe'

async function createPaymentIntent(amount: number, userCountry: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  // Convert amount to cents for Stripe
  const amountInCents = Math.round(amount * 100)

  // Convert to USD if not already
  const amountInUSD =
    userCountry !== 'US'
      ? await convertCurrency(
          amountInCents,
          getCurrencyCode(userCountry),
          'USD',
        )
      : amountInCents

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amountInUSD), // Stripe requires integer
    currency: 'usd',
    payment_method_types: ['card'],
  })

  return paymentIntent
}

function getCurrencyCode(countryCode: string): string {
  // Map country codes to currency codes
  const currencyMap: { [key: string]: string } = {
    US: 'USD',
    GB: 'GBP',
    KE: 'KES',
    // Add more as needed
  }
  return currencyMap[countryCode] || 'USD'
}
