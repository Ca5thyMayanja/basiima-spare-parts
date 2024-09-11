import { ContainerStyles } from "../components/ContainerStyles"
import LogoCartUserMenu from "../components/NavBars/LogoCartUserMenu"
import NavBarServer from "../SearchAlternatives/NavBarServer"
import SearchAlternatives from "../SearchAlternatives/page"
export const dynamic = "force-dynamic"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <ContainerStyles>
        <div className=" mt-2 md:m-3">
          <NavBarServer />
        </div>
      </ContainerStyles>
      <div className=" md:px-7 ">{children}</div>
    </div>
  )
}
