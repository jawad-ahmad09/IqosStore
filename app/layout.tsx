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
import { ORIGIN_LIST } from "./data/store"

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" })
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" })

export const metadata: Metadata = {
  title: {
    default: "IQOS Dubai & UAE — Buy TEREA, IQOS ILUMA & STIG Online | Same-Day Delivery",
    template: "%s | IQOS Store UAE",
  },
  description: `Buy authentic TEREA sticks (${ORIGIN_LIST}), IQOS ILUMA devices and VGOD STIG pods online in Dubai & UAE. Same-day delivery in Dubai, free delivery on 2+ items, cash on delivery.`,
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
  authors: [{ name: "IQOS Store UAE" }],
  creator: "IQOS Store UAE",
  publisher: "IQOS Store UAE",
  metadataBase: new URL("https://www.iqosstoredubai.com"),
  category: "E-commerce, Heated Tobacco, IQOS Products",
  openGraph: {
    title: "IQOS Dubai & UAE — TEREA, IQOS ILUMA & STIG | Same-Day Delivery",
    description: `Authentic TEREA from ${ORIGIN_LIST}, IQOS ILUMA devices and VGOD STIG pods. Same-day delivery in Dubai, free on 2+ items.`,
    url: "https://www.iqosstoredubai.com",
    siteName: "IQOS Store UAE",
    locale: "en_AE",
    type: "website",
    countryName: "United Arab Emirates",
  },
  twitter: {
    card: "summary_large_image",
    title: "IQOS Dubai & UAE — TEREA, IQOS ILUMA & STIG | Same-Day Delivery",
    description: "Authentic TEREA, IQOS ILUMA and VGOD STIG. Same-day delivery in Dubai, free on 2+ items.",
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
    // Font variables go on <html>: the Tailwind theme resolves --font-sans/--font-display at :root.
    <html lang="en" className={`${manrope.variable} ${bricolage.variable}`}>
      <body>
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
