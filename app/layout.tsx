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
import WhatsAppButton from "./components/WhatsAppButton"

const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IQOS Store UAE | Authentic Terea Heats & IQOS Devices | Same Day Delivery Dubai",
  description: "Premium IQOS Store in UAE offering authentic Terea Heats sticks and IQOS devices. Shop IQOS Iluma, Standard & Premium devices. Order before 12PM for same-day delivery across Dubai, Abu Dhabi & UAE. Best prices guaranteed.",
  keywords: "IQOS UAE, Terea Heats Dubai, IQOS Iluma, IQOS devices, heated tobacco UAE, IQOS store Dubai, Terea sticks, IQOS Premium, buy IQOS online UAE",
  authors: [{ name: "IQOS Store UAE" }],
  creator: "IQOS Store UAE",
  publisher: "IQOS Store UAE",
  metadataBase: new URL("https://iqosstore.ae"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "IQOS Store UAE | Authentic Terea Heats & IQOS Devices",
    description: "Shop authentic IQOS products in UAE. Terea Heats sticks and IQOS devices. Order before 12PM for same-day delivery across Dubai & UAE.",
    url: "https://iqosstore.ae",
    siteName: "IQOS Store UAE",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IQOS Store UAE - Authentic Products",
      },
    ],
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IQOS Store UAE | Authentic Terea Heats & IQOS Devices",
    description: "Shop authentic IQOS products in UAE. Before 12PM: Same Day Delivery",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
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
              <WhatsAppButton />
            </CartProvider>
          </UIProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
