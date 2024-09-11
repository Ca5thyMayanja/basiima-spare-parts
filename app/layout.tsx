import "./globals.css"
import NavBar from "./components/nav/NavBar"
import Footer from "./components/footer/Footer"
import CartProvider from "./providers/CartProvider"
import { Toaster } from "react-hot-toast"
import WhatsAppButton from "./components/WhatsAppButton"
import LocationComponent from "./components/LocationComponent"
import SearchAlternatives from "./SearchAlternatives/page"
import { ContainerStyles } from "./components/ContainerStyles"

export const metadata = {
  title: "Basiima Spare Parts",
  description: "Basiima Spare Parts System",
}

const phoneNumber = "+2560757466117"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <CartProvider>
          <div className="flex flex-col min-h-screen ">
            {/* <NavBar /> */}
            {/* <SearchAlternatives /> */}
            <main className="flex-grow">
              {children}
              <div className="md:mx-8">
                <WhatsAppButton phoneNumber={phoneNumber} />
                {/* <LocationComponent /> */}
              </div>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
