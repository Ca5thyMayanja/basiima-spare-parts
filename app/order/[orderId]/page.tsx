import React from 'react'

import { ContainerStyles } from '@/app/components/ContainerStyles'
import OrderDetails from './OrderDetails'
import getOrderById from '@/actions/getOrderById'
import NullData from '@/app/components/NullData'

interface props {
  orderId?: string
}

export default async function Order({ params }: { params: props }) {
  const order = await getOrderById(params)

  // console.log(" ++++++ Pdt id ", params.id);

  if (!order) {
    return <NullData title={'No order found'} />
  }

  return (
    <div className=" p-8">
      <ContainerStyles>
        <div className=" gap-8">
          {order !== undefined && (
            <>
              <OrderDetails order={order} />
              <div className=" flex flex-col mt-20 gap-4"></div>
            </>
          )}
        </div>
      </ContainerStyles>
    </div>
  )
}
