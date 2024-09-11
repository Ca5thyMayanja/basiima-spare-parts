import React from 'react'
import { IconType } from 'react-icons'

type Props = {
  selected?: boolean
  icon: IconType
  label: string
}

export default function AdminNavItem({ selected, icon: Icon, label }: Props) {
  return (
    <div
      className={` flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-900 transition cursor-pointer ${selected ? ' border-b-slate-500 text-slate-800' : ' border-transparent text-slate-500'}`}
    >
      <Icon size={20} />
      <div className=" font-medium text-sm text-center break-normal">
        {label}
      </div>
    </div>
  )
}
