"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

export default function HomeBanner() {
  const router = useRouter()

  return (
    <div>
      {/* <div
        className=" rounded-md p-5 bg-slate-400 m-4 w-fit flex justify-center cursor-pointer"
        onClick={() => {
          router.push('/checkout2')
        }}
      >
        Test Currency Convversion
      </div> */}
      <div className="relative bg-gradient-to-r from-blue-400 to-blue-700">
        <div className="flex flex-col md:flex-row mx-auto px-8 py-12 gap-4 items-center justify-evenly">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Christmas Sale
            </h1>
            <p className="font-light text-white text-lg md:text-xl mb-2">
              Enjoy discounts on selected items
            </p>
            <p className="text-4xl md:text-2xl font-bold text-white mt-4">
              GET 50% OFF
            </p>
          </div>
          <div className="w-1/3 relative aspect-video">
            <Image
              src={"/sparebanner2.png"}
              alt="banner image"
              className="object-contain"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
