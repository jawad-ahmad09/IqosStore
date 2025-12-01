"use client"

import { useState } from "react"
import Hero from "./components/Hero"
import Products from "./components/Products"

import Cart from "./components/Cart"

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

  return (
    <>
      <Hero />
      <Products limit={6} showViewAll={true} />
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
