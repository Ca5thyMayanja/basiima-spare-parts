'use client'

import React, { HtmlHTMLAttributes, useRef } from 'react'
import { ContainerStyles } from '../components/ContainerStyles'
import { categories } from '@/utils/Categories'

export default function AlternativeCategoryComponent() {
  const scrollelement = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollelement.current) {
      scrollelement.current.scrollLeft -= 800
    }
  }
  const scrollRight = () => {
    if (scrollelement.current) {
      scrollelement.current.scrollLeft += 800
    }
  }

  return (
    <div>
      <ContainerStyles>
        <div className=" flex flex-col relative">
          <div
            ref={scrollelement}
            className=" pt-1 pb-3 px-4 flex flex-row items-center justify-between overflow-x-scroll no-scrollbar "
          >
            <div className=" flex items-center">
              <button
                className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
                onClick={scrollLeft}
              >
                <FaAngleLeft />
              </button>
              <button
                className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
                onClick={scrollRight}
              >
                <FaAngleRight />
              </button>
            </div>
            {categories.map((item) => (
              <Catego
                key={item.label}
                label={item.label}
                // icon={item.icon}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </ContainerStyles>
    </div>
  )
}

//searchcompo

// ----------------------------------   categories component ---------------------

import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { IconType } from 'react-icons'
import queryString from 'query-string'
import Image, { StaticImageData } from 'next/image'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'

type Props2 = {
  label: string
  icon?: IconType
  // selected?: boolean
  image?: StaticImageData
}

export function Catego({ label, icon: Icon, image }: Props2) {
  const router = useRouter()

  const handleClick2 = useCallback(() => {
    if (label === 'All') {
      router.push('/')
    } else {
      router.push(`/category?category=${encodeURIComponent(label)}`, {
        scroll: false,
      })
    }
  }, [label, router])

  return (
    <div className=" ">
      {/* <div className=" bg-red-200 w-[calc(100vw-190px)]"> */}
      <div
        onClick={handleClick2}
        className={`flex flex-col items-center justify-center text-center gap-1 p-3 border-b-2 text-sm hover:text-slate-800  transition cursor-pointer 
         bg-slate-100 md:h-[80px] md:w-[80px]  h-[70px] w-[70px] m-2 rounded-full shadow-lg

      `}
      >
        {Icon && <Icon size={15} />}
        {image && (
          <div>
            <Image
              className="hidden md:block"
              src={image}
              alt={'categoryimage'}
              width={20}
              height={20}
            />
            <Image
              className=" md:hidden block"
              src={image}
              alt={'categoryimage'}
              width={15}
              height={15}
            />
          </div>
        )}
        <div className=" font-medium md:text-[12px] text-[10px]">{label}</div>
      </div>
    </div>
  )
}
