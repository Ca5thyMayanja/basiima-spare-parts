"use client"
import ActionBtn from "@/app/components/ActionBtn"
import Heading from "@/app/components/Heading"
import Status from "@/app/components/Status"
import formatPrice from "@/app/utils/formatPrice"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Order, User } from "@prisma/client"
import React, { useCallback } from "react"
import { FaCheckCircle } from "react-icons/fa"
import { FaEye } from "react-icons/fa"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { MdAccessTimeFilled } from "react-icons/md"
import { IoCheckmarkDoneCircle } from "react-icons/io5"
import { GrDeliver } from "react-icons/gr"
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5"
import moment from "moment"

type Props = {
  orders: ExtendedOrder[]
}

type ExtendedOrder = Order & {
  user: User
}

export default function ManageOrdersClient({ orders }: Props) {
  const router = useRouter()
  let rows: any = []
  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order.id,
        customer: order.user.name,
        amount: order.amount,
        paymentStatus: order.status,
        deliveryStatus: order.deliveryStatus,
        date: order.createDate,
      }
    })
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "Order ID", width: 150 },
    { field: "customer", headerName: "Customer Name", width: 150 },
    {
      field: "amount",
      headerName: "Amount (USD)",
      width: 120,
      renderCell: (params) => {
        return (
          <div className=" font-bold text-slate-800">
            {formatPrice(params.row.amount)}
          </div>
        )
      },
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 150,
      renderCell: (params) => {
        return (
          <div className=" font-bold">
            {params.row.paymentStatus === "pending" ? (
              <Status
                text={params.row.paymentStatus}
                icon={MdAccessTimeFilled}
                bg={""}
                color={"text-blue-700"}
              />
            ) : params.row.paymentStatus === "complete" ? (
              <Status
                custom=""
                text={params.row.paymentStatus}
                icon={IoCheckmarkDoneCircle}
                bg={""}
                color={"text-green-700"}
              />
            ) : (
              <></>
            )}
          </div>
        )
      },
    },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      width: 150,
      renderCell: (params) => {
        return (
          <div className=" font-bold">
            {params.row.deliveryStatus === "pending" ? (
              <Status
                custom="blue"
                text={params.row.deliveryStatus}
                icon={MdAccessTimeFilled}
                bg={""}
                color={"text-blue-700"}
              />
            ) : params.row.deliveryStatus === "Dispatched" ? (
              <Status
                custom="orange"
                text={params.row.deliveryStatus}
                icon={GrDeliver}
                bg={""}
                color={"text-orange-400"}
              />
            ) : params.row.deliveryStatus === "Delivered" ? (
              <Status
                custom="lawngreen"
                text={params.row.deliveryStatus}
                icon={FaCheckCircle}
                bg={""}
                color={"text-green-700"}
              />
            ) : (
              <></>
            )}
          </div>
        )
      },
    },

    {
      field: "date",
      headerName: "Date",
      width: 140,
      renderCell: (params) => {
        return (
          <div className=" font-bold text-slate-800">
            {moment(params.row.date).fromNow()}
          </div>
        )
      },
    },

    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <div className=" flex  mt-3 justify-between gap-4 w-full">
            <ActionBtn
              tooltip="Dispatch"
              icon={GrDeliver}
              onClick={() => handleDispatch(params.row.id)}
            />
            <ActionBtn
              tooltip="Complete Delivery"
              custom="darkred"
              icon={IoCheckmarkDoneCircleSharp}
              onClick={() => handleDeliver(params.row.id)}
            />
            <ActionBtn
              tooltip="View Order"
              icon={FaEye}
              onClick={() => {
                router.push(`/order/${params.row.id}`)
              }}
            />
          </div>
        )
      },
    },
  ]

  function handleDispatch(id: string) {
    axios
      .put("/api/order", {
        id,
        deliveryStatus: "Dispatched",
      })
      .then((res) => {
        toast.success("Order dispatched", {
          id: "orderdispatched",
        })
        router.refresh()
      })
      .catch((err) => {
        toast.error("Something went wrong" + err, {
          id: "errorwhilehandlingdispatch",
        })
        console.log("Error" + err)
      })
  }

  const handleDeliver = useCallback((id: string) => {
    axios
      .put("/api/order", {
        id,
        deliveryStatus: "Delivered",
      })
      .then((res) => {
        toast.success("Order Delivered", {
          id: "orderdelivered",
        })
        router.refresh()
      })
      .catch((err) => {
        toast.error("Something went wrong" + err, {
          id: "errorwhilehandlingdelivery",
        })
        console.log("Error" + err)
      })
  }, [])

  return (
    <div className=" m-auto max-w-[1150px] text-xl">
      <div className=" mb-4 mt-8">
        <Heading title={"Manage Orders"} center />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  )
}
