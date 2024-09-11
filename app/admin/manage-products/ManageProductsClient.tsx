"use client"
import ActionBtn from "@/app/components/ActionBtn"
import Heading from "@/app/components/Heading"
import Status from "@/app/components/Status"
import formatPrice from "@/app/utils/formatPrice"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Product } from "@prisma/client"
import React, { useCallback } from "react"
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"
import { HiRefresh } from "react-icons/hi"
import { MdDelete, MdModeEdit } from "react-icons/md"
import { FaEye } from "react-icons/fa"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { deleteObject, getStorage, ref } from "firebase/storage"
import firebaseapp from "@/libs/firebase"

type Props = {
  products: Product[]
}

export default function ManageProductsClient({ products }: Props) {
  const router = useRouter()

  const moveToEditProduct = useCallback((id: string) => {
    router.push("/admin/edit-product/" + id)
  }, [])

  let rows: any = []
  if (products) {
    rows = products.map((pdt) => {
      return {
        id: pdt.id,
        name: pdt.name,
        price: formatPrice(pdt.price),
        category: pdt.category,
        brand: pdt.brand,
        instock: pdt.instock,
        images: pdt.images,
      }
    })
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "Product ID", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => {
        return (
          <div className=" font-bold text-slate-800">{params.row.price}</div>
        )
      },
    },
    { field: "category", headerName: "Category", width: 100 },
    { field: "brand", headerName: "Brand", width: 100 },
    {
      field: "instock",
      headerName: "In stock",
      width: 150,
      renderCell: (params) => {
        return (
          <div className=" font-bold">
            {params.row.instock === true ? (
              <Status
                text={"In stock"}
                icon={FaCheckCircle}
                bg={""}
                color={"text-teal-700"}
              />
            ) : (
              <Status
                custom=""
                text={"Out Of stock"}
                icon={FaTimesCircle}
                bg={""}
                color={"text-red-700"}
              />
            )}
          </div>
        )
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 190,
      renderCell: (params) => {
        return (
          <div className=" flex  mt-3 justify-between gap-4 w-full">
            <ActionBtn
              icon={MdModeEdit}
              onClick={() => moveToEditProduct(params.row.id)}
            />
            <ActionBtn
              icon={HiRefresh}
              onClick={() =>
                handleToggleinStock(params.row.id, params.row.instock)
              }
            />
            <ActionBtn
              custom="red"
              icon={MdDelete}
              onClick={() =>
                handleDeleteProduct(params.row.id, params.row.images)
              }
            />
            <ActionBtn
              icon={FaEye}
              onClick={() => {
                router.push(`/product/${params.row.id}`)
              }}
            />
          </div>
        )
      },
    },
  ]

  const handleToggleinStock = useCallback((id: string, instock: boolean) => {
    axios
      .put("/api/product", {
        id,
        instock: !instock,
      })
      .then((res) => {
        toast.success("Product Status Updated", {
          id: "productstatussucces",
        })
        router.refresh()
      })
      .catch((err) => {
        toast.error("Something went wrong" + err, {
          id: "errorwhiletoggle",
        })
        console.log("Error" + err)
      })
  }, [])

  const storage = getStorage(firebaseapp)

  const handleDeleteProduct = useCallback(async (id: string, images: any[]) => {
    toast("Deleting Product Please Wait", {
      id: "deletingproductalert",
    })

    const handleDelete = async () => {
      try {
        for (const item of images) {
          if (item.image) {
            const imageRef = ref(storage, item.storage)
            await deleteObject(imageRef)
            console.log("Image Deleted", item.image)
            toast.success("Images Deleted", {
              id: "pdtimagesdeleted",
            })
          }
        }
      } catch (error) {
        console.log("An error occured" + error)
      }
    }
    await handleDelete()

    axios
      .delete(`/api/product/${id}`)
      .then((res) => {
        toast.success("Product Deleted Successfully", {
          id: "productdeletesuccess",
        })
        router.refresh()
      })
      .catch((err) => {
        toast.error("Something went wrong" + err, {
          id: "errorwhiletoggle",
        })
        console.log("Error" + err)
      })
  }, [])

  return (
    <div className=" m-auto max-w-[1150px] text-xl">
      <div className=" mb-4 mt-8">
        <Heading title={"Manage Products"} center />
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
