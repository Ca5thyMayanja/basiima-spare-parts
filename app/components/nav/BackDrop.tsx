import React from 'react'

type Props = { onclick: () => void }

export default function BackDrop({ onclick }: Props) {
  return (
    <div
      onClick={onclick}
      className=" z-20 bg-slate-200 opacity-50 w-screen h-screen fixed top-0 left-0"
    ></div>
  )
}
