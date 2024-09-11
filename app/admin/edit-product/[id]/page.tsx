import { ContainerStyles } from "@/app/components/ContainerStyles"
import FormWrap from "@/app/components/FormWrap"
import React from "react"
import { getCurrentUser } from "@/actions/getCurrentUser"
import NullData from "@/app/components/NullData"
import EditProductForm from "../EditProductForm"
import getSpecificProductById from "@/actions/getSpecificProductById"

interface params {
  params: {
    id: string
  }
}
export const dynamic = "force-dynamic"

export default async function EditProduct(pageparams: params) {
  const id = pageparams.params.id

  const currentUser = await getCurrentUser()

  const product = await getSpecificProductById({ id })

  // console.log('Gotten product', product)

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Ooops access denied" />
  }

  return (
    <div className=" p-8">
      <ContainerStyles>
        <FormWrap>{product && <EditProductForm product={product} />}</FormWrap>
      </ContainerStyles>
    </div>
  )
}
