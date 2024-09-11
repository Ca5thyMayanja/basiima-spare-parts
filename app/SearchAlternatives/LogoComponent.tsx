import Link from 'next/link'
import React from 'react'
import ZionLogo from '../components/ZionLogo'

type Props = {}

export default function LogoComponent({}: Props) {
  return (
    <div className="">
      <Link href={'/'}>
        <ZionLogo />
      </Link>
    </div>
  )
}
