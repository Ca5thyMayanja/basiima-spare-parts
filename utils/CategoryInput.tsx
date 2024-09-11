'use client'

import Image, { StaticImageData } from 'next/image'
import React from 'react'
import { IconType } from 'react-icons'

type Props = {
  selected?: boolean
  label: string
  icon?: IconType
  image?: StaticImageData
  onClick: (value: string) => void
}

export default function CategoryInput({
  selected,
  label,
  icon: Icon,
  image,
  onClick,
}: Props) {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 p-4 flex flex-col items-center gap-2 hover:border-slate-700 transition cursor-pointer ${selected ? 'border-slate-900' : 'border-slate-200'}
      `}
    >
      {image && (
        <Image src={image} alt={'categoryimage'} width={30} height={30} />
      )}
      {Icon && <Icon size={30} />}
      <div className=" font-medium">{label}</div>
    </div>
  )
}
