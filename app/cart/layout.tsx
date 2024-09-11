import React from 'react'
import { ContainerStyles } from '../components/ContainerStyles'
import SearchAlternatives from '../SearchAlternatives/page'
import LogoCartUserMenu from '../components/NavBars/LogoCartUserMenu'
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
