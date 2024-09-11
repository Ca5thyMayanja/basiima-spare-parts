import { ContainerStyles } from "@/app/components/ContainerStyles"
import getProducts from "@/actions/getProduct"
import { getCurrentUser } from "@/actions/getCurrentUser"
import NullData from "@/app/components/NullData"
import ManageOrdersClient from "./ManageOrdersClient"
import getOrders from "@/actions/getOrders"
import LogoAndUserMenu from "@/app/components/NavBars/LogoAndUserMenu"

export const dynamic = "force-dynamic"

type Props = {}

export default async function ManageOrders({}: Props) {
  const orders = await getOrders()
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title={"Oops! Access Denied"} />
  }

  if (!orders) {
    return <NullData title={"No Products to manage"} />
  }

  return (
    <ContainerStyles>
      <ManageOrdersClient orders={orders} />
    </ContainerStyles>
  )
}
