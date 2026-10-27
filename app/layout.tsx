import type React from "react"
import type { Metadata, Viewport } from "next"
import { Bricolage_Grotesque, Manrope } from "next/font/google"
import "./globals.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { UIProvider } from "./context/UIContext"
import { ToastProvider } from "./components/Toast"
import { ErrorBoundary } from "./components/ErrorBoundary"
import CartDrawer from "./components/CartDrawer"
import WhatsAppButton from "./components/WhatsAppButton"
import AgeGate from "./components/AgeGate"

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" })
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" })

export const metadata: Metadata = {
  title: "IQOS Dubai UAE | Buy Terea Heats Sticks & IQOS Devices | #1 Store in UAE",
  description: "🔥 Best IQOS Store in Dubai, UAE. Buy authentic Terea Heats sticks (Kazakhstan & Indonesia), IQOS Iluma Prime, IQOS Iluma One & Standard devices. ✓ Same-Day Delivery Dubai ✓ Free Shipping 2+ Items ✓ 100% Authentic ✓ Best Prices in UAE. Order Now!",
  keywords: [
    // Primary Keywords
    "IQOS Dubai", "IQOS UAE", "Terea Dubai", "Terea UAE", "IQOS Store Dubai", "IQOS Store UAE",
    // Product Keywords
    "Terea Heats Dubai", "Terea Heats UAE", "Terea sticks Dubai", "Terea sticks UAE",
    "IQOS Iluma Dubai", "IQOS Iluma UAE", "IQOS Iluma Prime Dubai", "IQOS Iluma One UAE",
    // Location Keywords
    "IQOS Abu Dhabi", "IQOS Sharjah", "IQOS Ajman", "buy IQOS Dubai", "buy Terea Dubai",
    // Long-tail Keywords
    "where to buy IQOS in Dubai", "where to buy Terea in UAE", "IQOS same day delivery Dubai",
    "authentic IQOS Dubai", "original Terea sticks UAE", "IQOS heated tobacco Dubai",
    // Regional Products
    "Terea Kazakhstan Dubai", "Terea Indonesia UAE", "Terea Ruby Fuse Dubai", "Terea Turquoise UAE",
    // Device Keywords
    "IQOS devices Dubai", "IQOS Iluma Prime UAE", "IQOS Iluma One Dubai", "IQOS Standard Kit UAE",
    "buy IQOS device online Dubai", "IQOS Iluma price Dubai", "best IQOS store UAE",
    // Service Keywords
    "IQOS free delivery Dubai", "IQOS online shopping UAE", "IQOS fast delivery Dubai"
  ].join(", "),
  authors: [{ name: "IQOS Store UAE - Dubai's #1 IQOS Retailer" }],
  creator: "IQOS Store UAE",
  publisher: "IQOS Store UAE",
  metadataBase: new URL("https://www.iqosstoredubai.com"),
  alternates: {
    canonical: "/",
  },
  category: "E-commerce, Heated Tobacco, IQOS Products",
  openGraph: {
    title: "IQOS Dubai UAE | Buy Terea Heats & IQOS Devices | #1 Store",
    description: "🔥 Best IQOS Store in Dubai, UAE. Authentic Terea Heats (Kazakhstan & Indonesia) + IQOS Iluma devices. ✓ Same-Day Delivery ✓ Best Prices ✓ 100% Original. Order Now!",
    url: "https://www.iqosstoredubai.com",
    siteName: "IQOS Store UAE - Dubai's #1 IQOS Retailer",
    images: [
      {
        url: "/HeroSection-Image.png",
        width: 1200,
        height: 630,
        alt: "IQOS Store UAE Dubai - Authentic Terea Heats Sticks and IQOS Iluma Devices",
      },
    ],
    locale: "en_AE",
    type: "website",
    countryName: "United Arab Emirates",
  },
  twitter: {
    card: "summary_large_image",
    title: "IQOS Dubai UAE | Buy Terea Heats & IQOS Devices | #1 Store",
    description: "🔥 Best IQOS Store in Dubai, UAE. ✓ Same-Day Delivery ✓ Authentic Products ✓ Best Prices",
    images: ["/HeroSection-Image.png"],
    creator: "@IQOSStoreUAE",
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
}

export const viewport: Viewport = {
  themeColor: "#13100d",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${bricolage.variable}`}>
        <ErrorBoundary>
          <ToastProvider>
            <UIProvider>
              <Header />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <CartDrawer />
              <WhatsAppButton />
              <AgeGate />
            </UIProvider>
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
