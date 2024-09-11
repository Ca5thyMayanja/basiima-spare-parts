import React from "react"

type Props = {
  children: React.ReactNode
}

export default function FormWrap({ children }: Props) {
  return (
    <div className=" min-h-fit h-full flex items-center justify-center pb-12 pt-24">
      <div className=" w-full max-w-[650px] flex flex-col gap-6 items-center shadow-xl rounded-md p-4 md:p-8">
        {children}
      </div>
    </div>
  )
}
