import prisma from "@/libs/prismadb"
import { getCurrentUser } from "@/actions/getCurrentUser"
import { NextResponse } from "next/server"
export const dynamic = "force-dynamic"

export async function DELETE(req: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  if (currentUser.role !== "ADMIN") {
    return NextResponse.error()
  }

  // const id = req.nextUrl.searchParams.get('id')

  const id = req.url.split("/").findLast((item, index, array) => {
    // console.log('+++++ Item', item, index);
    // console.log('+++++ Array', array[array.length - 1]);
    // const tid = array[array.length - 1]
    return array[array.length - 1]
  })

  console.log(">>>>>>> Data to be deleted", id)

  await prisma.creditor.delete({
    where: { id: id },
  })

  return NextResponse.json({ message: "Deleted Successfully", status: 200 })
}
