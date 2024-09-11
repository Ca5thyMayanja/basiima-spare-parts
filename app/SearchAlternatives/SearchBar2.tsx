'use client'

import React, { useEffect, useState } from 'react'
import { GrSearch } from 'react-icons/gr'
import queryString from 'query-string'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import ZionLogo from '../components/ZionLogo'
import UserMenu from '../components/nav/UserMenu'
import SomeUserProvider from '../components/SomeUserProvider'
import CartCount from '../components/nav/CartCount'

export type BetterUser = {
  id: string
  name: string | null
  email: string | null
  emailVerified: string | null
  image: string | null
  hashedPassword: string | null
  createdAt: string
  updatedAt: string
  // role: $Enums.Role;
  role: 'USER' | 'ADMIN'
}

export default function SearchBar2() {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

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
      <form>
        <div className=" mx-auto flex lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Search product here..."
            className="w-full outline-none text-black"
            onChange={handleSearch}
            value={search}
          />
          <button className="text-lg min-w-[50px] h-8 bg-slate-500 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </button>
        </div>
      </form>
      <div className=" flex justify-evenly gap-10">
        <CartCount />
        {/* <SomeUserProvider /> */}
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
      <form className=" w-[200px] mx-auto">
        <div className=" mx-auto flex lg:flex items-center w-30 text-sm justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Search product here..."
            className="w-full outline-none text-black"
            onChange={handleSearch}
            value={search}
          />
          <button className="text-lg min-w-[50px] h-8 bg-slate-500 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </button>
        </div>
      </form>
      <CartCount />

      {/* <SomeUserProvider /> */}
    </div>
  )

  return (
    <div>
      <div className="block md:hidden">{smallsearchbar}</div>
      <div className="hidden md:block">{bigsearchbar}</div>
    </div>
  )
}
