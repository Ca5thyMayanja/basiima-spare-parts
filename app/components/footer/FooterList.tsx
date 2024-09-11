import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function FooterList({ children }: Props) {
  return (
    <div className=" w-full  md:w-1/4 lg:w-1/6 md:m-6 flex flex-col gap-2 justify-start items-center md:justify-start">
      {children}
    </div>
  )
}
