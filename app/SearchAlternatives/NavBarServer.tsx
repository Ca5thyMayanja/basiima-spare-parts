import React from "react"
import UserMenu from "../components/nav/UserMenu"
import { BetterUser } from "./SearchBar2"
import { getCurrentUser } from "@/actions/getCurrentUser"
import CartCount from "../components/nav/CartCount"
import LogoComponent from "./LogoComponent"
import SearchComponent from "./SearchComponent"

export const dynamic = "force-dynamic"

type Props = {
  children: React.ReactNode
}

export default async function NavBarServer() {
  const currentUser: BetterUser | null = await getCurrentUser()
  return (
    <div className=" flex gap-3 justify-between items-center">
      <LogoComponent />
      <SearchComponent />
      <div className=" flex gap-5 md:gap-12 items-center justify-between">
        <CartCount />
        <UserMenu currentUser={currentUser} />
      </div>
    </div>
  )
}
