'use client'
import Heading from '@/app/components/Heading'
import Status from '@/app/components/Status'
import formatPrice from '@/app/utils/formatPrice'
import { Order } from '@prisma/client'
import moment from 'moment'
import React from 'react'
import { GrCar } from 'react-icons/gr'
import { MdAccessTimeFilled, MdDone } from 'react-icons/md'
import OrderItem from './OrderItem'

type Props = {
  order: Order
}

export default function OrderDetails({ order }: Props) {
  return (
    <div className=" max-w-[1150px] m-auto flex flex-col gap-2">
      <div>
        <Heading title={'Order details'} center={false} />
      </div>
      <div>Order ID: {order.id}</div>
      <div>
        Total amount: <span>{formatPrice(order.amount)}</span>
      </div>
      <div className=" flex gap-2 items-center">
        <div>Payment status:</div>
        <div>
          {order.status === 'pending' ? (
            <Status
              text={'Pending'}
              icon={MdAccessTimeFilled}
              bg={'bg-slate-200'}
              color={'bg-slate-200'}
            />
          ) : order.status === 'complete' ? (
            <Status
              text={'Complete'}
              icon={MdDone}
              bg={'bg-green-200'}
              color={'bg-green-200'}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className=" flex gap-2 items-center">
        <div>Delivery status:</div>
        <div>
          {order.deliveryStatus === 'pending' ? (
            <Status
              text={'Pending'}
              icon={MdAccessTimeFilled}
              bg={'bg-slate-200'}
              color={'bg-slate-200'}
            />
          ) : order.deliveryStatus === 'dispatched' ? (
            <Status
              text={'Dispatched'}
              icon={GrCar}
              bg={'bg-green-200'}
              color={'bg-green-200'}
            />
          ) : order.deliveryStatus === 'delivered' ? (
            <Status
              text={'Delivered'}
              icon={MdDone}
              bg={'bg-green-200'}
              color={'bg-green-200'}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>{moment(order.createDate).fromNow()}</div>
      <div>
        <h2 className=" font-semibold mt-4 mb-2">Products Ordered</h2>
        <div className=" grid grid-cols-5 text-xs gap-4 items-center">
          <div className=" col-span-2 justify-self-start">PRODUCT</div>
          <div className=" justify-self-center">PRICE</div>
          <div className=" justify-self-center">QTY</div>
          <div className=" justify-self-end ">TOTAL</div>
        </div>
        {order.products &&
          order.products.map((item) => {
            return <OrderItem key={item.id} item={item} />
          })}
      </div>
    </div>
  )
}
