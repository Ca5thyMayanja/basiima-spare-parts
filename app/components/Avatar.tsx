import Image from 'next/image'
import React from 'react'
import { AiOutlineAccountBook, AiOutlineUser } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa6'

type Props = {
  src?: string | null
}

export default function Avatar({ src }: Props) {
  if (src) {
    return (
      <Image
        src={src}
        alt={'avatar'}
        height={30}
        width={30}
        className=" rounded-full"
      />
    )
  } else {
    return <FaUser />
  }
}
