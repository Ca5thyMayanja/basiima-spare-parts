"use client"

import React, { useEffect, useState, Suspense } from "react"
import { categories } from "@/utils/Categories"
import { useRouter, useSearchParams } from "next/navigation"
import { Product } from "@prisma/client"
import VerticalCard from "../components/VerticalCard"

type Props = {}

type searchcategory = {
  name: string
  checked: boolean
}

export default function Page({}: Props) {
  const router = useRouter()
  const params = useSearchParams()

  let [selectedcategories, setSelectedcategories] = useState<searchcategory[]>(
    []
  )
  const [trueCheckNames, setTrueCheckNames] = useState<string[]>([])
  const [searchurl, setSearchurl] = useState<string | null>("")
  const [sortBy, setSortBy] = useState("")
  const [data, setData] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [prevurlparams, setprevurlparams] = useState<string[] | null>(null)

  // Initialize state from URL params
  useEffect(() => {
    const categoryParam = params?.get("category")
    if (categoryParam) {
      setSelectedcategories([{ name: categoryParam, checked: true }])
    } else {
      setSelectedcategories([])
    }
  }, [params])

  useEffect(() => {
    console.log("selected category list: ", selectedcategories)
  }, [selectedcategories])

  function getTrueCheckNames(): string[] {
    if (selectedcategories) {
      return selectedcategories
        .filter((item) => item.checked === true)
        .map((item) => item.name)
    }
    return []
  }

  useEffect(() => {
    const newTrueCheckNames = getTrueCheckNames()
    setTrueCheckNames(newTrueCheckNames)
    console.log("Names of categories with true checks:", newTrueCheckNames)
  }, [selectedcategories])

  function generateURL(baseUrl?: string): string {
    const params = new URLSearchParams()
    trueCheckNames.forEach((name) => params.append("category", name))
    return `${baseUrl}?${params.toString()}`
  }

  useEffect(() => {
    const generatedsearchurl = generateURL("/category")
    setSearchurl(generatedsearchurl)
    console.log("Search URL:", generatedsearchurl)
  }, [trueCheckNames])

  useEffect(() => {
    if (searchurl) {
      router.push(searchurl, { scroll: false })
    }
  }, [searchurl, router])

  const handleOnChangeSortBy = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSortBy(value)

    if (value === "asc") {
      setData((preve) => preve.sort((a, b) => a.price - b.price))
    }

    if (value === "dsc") {
      setData((preve) => preve.sort((a, b) => b.price - a.price))
    }
  }

  const fetchData = async () => {
    const response = await fetch(`/api/filterproducts`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        categories: trueCheckNames,
      }),
    })

    const dataResponse = await response.json()
    setData(dataResponse?.data || [])
  }

  useEffect(() => {
    fetchData()
  }, [trueCheckNames])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto p-4">
        {/***desktop version */}
        <div className=" lg:grid grid-cols-[200px,1fr]  flex flex-col">
          {/***left side */}
          <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
            {/**sort by */}
            <div className="">
              <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
                Sort by
              </h3>
              <form className="text-sm flex flex-col gap-2 py-2 ">
                <div className="flex items-center gap-3">
                  <input
                    className=" cursor-pointer"
                    type="radio"
                    name="sortBy"
                    checked={sortBy === "asc"}
                    onChange={handleOnChangeSortBy}
                    value={"asc"}
                  />
                  <label>Price - Low to High</label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    className=" cursor-pointer"
                    type="radio"
                    name="sortBy"
                    checked={sortBy === "dsc"}
                    onChange={handleOnChangeSortBy}
                    value={"dsc"}
                  />
                  <label>Price - High to Low</label>
                </div>
              </form>
            </div>

            {/**filter by */}
            <div className="">
              <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
                Category
              </h3>
              <form className=" ml-5 text-sm text-white pt-1 justify-between overflow-x-scroll no-scrollbar  py-3 grid grid-cols-2 gap-x-4 gap-y-2 md:flex md:flex-col ">
                {categories.map((item) => {
                  const isChecked =
                    selectedcategories?.some(
                      (cat) => cat.name === item.label && cat.checked
                    ) || false

                  return (
                    <label
                      key={item.label}
                      className="gap-3 flex items-center cursor-pointer "
                    >
                      <input
                        className="cursor-pointer"
                        type="checkbox"
                        id={item.label}
                        name={item.label}
                        checked={isChecked}
                        onChange={(e) =>
                          setSelectedcategories((prev) =>
                            prev.map((cat) =>
                              cat.name === e.target.name
                                ? { ...cat, checked: e.target.checked }
                                : cat
                            )
                          )
                        }
                      />
                      <span className="text-black">{item.label}</span>
                    </label>
                  )
                })}
              </form>
            </div>

            <div className="px-4 md:hidden block">
              <p className="font-medium text-slate-800 text-lg my-2">
                Search Results : {data.length}
              </p>
              {data.length === 0 && (
                <div>No Products found in this category</div>
              )}
              <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
                {data.length !== 0 && !loading && (
                  <VerticalCard data={data} loading={loading} />
                )}
              </div>
            </div>
          </div>

          {/***right side ( product ) */}
          <div className="px-4 md:block hidden">
            <p className="font-medium text-slate-800 text-lg my-2">
              Search Results : {data.length}
            </p>
            {data.length === 0 && <div>No Products found in this category</div>}
            <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
              {data.length !== 0 && !loading && (
                <VerticalCard data={data} loading={loading} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  )
}
