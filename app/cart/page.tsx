import React from "react"
import { ContainerStyles } from "../components/ContainerStyles"
import CartClient from "./CartClient"
import { getCurrentUser } from "@/actions/getCurrentUser"

export const dynamic = "force-dynamic"

type Props = {}

export default async function Cart({}: Props) {
  const currentUser = await getCurrentUser()
  return (
    <ContainerStyles>
      <div className=" mt-5">
        <CartClient currentUser={currentUser} />
      </div>
    </ContainerStyles>
  )
}
