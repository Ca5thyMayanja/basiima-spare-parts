'use client'
import { useRouter } from 'next/navigation'
import queryString from 'query-string'
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

export default function SearchBar() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // console.log('>>>>>>>>>>......... SearchField Data', data)
    if (!data.searchTerm) {
      return router.push('/')
    }
    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: {
          searchTerm: data.searchTerm,
        },
      },
      { skipNull: true },
    )
    router.push(url)
    reset()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('----Search Term', e.target.value)

    // setSearchTerm(e.target.value)
  }

  const smallsearchbar = (
    <div className=" flex items-center">
      <input
        {...register('searchTerm')}
        onChange={handleChange}
        className=" p-2 border-gray-300 rounded-l-md focus:outline-none focus:border-[0.5px] focus:border-slate-500 w-30 text-sm"
        autoComplete="off"
        type="text"
        placeholder="Search for Vitenge"
      />
      <button
        onClick={handleSubmit(onSubmit)}
        type="button"
        className="bg-slate-700 hover:opacity-50 text-white p-2 rounded-r-md text-sm"
      >
        Search
      </button>
    </div>
  )

  const bigsearchbar = (
    <div className=" flex items-center">
      <input
        {...register('searchTerm')}
        onChange={handleChange}
        className=" p-2 border-gray-300 rounded-l-md focus:outline-none focus:border-[0.5px] focus:border-slate-500 w-80"
        autoComplete="off"
        type="text"
        placeholder="Search for Vitenge"
      />
      <button
        onClick={handleSubmit(onSubmit)}
        type="button"
        className="bg-slate-700 hover:opacity-50 text-white p-2 rounded-r-md"
      >
        Search
      </button>
    </div>
  )

  return (
    <div>
      <div className="block md:hidden">{smallsearchbar}</div>
      <div className="hidden md:block">{bigsearchbar}</div>
    </div>
  )
}
