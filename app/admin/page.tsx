import React from "react"
import Summary from "./Summary"
import getProducts from "@/actions/getProduct"
import getOrders from "@/actions/getOrders"
import getAllUsers from "@/actions/getAllUsers"
import getCreditors from "@/actions/getCreditors"
import getDebitors from "@/actions/getDebitors"
import { ContainerStyles } from "../components/ContainerStyles"
import NullData from "../components/NullData"
import BarGraph from "./BarGraph"
import getGraphData from "@/actions/getGraphData"

type Props = {}

export default async function Admin({}: Props) {
  const products = await getProducts({ category: null })
  const orders = await getOrders()
  const users = await getAllUsers()

  const debitors = await getDebitors()
  const creditors = await getCreditors()

  if (!users || !orders || !products) {
    return <NullData title={"Some components missing"} />
  }

  const graphData = await getGraphData()

  return (
    <div className=" pt-8">
      <ContainerStyles>
        <Summary
          orders={orders}
          products={products}
          users={users}
          debitors={debitors}
          creditors={creditors}
        />
        <div className=" mt-4 m-auto max-w-[1150px]">
          <BarGraph data={graphData} />
        </div>
      </ContainerStyles>
    </div>
  )
}
