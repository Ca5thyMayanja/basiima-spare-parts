"use client"
import { usePathname, useRouter } from "next/navigation"
import React, { useCallback } from "react"
import { IconType } from "react-icons"
import queryString from "query-string"
import Image, { StaticImageData } from "next/image"

type Props = {
  label: string
  icon?: IconType
  selected?: boolean
  image?: StaticImageData
}

export default function Category({
  label,
  icon: Icon,
  selected,
  image,
}: Props) {
  const router = useRouter()

  const params = usePathname()

  const handleClick = useCallback(() => {
    if (label === "All") {
      router.push("/")
    } else {
      let currentQuery = {}
      if (params) {
        currentQuery = queryString.parse(params.toString())
      }
      const updatedQuery: any = {
        ...currentQuery,
        category: label,
      }
      const url = queryString.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        {
          skipNull: true,
        }
      )
      router.push(url)
    }
  }, [label, params, router])

  return (
    <div className=" ">
      {/* <div className=" bg-red-200 w-[calc(100vw-190px)]"> */}
      <div
        onClick={handleClick}
        className={`flex flex-col items-center justify-center text-center gap-1 p-2 border-b-2 text-sm hover:text-slate-800 transition cursor-pointer 
         bg-slate-100 h-[80px] w-[80px] m-2 rounded-md
        ${selected ? "border-b-slate-900 text-slate-900" : "border-transparent text-slate-500 h-24"}

      `}
      >
        {Icon && <Icon size={15} />}
        {image && (
          <Image src={image} alt={"categoryimage"} width={20} height={20} />
        )}
        <div className=" font-medium text-[12px]">{label}</div>
      </div>
    </div>
  )
}
