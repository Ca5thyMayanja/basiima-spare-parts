'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import queryString from 'query-string'
import React, { useState } from 'react'
import { GrSearch } from 'react-icons/gr'

type Props = {}

export default function SearchComponent({}: Props) {
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

  const forsmallscreen = (
    <div className=" flex items-center justify-between text-[10px]">
      <form>
        <div className=" mx-auto flex lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Search product here..."
            className="w-full outline-none text-black text-[10px] "
            onChange={handleSearch}
            value={search}
          />
          <button className=" text-sm min-w-[30px] h-8 bg-slate-500 flex items-center justify-center rounded-r-full text-white">
            <GrSearch size={10} />
          </button>
        </div>
      </form>
    </div>
  )
  const forbigscreen = (
    <div className=" flex items-center justify-between">
      <form>
        <div className=" mx-auto flex lg:flex items-center w-full justify-between max-w-md border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Search product here..."
            className="w-full outline-none text-black text-[20px] "
            onChange={handleSearch}
            value={search}
          />
          <button className=" text-lg min-w-[50px] h-8 bg-slate-500 flex items-center justify-center rounded-r-full text-white">
            <GrSearch size={20} />
          </button>
        </div>
      </form>
    </div>
  )

  return (
    <div>
      <div className=" md:hidden block">{forsmallscreen}</div>
      <div className=" hidden md:block">{forbigscreen}</div>
    </div>
  )
}
