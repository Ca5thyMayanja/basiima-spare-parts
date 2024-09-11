'use client'
import axios from 'axios'
import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'

export default function ClearOrdersComponent({
  children,
}: {
  children: React.ReactNode
}) {
  function deteteOrders() {
    axios.delete('/api/order')
  }

  return (
    <div className=" hover:cursor-pointer" onClick={deteteOrders}>
      <FaTrashAlt size={30} color="red" />
      <>{children}</>
    </div>
  )
}
