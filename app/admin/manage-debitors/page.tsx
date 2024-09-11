import { ContainerStyles } from "@/app/components/ContainerStyles"
import FormWrap from "@/app/components/FormWrap"
import React from "react"
import { getCurrentUser } from "@/actions/getCurrentUser"
import NullData from "@/app/components/NullData"

import AddDebitorsForm from "./AddDebitorsForm"
import DebitorsTable from "./DebitorsTable"
import getDebitorss from "@/actions/getDebitors"
export const dynamic = "force-dynamic"

export default async function Page() {
  const currentUser = await getCurrentUser()

  const debitors = await getDebitorss()

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Ooops access denied" />
  }

  return (
    <div>
      <ContainerStyles>
        <FormWrap>
          <AddDebitorsForm userId={currentUser.id} />
        </FormWrap>
        <DebitorsTable debitors={debitors} />
      </ContainerStyles>
    </div>
  )
}
