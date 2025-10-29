import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { CartProvider } from "./context/CartContext"
import { UIProvider } from "./context/UIContext"
import { ToastProvider } from "./components/Toast"
import CartModal from "./components/CartModal"

const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Terea Heats - IQOS Store",
  description: "Shop authentic Terea Heats sticks. Fast delivery and great prices.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} bg-background text-foreground`}>
        <ToastProvider>
          <UIProvider>
            <CartProvider>
              <Header />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <CartModal />
            </CartProvider>
          </UIProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
