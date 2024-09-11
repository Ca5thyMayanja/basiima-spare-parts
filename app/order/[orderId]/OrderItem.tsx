import formatPrice from '@/app/utils/formatPrice'
import { trunctatename } from '@/app/utils/truncatename'
import { CartProductType } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

type Props = {
  item: CartProductType
}

export default function OrderItem({ item }: Props) {
  return (
    <div className=" grid grid-cols-5 text-xs md:text-sm gap-4 border-t-2 border-slate-200 py-4 items-center">
      <div className=" col-span-2 justify-start flex gap-2 md:gap-4">
        <div className=" relative w-[70px] aspect-square">
          <Image
            src={item.selectedImg.image}
            alt={item.name}
            fill
            className="object-contain"
          />
        </div>
        <div className=" flex flex-col gap-1">
          <div>{trunctatename(item.name)}</div>
          <div>{item.selectedImg.color}</div>
        </div>
      </div>
      <div className=" justify-self-center">{formatPrice(item.price)}</div>
      <div className=" justify-self-center">{item.quantity}</div>
      <div className=" justify-self-end font-semibold">
        {(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  )
}
