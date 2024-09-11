import { ContainerStyles } from "@/app/components/ContainerStyles"
import FormWrap from "@/app/components/FormWrap"
import React from "react"
import { getCurrentUser } from "@/actions/getCurrentUser"
import NullData from "@/app/components/NullData"

export const dynamic = "force-dynamic"

import AddCreditorsForm from "./AddCreditorsForm"
import getCreditors from "@/actions/getCreditors"
import CreditorsTable from "./CreditorsTable"

export default async function page() {
  const currentUser = await getCurrentUser()

  const creditors = await getCreditors()

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Ooops access denied" />
  }

  return (
    <div>
      <ContainerStyles>
        <FormWrap>
          <AddCreditorsForm userId={currentUser.id} />
        </FormWrap>
        <CreditorsTable creditors={creditors} />
      </ContainerStyles>
    </div>
  )
}
