"use client"
import React from "react"
import { ContainerStyles } from "../ContainerStyles"
import Link from "next/link"
import AdminNavItem from "./AdminNavItem"
import { AiFillDashboard, AiFillPlusSquare } from "react-icons/ai"
import { usePathname } from "next/navigation"
import { FaListAlt } from "react-icons/fa"
import { FaBook, FaMoneyBills } from "react-icons/fa6"

type Props = {}

export default function AdminNav({}: Props) {
  const pathname = usePathname()

  return (
    <div className=" w-full shadow-sm top-20 border-b-[1px] pt-4">
      <ContainerStyles>
        <div className=" flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap ">
          <Link href={"/admin"}>
            <AdminNavItem
              icon={AiFillDashboard}
              label={"Summary"}
              selected={pathname === "/admin"}
            />
          </Link>
          <Link href={"/admin/add-products"}>
            <AdminNavItem
              icon={AiFillPlusSquare}
              label={"Add Products"}
              selected={pathname === "/admin/add-products"}
            />
          </Link>
          <Link href={"/admin/manage-products"}>
            <AdminNavItem
              icon={FaBook}
              label={"Manage Products"}
              selected={pathname === "/admin/manage-products"}
            />
          </Link>
          <Link href={"/admin/manage-orders"}>
            <AdminNavItem
              icon={FaListAlt}
              label={"Manage Orders"}
              selected={pathname === "/admin/manage-orders"}
            />
          </Link>
          <Link href={"/admin/manage-debitors"}>
            <AdminNavItem
              icon={FaMoneyBills}
              label={"Manage Debitors"}
              selected={pathname === "/admin/manage-debitors"}
            />
          </Link>
          <Link href={"/admin/manage-creditors"}>
            <AdminNavItem
              icon={FaMoneyBills}
              label={"Manage Creditors"}
              selected={pathname === "/admin/manage-creditors"}
            />
          </Link>
        </div>
      </ContainerStyles>
    </div>
  )
}
