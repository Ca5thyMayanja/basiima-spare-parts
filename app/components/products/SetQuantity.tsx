import { CartProductType } from '@/app/product/[id]/ProductDetails'
import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6'

type Props = {
  cartCounter: boolean
  cartProduct: CartProductType
  handleQtyIncrease: (product: CartProductType) => void
  handleQtyDecrease: (product: CartProductType) => void
}

export default function SetQuantity({
  cartCounter,
  cartProduct,
  handleQtyIncrease,
  handleQtyDecrease,
}: Props) {
  return (
    <div
      className={`flex flex-row items-center ${cartCounter ? ' gap-3' : 'gap-8'}`}
    >
      <span className={`${cartCounter == true ? ' hidden' : 'block'}`}>
        QAUNTITY
      </span>
      <div
        className="border p-2 cursor-pointer"
        onClick={() => handleQtyDecrease(cartProduct)}
      >
        <FaMinus />
      </div>
      <div>{cartProduct.quantity}</div>
      <div
        className="border p-2  cursor-pointer"
        onClick={() => handleQtyIncrease(cartProduct)}
      >
        <FaPlus />
      </div>
    </div>
  )
}
