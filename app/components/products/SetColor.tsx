import {
  CartProductType,
  SelectedImgType,
} from '@/app/product/[id]/ProductDetails'
import React from 'react'

type SetColorProps = {
  images: SelectedImgType[]
  cartProduct: CartProductType
  handleColorSelect: (value: SelectedImgType) => void
}

export default function SetColor({
  images,
  cartProduct,
  handleColorSelect,
}: SetColorProps) {
  return (
    <div>
      <div className=" flex items-center gap-4">
        <span className=" font-semibold">COLOR:</span>
        <div className="flex gap-1">
          {images.map((image) => {
            return (
              <div
                key={image.color}
                onClick={() => handleColorSelect(image)}
                className={` cursor-pointer  rounded-full h-7 w-7 flex justify-center items-center border-teal-300 ${
                  cartProduct.selectedImg.color === image.color
                    ? ' border-2'
                    : ' border-none'
                }`}
              >
                <div
                  style={{ background: image.colorCode }}
                  className="h-5 w-5 rounded-full border-2 border-slate-300"
                ></div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
