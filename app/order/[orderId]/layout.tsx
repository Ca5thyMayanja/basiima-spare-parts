import React from "react"
import LogoAndUserMenu from "../../components/NavBars/LogoAndUserMenu"
import { ContainerStyles } from "../../components/ContainerStyles"

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
      {children}
    </div>
  )
}
