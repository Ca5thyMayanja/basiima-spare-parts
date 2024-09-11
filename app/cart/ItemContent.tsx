"use client"
import React from "react"
import { CartProductType } from "../product/[id]/ProductDetails"
import { trunctatename } from "../utils/truncatename"
import formatPrice from "../utils/formatPrice"
import Link from "next/link"
import Button from "../components/Button"
import Image from "next/image"
import SetQuantity from "../components/products/SetQuantity"
import useCart from "../hooks/useCart"

type Props = {
  item: CartProductType
}

export default function ItemContent({ item }: Props) {
  let { handleRemoveProductFromCart, handleQtyIncrease, handleQtyDecrease } =
    useCart()

  return (
    <div className=" grid grid-cols-5  text-[10px] md:text-sm gap-5 border-t-2 border-slate-200 py-4 items-center">
      <div className=" col-span-2 justify-self-start flex md:gap-4">
        <Link href={`/product/${item.id}`}>
          <div className=" w-[60px] md:w-[70px] relative aspect-square">
            <Image
              src={item.selectedImg.image}
              alt={item.name}
              fill
              className=" object-contain p-2"
            />
          </div>
        </Link>
        <div className=" flex flex-col justify-between md:text-sm text-xs">
          <Link
            href={`/product/${item.id}`}
            className=" cursor-pointer mt-1 text-ellipsis line-clamp-2 md:text-sm text-[10px]"
          >
            {trunctatename(item.name)}
          </Link>
          <div className=" text-[10px] md:text-sm">
            {item.selectedImg.color}
          </div>
          <div className=" w-[50px]">
            <Button
              custom="text-xs mt-3 mb-3 w-[50px]"
              label="Remove"
              onClick={() => handleRemoveProductFromCart(item)}
              small
              outline
            />
          </div>
        </div>
      </div>
      <div className=" justify-self-center md:text-sm text-[10px]">
        {" "}
        {formatPrice(item.price)}
      </div>
      <div className=" justify-self-center">
        <SetQuantity
          handleQtyIncrease={() => handleQtyIncrease(item)}
          handleQtyDecrease={() => handleQtyDecrease(item)}
          cartCounter={true}
          cartProduct={item}
        />
      </div>
      <div className=" justify-self-end font-semibold">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  )
}
