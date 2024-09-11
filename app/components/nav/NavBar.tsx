import React from "react"
import { ContainerStyles } from "../ContainerStyles"
import Link from "next/link"
import { Redressed } from "next/font/google"
import ZionLogo from "../ZionLogo"
import UserMenu from "./UserMenu"
import { getCurrentUser } from "@/actions/getCurrentUser"
import Categories from "./Categories"
import SearchBar from "./SearchBar"
import MobileNav from "./MobileNav"
import AlternativeCategoryComponent from "@/app/SearchAlternatives/AlternativeCategoryComponent"

const redressed = Redressed({ weight: ["400"], subsets: ["latin"] })

export const dynamic = "force-dynamic"

export type BetterUser = {
  id: string
  name: string | null
  email: string | null
  emailVerified: string | null
  image: string | null
  hashedPassword: string | null
  createdAt: string
  updatedAt: string
  // role: $Enums.Role;
  role: "USER" | "ADMIN"
}

async function NavBar() {
  const currentUser: BetterUser | null = await getCurrentUser()

  // console.log('_____________________ current user', currentUser);

  return (
    <div>
      <div className=" sticky top-0 w-full bg-slate-200 z-30 shadow-sm">
        <ContainerStyles>
          <div className=" flex justify-between items-center">
            <div className="hidden">
              <MobileNav />
            </div>
            <div className="">
              <Link href={"/"}>
                <ZionLogo />
              </Link>
            </div>

            <div className="">
              <SearchBar />
            </div>

            <div className=" flex gap-10 items-center  justify-between">
              {/* <ClearOrdersComponent>
                <Servercomponent />
              </ClearOrdersComponent>
              <CartCount /> */}
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </ContainerStyles>
      </div>
      <Categories />
    </div>
  )
}

export default NavBar
