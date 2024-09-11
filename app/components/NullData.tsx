import React from 'react'

type Props = {
  title: string
}

export default function NullData({ title }: Props) {
  return (
    <>
      <div className=" w-full h-[50vh] flex items-center justify-center text-xl md:text-2xl">
        {title}
      </div>
    </>
  )
}
