import React from 'react'

type Props = {
  children: React.ReactNode
}

export const ContainerStyles = ({ children }: Props) => {
  return (
    <div className=" max-w-[1920px] mx-auto xl:px-20 md:px-2 px-4 p-5">
      {children}
    </div>
  )
}
