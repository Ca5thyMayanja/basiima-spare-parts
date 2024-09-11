import React from 'react'

type Props = {}

interface HeadingProps {
  title: string
  center: boolean
}

export default function Heading({ title, center }: HeadingProps) {
  return (
    <div
      className={`
    ${center ? ' text-center ' : ' text-start'}`}
    >
      <h1 className=" font-bold md:text-2xl text-lg">{title}</h1>
    </div>
  )
}
