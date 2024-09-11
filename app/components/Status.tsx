import React from 'react'
import { IconType } from 'react-icons'

type Props = {
  text: string
  icon: IconType
  bg: string
  color: string
  custom?: string
}

export default function Status({ custom, text, icon: Icon, bg, color }: Props) {
  return (
    <div
      className={`${custom} ${bg} ${color} px-1 flex rounded justify-center items-center gap-2`}
    >
      {text}
      <Icon size={15} color={custom} />
    </div>
  )
}
