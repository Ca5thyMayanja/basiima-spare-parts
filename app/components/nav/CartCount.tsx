'use client'

import useCart from '@/app/hooks/useCart'
import { useRouter } from 'next/navigation'
import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'

type Props = {}

export default function CartCount({}: Props) {
  const { cartTotalQty } = useCart()

  const router = useRouter()

  return (
    <div
      className=" relative cursor-pointer "
      onClick={() => {
        router.push('/cart')
      }}
    >
      {/* large screen */}
      <div className=" text-[16px] md:text-3xl hidden md:block">
        <AiOutlineShoppingCart size={32} className=" text-black" />
      </div>
      {/* small screen */}
      <div className=" text-[16px] md:text-3xl md:hidden block">
        <AiOutlineShoppingCart size={25} className=" text-black" />
      </div>
      <span className=" absolute top-[-10px] right-[-12px] md:right-[-19px] bg-slate-700 rounded-md flex items-center justify-center w-full md:text-sm text-[9px] text-white">
        {cartTotalQty}
      </span>
    </div>
  )
}
