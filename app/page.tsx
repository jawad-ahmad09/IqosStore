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

  // JSON-LD structured data for SEO - Enhanced for UAE Local Search
  const totalProducts = products.length

  // Local Business Schema for UAE/Dubai Local SEO
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": "https://www.iqosstoredubai.com/#store",
    name: "IQOS Store UAE - Dubai's #1 IQOS Retailer",
    alternateName: ["IQOS Dubai", "Terea Store Dubai", "IQOS UAE Store"],
    description: "Best IQOS Store in Dubai, UAE. Buy authentic Terea Heats sticks (Kazakhstan & Indonesia) and IQOS Iluma devices. Same-day delivery across Dubai, Abu Dhabi & UAE. 100% authentic products, best prices guaranteed.",
    url: "https://www.iqosstoredubai.com",
    telephone: "+971561928359",
    email: "iqosstoredubai@gmail.com",
    logo: "https://www.iqosstoredubai.com/HeroSection-Image.png",
    image: ["https://www.iqosstoredubai.com/HeroSection-Image.png", "https://www.iqosstoredubai.com/TereaGoldEdition.png"],
    priceRange: "AED 130 - AED 750",
    currenciesAccepted: "AED",
    paymentAccepted: ["Cash", "Credit Card", "Cash on Delivery"],
    address: {
      "@type": "PostalAddress",
      addressCountry: "AE",
      addressRegion: "Dubai",
      addressLocality: "Dubai",
      postalCode: "00000"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "25.2048",
      longitude: "55.2708"
    },
    areaServed: [
      {
        "@type": "City",
        name: "Dubai",
        "@id": "https://en.wikipedia.org/wiki/Dubai"
      },
      {
        "@type": "City",
        name: "Abu Dhabi",
        "@id": "https://en.wikipedia.org/wiki/Abu_Dhabi"
      },
      {
        "@type": "City",
        name: "Sharjah"
      },
      {
        "@type": "Country",
        name: "United Arab Emirates",
        "@id": "https://en.wikipedia.org/wiki/United_Arab_Emirates"
      }
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "350",
      reviewCount: "280"
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59"
      }
    ],
    potentialAction: {
      "@type": "OrderAction",
      target: "https://www.iqosstoredubai.com/#contact"
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "AED",
      lowPrice: "130",
      highPrice: "750",
      offerCount: totalProducts.toString(),
      availability: "https://schema.org/InStock"
    },
    sameAs: [
      "https://wa.me/971561928359"
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "IQOS Products",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Terea Heats Sticks",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Terea Heats Sticks Dubai",
                description: "Authentic Terea Heats sticks for IQOS devices"
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          name: "IQOS Devices",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "IQOS Iluma Prime Dubai",
                description: "Premium IQOS Iluma Prime device"
              }
            }
          ]
        }
      ]
    }
  }

  // Organization Schema for Brand Recognition
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.iqosstoredubai.com/#organization",
    name: "IQOS Store UAE",
    url: "https://www.iqosstoredubai.com",
    logo: "https://www.iqosstoredubai.com/HeroSection-Image.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+971561928359",
      contactType: "Customer Service",
      areaServed: "AE",
      availableLanguage: ["English", "Arabic"]
    },
    sameAs: [
      "https://wa.me/971561928359"
    ]
  }

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.iqosstoredubai.com/#website",
    url: "https://www.iqosstoredubai.com",
    name: "IQOS Store UAE",
    description: "Best IQOS Store in Dubai, UAE - Buy Terea Heats and IQOS Devices",
    publisher: {
      "@id": "https://www.iqosstoredubai.com/#organization"
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.iqosstoredubai.com/listings?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      {/* Local Business Schema for UAE Local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {/* Website Schema with Search Action */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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
