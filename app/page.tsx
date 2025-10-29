"use client"

import { useState } from "react"
import Hero from "./components/Hero"
import Products from "./components/Products"

import Cart from "./components/Cart"

import type { CartItem, ContactFormData } from "./types"
import InquiryForm from "./components/Inquiryform"
import About from "./components/AboutUs"
import FAQ from "./components/FAQ"

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const handleAddToCart = (product: any) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleFormSubmit = (data: ContactFormData) => {
    console.log("Form submitted:", data)
    // Cart will be cleared after successful submission
    setCartItems([])
  }

  return (
    <>
      <Hero />
      <Products />
      <About />

      <FAQ />

      <section id="cart" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-balance">
            Your <span className="text-accent">Cart</span>
          </h2>
          <Cart items={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} />
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
