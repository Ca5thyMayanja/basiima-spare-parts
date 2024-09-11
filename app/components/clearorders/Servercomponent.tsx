import getOrders from '@/actions/getOrders'
import React from 'react'

export default async function Servercomponent() {
  const orders = await getOrders()

  return <div>{orders?.length}</div>
}
