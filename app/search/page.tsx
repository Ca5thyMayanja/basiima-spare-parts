"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import VerticalCard from "../components/VerticalCard"
import { ContainerStyles } from "../components/ContainerStyles"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const searchQuery = searchParams ? searchParams?.get("q") : ""

  console.log(">>>>>>>>>>>>>>>> Search Page searchparams: ", searchQuery)

  const fetchProduct = async () => {
    setLoading(true)
    const response = await fetch(`api/search?q=${searchQuery}`)
    const dataResponse = await response.json()
    setLoading(false)

    console.log(">>>>>>>... data response from api", dataResponse)

    setData(dataResponse.data)
  }

  useEffect(() => {
    fetchProduct()
  }, [searchParams])

  const forbigscreen = (
    <ContainerStyles>
      <div className="container mx-auto p-4">
        {loading && <p className="text-lg text-center">Loading ...</p>}

        <p className="text-lg font-semibold my-3">
          Search Results for &quot;{searchQuery}&quot;
        </p>
        <p className="text-lg font-semibold my-3">
          Number of Search Results : {data.length}
        </p>

        {data.length === 0 && !loading && (
          <p className="bg-white text-lg text-center p-4">No Data Found....</p>
        )}

        {data.length !== 0 && !loading && (
          <VerticalCard loading={loading} data={data} />
        )}
      </div>
    </ContainerStyles>
  )

  const forsmallscreen = (
    <div className="container p-4">
      {loading && <p className="text-lg text-center">Loading ...</p>}

      <p className="text-lg font-semibold my-3">
        Search Results for &quot;{searchQuery}&quot;
      </p>
      <p className="text-lg font-semibold my-3">
        Number of Search Results : {data.length}
      </p>

      {data.length === 0 && !loading && (
        <p className="bg-white text-lg text-center p-4">No Data Found....</p>
      )}

      {data.length !== 0 && !loading && (
        <VerticalCard loading={loading} data={data} />
      )}
    </div>
  )

  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <div className=" md:block hidden">{forbigscreen}</div>
      <div className=" md:hidden block">{forsmallscreen}</div>
    </Suspense>
  )
}
