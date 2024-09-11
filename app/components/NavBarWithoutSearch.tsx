'use client'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import queryString from 'query-string'
import React, { useState } from 'react'
import { GrSearch } from 'react-icons/gr'
import CartCount from './nav/CartCount'
import SomeUserProvider from './SomeUserProvider'
import ZionLogo from './ZionLogo'

type Props = {}

export default function NavBarWithoutSearch({}: Props) {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  // console.log('-------  ssearchparams: ', searchParams?.get('searchparam'))
  const searchQuery = searchParams ? searchParams?.get('q') : ''
  const [search, setSearch] = useState(searchQuery || '')

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setSearch(value)

    const url = queryString.stringifyUrl({
      url: '/search',
      query: {
        q: value,
      },
    })

    // console.log('>>>>>>>>>>>>> URL: ', url)

    if (value) {
      // router.push(url)
      router.push(`/search?q=${value}`, { scroll: false })
    } else {
      router.push('/search', { scroll: false })
    }
  }

  const bigsearchbar = (
    <div className=" flex justify-between items-center">
      <div className="">
        <Link href={'/'}>
          <ZionLogo />
        </Link>
      </div>

      <div className=" flex justify-evenly gap-10">
        <CartCount />
        <SomeUserProvider />
      </div>
    </div>
  )
  const smallsearchbar = (
    <div className=" flex justify-between items-center">
      <div className="">
        <Link href={'/'}>
          <ZionLogo />
        </Link>
      </div>

      <CartCount />

      <SomeUserProvider />
    </div>
  )

  return (
    <div>
      <div className="block md:hidden">{smallsearchbar}</div>
      <div className="hidden md:block">{bigsearchbar}</div>
    </div>
  )
}
