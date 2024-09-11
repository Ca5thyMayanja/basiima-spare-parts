import { ContainerStyles } from "../components/ContainerStyles"
import SearchAlternatives from "../SearchAlternatives/page"
export const dynamic = "force-dynamic"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className=" pt-4">
      <ContainerStyles>
        <SearchAlternatives />
      </ContainerStyles>
      <div>{children}</div>
    </div>
  )
}
