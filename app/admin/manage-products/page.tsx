import { ContainerStyles } from "@/app/components/ContainerStyles"
import React from "react"
import ManageProductsClient from "./ManageProductsClient"
import getProducts from "@/actions/getProduct"
import { getCurrentUser } from "@/actions/getCurrentUser"
import NullData from "@/app/components/NullData"

export const dynamic = "force-dynamic"

export default async function ManageProducts() {
  const products = await getProducts({ category: null })
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title={"Oops! Access Denied"} />
  }

  if (!products) {
    return <NullData title={"No Products to manage"} />
  }

  return (
    <ContainerStyles>
      <ManageProductsClient products={products} />
    </ContainerStyles>
  )
}
