import React from "react"
import { ContainerStyles } from "../components/ContainerStyles"
import LoginForm from "./LoginForm"
import FormWrap from "../components/FormWrap"
import { getCurrentUser } from "@/actions/getCurrentUser"

type Props = {}

export const dynamic = "force-dynamic"

export default async function Login({}: Props) {
  const currentUser = await getCurrentUser()

  return (
    <ContainerStyles>
      <FormWrap>
        <LoginForm currentUser={currentUser} />
      </FormWrap>
    </ContainerStyles>
  )
}
