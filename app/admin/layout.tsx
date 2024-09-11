import React from "react"
import AdminNav from "../components/admin/AdminNav"
import LogoAndUserMenu from "../components/NavBars/LogoAndUserMenu"
import { ContainerStyles } from "../components/ContainerStyles"
export const dynamic = "force-dynamic"

export const metadata = {
  title: "Basiima Spare Parts",
  description: "Basiima Spare Parts System",
}

type Props = {
  children: React.ReactNode
}

export default function AdminLayout({ children }: Props) {
  return (
    <div>
      <ContainerStyles>
        <LogoAndUserMenu />
      </ContainerStyles>
      <AdminNav />
      {children}
    </div>
  )
}
