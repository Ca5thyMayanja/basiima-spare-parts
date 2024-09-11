import {
  CartProductType,
  SelectedImgType,
} from "@/app/product/[id]/ProductDetails"
import { Product } from "@/app/utils/products"
import Image from "next/image"
import React, { useCallback, useState } from "react"

type Props = {
  cartProduct: CartProductType
  product: Product
  handleColorSelect: (value: SelectedImgType) => void
}

export default function ProductImage({
  cartProduct,
  product,
  handleColorSelect,
}: Props) {
  const [zoomImage, setZoomImage] = useState(false)
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  })

  const handleZoomImage = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      setZoomImage(true)
      const { left, top, width, height } = (
        e.target as HTMLElement
      ).getBoundingClientRect()
      console.log("coordinate", left, top, width, height)

      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height

      setZoomImageCoordinate({
        x,
        y,
      })
    },
    [zoomImageCoordinate]
  )

  const handleLeaveImageZoom = () => {
    setZoomImage(false)
  }

  return (
    <div className=" grid grid-cols-6 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
      <div className=" flex flex-col items-center justify-center gap-4 cursor-pointer h-full max-h-[500px] min-h-[300px] sm:min-h-[400px] border">
        {product.images.map((image) => (
          <div
            key={image.color}
            onClick={() => handleColorSelect(image)}
            className={`rounded border-teal-400 w-[80%] relative aspect-square
        ${cartProduct.selectedImg.image === image.image ? "border-[1.5px]" : "border-none"}
        `}
          >
            <Image
              src={image.image}
              alt={image.color}
              className="w-full h-full object-contain"
              fill
            />
          </div>
        ))}
      </div>
      <div className=" aspect-square relative w-full mb-5 col-span-5">
        <Image
          src={cartProduct.selectedImg.image}
          className="w-full object-scale-down h-full max-h-[500px] min-h-[300px] mix-blend-multiply "
          alt={"product"}
          fill
          onMouseMove={handleZoomImage}
          onMouseLeave={handleLeaveImageZoom}
        />
        {zoomImage && (
          <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0 z-50">
            <div
              className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-100"
              style={{
                background: `url(${cartProduct.selectedImg.image})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `,
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  )
}
