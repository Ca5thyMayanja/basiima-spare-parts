import React from 'react'
import { ContainerStyles } from '@/app/components/ContainerStyles'
import LogoCartUserMenu from '@/app/components/NavBars/LogoCartUserMenu'
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className=" pt-4">
      <ContainerStyles>
        <LogoCartUserMenu />
      </ContainerStyles>
      <div>{children}</div>
    </div>
  )
}
