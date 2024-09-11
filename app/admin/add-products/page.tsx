import { ContainerStyles } from "@/app/components/ContainerStyles"
import FormWrap from "@/app/components/FormWrap"
import React from "react"
import AddProductForm from "./AddProductForm"
import { getCurrentUser } from "@/actions/getCurrentUser"
import NullData from "@/app/components/NullData"

export const dynamic = "force-dynamic"

type Props = {}

export default async function AddProducts({}: Props) {
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Ooops access denied" />
  }

  return (
    <div className=" p-8">
      <ContainerStyles>
        <FormWrap>
          <AddProductForm />
        </FormWrap>
      </ContainerStyles>
    </div>
  )
}
