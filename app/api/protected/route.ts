// pages/api/protected.ts
import { getCurrentUser } from "@/actions/getCurrentUser"
import { NextResponse } from "next/server"
export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const currentUser = await getCurrentUser()

  console.log("++++++++++++= currentUser", currentUser)

  if (!currentUser) {
    return NextResponse.json({ error: "UnAuthorized" }, { status: 401 })
  }

  // Your protected logic here
  return NextResponse.json({ message: "Success", user: currentUser })
}

export async function POST() {
  return NextResponse.json({ message: "Unauthorized" })
}
