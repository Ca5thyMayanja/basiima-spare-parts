import React from 'react'

type Props = {
  children: React.ReactNode
  onClick: () => void
}

export default function MenuItem({ children, onClick }: Props) {
  return (
    <div onClick={onClick} className=" px-4 py-3 hover:bg-neutral-100">
      {children}
    </div>
  )
}
