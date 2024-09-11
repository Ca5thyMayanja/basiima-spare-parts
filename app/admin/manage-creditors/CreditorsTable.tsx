"use client"
import { DataGrid, GridColDef, GridRemoveIcon } from "@mui/x-data-grid"
import { Creditor, Debitor, User } from "@prisma/client"
import ActionBtn from "@/app/components/ActionBtn"
import { FaTrashAlt } from "react-icons/fa"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

interface Props {
  creditors: ExtendedCreditor[]
}

type ExtendedCreditor = Creditor & {
  user: User
}

export default function CreditorsTable(creditors: Props) {
  const router = useRouter()

  function handleDeleteDebit(id: string) {
    axios
      .delete(`/api/credit/${id}`)
      .then((res) => {
        toast.success("Creditor Deleted Successfully", {
          id: "creditdeletesuccess",
        })
        router.refresh()
      })
      .catch((err) => {
        toast.error("Something went wrong" + err, {
          id: "errorwhiletoggle",
        })
        console.log("Error" + err)
      })
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 180 },
    { field: "creditorName", headerName: "Creditor name", width: 170 },
    {
      field: "items",
      headerName: "Items",
      width: 190,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 130,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <div className=" flex  mt-3 justify-between gap-4 w-full">
            <ActionBtn
              tooltip="Remove Credit"
              icon={FaTrashAlt}
              onClick={() => handleDeleteDebit(params.row.id)}
            />
          </div>
        )
      },
    },
  ]

  let rows: any = []

  if (creditors) {
    rows = creditors.creditors.map((credit) => {
      return {
        id: credit.id,
        debitorName: credit.name,
        items: credit.items,
        amount: credit.amount,
      }
    })
  }

  return (
    <div className="shadow-xl m-auto max-w-[900px] flex justify-center flex-col items-center">
      <h1 className=" font-bold p-4">Manage Creditors</h1>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 1 }}
          disableRowSelectionOnClick
        />
      </div>
    </div>
  )
}
