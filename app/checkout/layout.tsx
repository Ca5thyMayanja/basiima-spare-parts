import React from "react"
import { ContainerStyles } from "../components/ContainerStyles"
import LogoCartUserMenu from "../components/NavBars/LogoCartUserMenu"
export const dynamic = "force-dynamic"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className=" pt-4">
      <ContainerStyles>
        <LogoCartUserMenu />

        {children}
      </ContainerStyles>
    </div>
  )
}
