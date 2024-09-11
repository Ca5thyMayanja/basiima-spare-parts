import React from "react"
import { IconType } from "react-icons"

type Props = {
  label: string
  disabled?: boolean
  outline?: boolean
  small?: boolean
  custom: string
  icon?: IconType
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button({
  label,
  disabled,
  outline,
  small,
  custom,
  icon: Icon,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
      disabled:opacity-70
      disabled:cursor-not-allowed
       rounded-lg hover:opacity-100 transition md:w-full w-[100px] border-slate-700 flex items-center justify-center gap-2
       ${outline ? "bg-white" : " bg-slate-700"} ${outline ? "text-slate-700" : "text-white"}
       ${small ? "text-sm font-light" : "text-lg font-semibold"}
       ${small ? "py-1 px-2 border-[1px]" : "py-3 px-4 border-2"}
       ${custom ? custom : ""}
      `}
    >
      {Icon && <Icon className="mr-2 text-2xl" />}
      {label}
    </button>
  )
}
