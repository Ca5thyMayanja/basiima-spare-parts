import React from "react"
import { ContainerStyles } from "../components/ContainerStyles"
import FormWrap from "../components/FormWrap"
import RegisterForm from "./RegisterForm"
import { getCurrentUser } from "@/actions/getCurrentUser"

export const dynamic = "force-dynamic"

type Props = {}

export default async function Register({}: Props) {
  const currentUser = await getCurrentUser()

  return (
    <ContainerStyles>
      <FormWrap>
        <RegisterForm currentUser={currentUser} />
      </FormWrap>
    </ContainerStyles>
  )
}
