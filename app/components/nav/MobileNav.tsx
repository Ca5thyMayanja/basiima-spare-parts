"use client"
import { IoMdMenu } from "react-icons/io"
import { RiCloseLargeFill } from "react-icons/ri"

import React, { useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { categories } from "@/utils/Categories"
import Category from "../Category"

type Props = {}

export default function MobileNav({}: Props) {
  const [isOpen, setIsOpen] = useState(false)

  function openMobileNavBar() {
    setIsOpen((prev) => !prev)
  }

  const params = useSearchParams()
  const category = params?.get("category")

  const pathName = usePathname()
  const isMainpage = pathName === "/"

  if (!isMainpage) {
    return null
  }

  return (
    <>
      <div className=" relative z-30">
        {isOpen ? (
          <></>
        ) : (
          <IoMdMenu
            onClick={openMobileNavBar}
            size={30}
            className="cursor-pointer"
          />
        )}
      </div>

      <div
        className={`z-40 fixed top-0 left-0 h-full w-64 bg-slate-200 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          <span className="font-bold text-lg">Categories</span>{" "}
          {/* Optional title or logo */}
          <RiCloseLargeFill
            onClick={openMobileNavBar}
            size={20}
            className="cursor-pointer ml-auto"
          />
        </div>
        <div className="p-4 flex flex-col items-start justify-between overflow-y-scroll h-[100vh]">
          {categories.map((item) => (
            <Category
              key={item.label}
              label={item.label}
              image={item.image}
              selected={
                category === item.label ||
                (category === null && item.label === "All")
              }
            />
          ))}
        </div>
      </div>
      {isOpen && (
        <div
          onClick={openMobileNavBar}
          className=" z-20 bg-slate-200 opacity-50 w-screen h-screen fixed top-0 right-0"
        ></div>
      )}
    </>
  )
}
