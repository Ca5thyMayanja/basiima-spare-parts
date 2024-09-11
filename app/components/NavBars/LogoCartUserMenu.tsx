import { getCurrentUser } from "@/actions/getCurrentUser"
import LogoComponent from "@/app/SearchAlternatives/LogoComponent"
import React from "react"
import CartCount from "../nav/CartCount"
import { BetterUser } from "../nav/NavBar"
import UserMenu from "../nav/UserMenu"

export const dynamic = "force-dynamic"

export default async function LogoCartUserMenu() {
  const currentUser: BetterUser | null = await getCurrentUser()
  return (
    <div className=" flex justify-between items-center">
      <LogoComponent />

      <div className=" flex gap-12 items-center justify-between">
        <CartCount />
        <UserMenu currentUser={currentUser} />
      </div>
    </div>
  )
}
