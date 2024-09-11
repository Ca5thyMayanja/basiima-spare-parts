'use client'

import Link from 'next/link'
import React, { useEffect } from 'react'
import { FaBackward } from 'react-icons/fa6'
import useCart from '../hooks/useCart'
import Heading from '../components/Heading'
import Button from '../components/Button'
import ItemContent from './ItemContent'
import formatPrice from '../utils/formatPrice'
import { useRouter } from 'next/navigation'
import { BetterUser } from '../components/nav/NavBar'

type Props = {
  currentUser: BetterUser | null
}

export default function CartClient({ currentUser }: Props) {
  const { cartProducts, clearCart, cartTotalAmount } = useCart()
  const router = useRouter()

  const cartTable = (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b-2 border-gray-200 text-left">
              Product
            </th>
            <th className="py-2 px-4 border-b-2 border-gray-200 text-left">
              Price
            </th>
            <th className="py-2 px-4 border-b-2 border-gray-200 text-left">
              Quantity
            </th>
            <th className="py-2 px-4 border-b-2 border-gray-200 text-left">
              Category
            </th>
          </tr>
        </thead>
        <tbody>
          {cartProducts?.map((pdt) => (
            <tr key={pdt.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b border-gray-200">{pdt.name}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                ${pdt.price}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {pdt.quantity}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {pdt.category}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const notTable = (
    <div>
      <Heading center title="Shopping Cart" />
      <div className="grid grid-cols-5  text-xs gap-4 pb-2 items-center mt-8">
        <div className=" col-span-2 justify-self-start">PRODUCT</div>
        <div className=" justify-self-center">PRICE</div>
        <div className=" justify-self-center">QUANTITY</div>
        <div className=" justify-self-end">TOTAL</div>
      </div>
      <div>
        {cartProducts?.map((item) => <ItemContent key={item.id} item={item} />)}
      </div>
      <div className=" flex gap-4 justify-between border-t-2 border-slate-200 py-4">
        <div className=" w-[90px]">
          <Button
            label="Clear cart"
            outline
            onClick={clearCart}
            custom=""
            small
          />
        </div>
        <div className=" text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between w-full text-base font-semibold">
            <span>SubTotal</span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <p className=" text-slate-500">
            Taxes and shipping calculated at Checkout
          </p>
          <div className=" w-[90px]">
            <Button
              label={`${currentUser ? 'CheckOut' : 'Login To CheckOut'}`}
              custom=""
              onClick={() => {
                currentUser ? router.push('/checkout') : router.push('/login')
                // currentUser ? router.push('/checkout2') : router.push('/login')
              }}
              small
              outline
            />
          </div>
          <div className=" mt-4">
            <Link
              href={'/'}
              className=" text-slate-500 flex items-center gap-1 top-2"
            >
              <FaBackward />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className=" flex flex-col items-center justify-center">
        <div className=" text-2xl">Your cart is empty</div>
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
    )
  }

  return <div className="">{notTable}</div>
}
