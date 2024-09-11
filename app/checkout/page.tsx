import React from "react"
import { ContainerStyles } from "../components/ContainerStyles"
import FormWrap from "../components/FormWrap"
import CheckoutClient from "./CheckoutClient"

type Props = {}

export default function Checkout({}: Props) {
  return (
    <div className=" p-8">
      <ContainerStyles>
        <FormWrap>
          <CheckoutClient />
        </FormWrap>
      </ContainerStyles>
    </div>
  )
}
