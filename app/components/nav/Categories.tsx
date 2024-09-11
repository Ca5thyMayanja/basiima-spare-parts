"use client"
import React from "react"
import { ContainerStyles } from "../ContainerStyles"
import { categories } from "@/utils/Categories"
import Category from "../Category"
import { usePathname, useSearchParams } from "next/navigation"

export default function Categories() {
  const params = useSearchParams()
  const category = params?.get("category")

  const pathName = usePathname()

  const isMainpage = pathName === "/"

  if (!isMainpage) {
    return null
  }

  return (
    <div>
      <ContainerStyles>
        <div
          className=" pt-1 flex flex-row items-center justify-between 
         overflow-x-scroll
           no-scrollbar
        "
        >
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
      </ContainerStyles>
    </div>
  )
}
