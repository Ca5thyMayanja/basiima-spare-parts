"use client"
import { Order, Product, User, Debitor, Creditor } from "@prisma/client"
import React, { useEffect, useState } from "react"
import Heading from "../components/Heading"
import formatPrice from "../utils/formatPrice"
import { formatNumber } from "../utils/formatNumber"

type Props = {
  orders: Order[]
  products: Product[]
  users: User[]
  debitors: Debitor[]
  creditors: Creditor[]
}

interface SummaryDataType {
  [key: string]: {
    label: string
    digit: number
  }
}

export default function Summary({
  orders,
  products,
  users,
  debitors,
  creditors,
}: Props) {
  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    sale: { label: "Total Sales ", digit: 0 },
    products: { label: "Products", digit: 0 },
    orders: { label: "Total Orders", digit: 0 },
    paidOrders: { label: "Paid Orders", digit: 0 },
    unpaidOrders: { label: "Unpaid Orders", digit: 0 },
    users: { label: "Total Users", digit: 0 },
    debitors: { label: "Debitors", digit: 0 },
    creditors: { label: "Creditors", digit: 0 },
    debitAmount: { label: "Debit Amount", digit: 0 },
    creditAmount: { label: "Credit Amount", digit: 0 },
  })

  useEffect(() => {
    setSummaryData((prev) => {
      let tempData = { ...prev }
      const totalSale = orders.reduce((acc, item) => {
        if (item.status === "complete") {
          return acc + item.amount
        } else {
          return acc
        }
      }, 0)

      const paidOrders = orders.filter((item) => {
        return item.status === "complete"
      })
      const unpaidOrders = orders.filter((item) => {
        return item.status === "pending"
      })

      const totalDebitors = debitors?.length || 0
      const totalCreditors = creditors?.length || 0

      const totalDebitAmount = (debitors || []).reduce((acc, item) => {
        let amount = acc + item.amount
        return amount
      }, 0)

      const totalCreditAmount = (creditors || []).reduce((acc, item) => {
        let amount = acc + item.amount
        return amount
      }, 0)

      tempData.sale.digit = totalSale
      tempData.orders.digit = orders.length
      tempData.paidOrders.digit = paidOrders.length
      tempData.unpaidOrders.digit = unpaidOrders.length
      tempData.products.digit = products.length
      tempData.users.digit = users.length

      tempData.debitors.digit = totalDebitors
      tempData.creditors.digit = totalCreditors
      tempData.debitAmount.digit = totalDebitAmount
      tempData.creditAmount.digit = totalCreditAmount

      return tempData
    })
  }, [orders, products, users, debitors, creditors])

  const summaryKeys = Object.keys(summaryData)

  return (
    <div className=" max-w-[1150px] m-auto">
      <div className=" mb-4 mt-8">
        <Heading title={"Stats"} center={true} />
      </div>
      <div className=" grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {summaryKeys &&
          summaryKeys.map((key) => {
            return (
              <div
                key={key}
                className=" rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition"
              >
                <div className=" text-xl md:text-4xl font-bold">
                  {summaryData[key].label === "Total Sale" ? (
                    <>{formatPrice(summaryData[key].digit)}</>
                  ) : (
                    <>{formatNumber(summaryData[key].digit)}</>
                  )}
                </div>
                <div>{summaryData[key].label}</div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
