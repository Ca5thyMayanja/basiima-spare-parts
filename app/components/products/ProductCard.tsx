"use client"
import Image from "next/image"
import React from "react"
import { Product } from "@/app/utils/products"
import formatPrice from "@/app/utils/formatPrice"
import { trunctatename } from "@/app/utils/truncatename"
import { Rating } from "@mui/material"
import { useRouter } from "next/navigation"

interface Props {
  data: any
}

export default function ProductCard({ data }: Props) {
  const pdtrating =
    data?.reviews?.reduce((acc: number, item: any) => item.rating + acc, 0) /
    data?.reviews.length

  const router = useRouter()
  const goToNextPage = () => {
    router.push(`product/${data.id}`)
  }

  return (
    <div
      className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-lg p-2 transition hover:scale-105 text-center text-sm m-3 flex flex-col justify-between
      
      
      md:min-h-[370px]  min-h-[280px] lg:min-h-[350px] "
      onClick={goToNextPage}
    >
      <div className=" flex flex-col items-center w-full gap-1">
        <div className=" aspect-square overflow-hidden relative w-full">
          <Image
            src={data?.images[0].image}
            className=" object-contain"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            alt={"data"}
          />
        </div>
        <div className="mt-4 font-bold line-clamp-1">
          {" "}
          {trunctatename(data?.name)}
        </div>
        <div>
          <Rating value={pdtrating} readOnly />
        </div>
        <div>{data.brand}</div>
        {data?.reviews !== null ||
          (undefined && (
            <div>
              {data?.reviews.length}{" "}
              {data?.reviews.length == 1 ? (
                <span>Review</span>
              ) : (
                <span>Reviews</span>
              )}
            </div>
          ))}
        <div className=" font-bold">{formatPrice(data?.price)}</div>
      </div>
    </div>
  )
}
