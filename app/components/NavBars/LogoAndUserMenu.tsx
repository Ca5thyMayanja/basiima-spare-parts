import { getCurrentUser } from "@/actions/getCurrentUser"
import LogoComponent from "@/app/SearchAlternatives/LogoComponent"
import SearchComponent from "@/app/SearchAlternatives/SearchComponent"
import React from "react"
import CartCount from "../nav/CartCount"
import { BetterUser } from "../nav/NavBar"
import UserMenu from "../nav/UserMenu"

export const dynamic = "force-dynamic"

type Props = {}

export default async function LogoAndUserMenu({}: Props) {
  const currentUser: BetterUser | null = await getCurrentUser()
  return (
    <div className=" flex justify-between">
      <LogoComponent />
      <UserMenu currentUser={currentUser} />
    </div>
  )
}
