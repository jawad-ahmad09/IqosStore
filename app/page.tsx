"use client"

import { useState } from "react"
import Hero from "./components/Hero"
import Products from "./components/Products"
import IqosDevices from "./components/IqosDevices"
import Cart from "./components/Cart"
import TereaCategories from "./components/TereaCategories"
import { products } from "./data/products"

import type { CartItem, ContactFormData } from "./types"
import { useCart } from "./context/CartContext"
import InquiryForm from "./components/Inquiryform"
import About from "./components/AboutUs"
import FAQ from "./components/FAQ"

export default function Home() {
  const { items: cartItems, addItem, updateQuantity, removeItem, clear } = useCart()

  const handleFormSubmit = (data: ContactFormData) => {
    console.log("Form submitted:", data)
    // Cart will be cleared after successful submission
    clear()
  }

  // JSON-LD structured data for SEO
  // Get dynamic product count
  const totalProducts = products.length

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "IQOS Store UAE",
    description: "Premium IQOS Store in UAE offering authentic Terea Heats sticks and IQOS devices",
    url: "https://iqosstore.ae",
    telephone: "+971 56 192 8359",
    address: {
      "@type": "PostalAddress",
      addressCountry: "AE",
      addressRegion: "Dubai",
      addressLocality: "Dubai"
    },
    priceRange: "AED 130 - AED 750",
    image: "https://iqosstore.ae/og-image.jpg",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "250"
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "AED",
      lowPrice: "130",
      highPrice: "750",
      offerCount: totalProducts.toString()
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <TereaCategories />
      <Products limit={6} showViewAll={true} />
      <IqosDevices />
      <About />

      <FAQ />

      <section id="cart" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-balance">
            Your <span className="text-accent">Cart</span>
          </h2>
          <Cart items={cartItems} onUpdateQuantity={updateQuantity} onRemoveItem={removeItem} />
        </div>
      </section>

      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <InquiryForm cartItems={cartItems} onSubmit={handleFormSubmit} />
        </div>
      </section>
    </>
  )
}
