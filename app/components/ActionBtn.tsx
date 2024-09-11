import React from 'react'
import { IconType } from 'react-icons'

type Props = {
  icon: IconType
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  custom?: string
  tooltip?: string
}

export default function ActionBtn({
  custom,
  disabled,
  icon: Icon,
  onClick,
  tooltip,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative group flex items-center justify-center rounded cursor-pointer w-[40px] h-[30px] text-slate-700 border border-slate-400 ${disabled && 'opacity-50 cursor-not-allowed'}`}
    >
      <Icon size={18} color={custom} />
      <div className=" absolute hidden bottom-4 mb-2 group-hover:flex justify-center items-center px-2 py-1 bg-slate-400 text-white text-[10px] rounded-md whitespace-nowrap h-5">
        {tooltip}
      </div>
    </button>
  )
}
