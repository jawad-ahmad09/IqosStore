"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import type { CartItem, Product } from "@/app/types"

interface CartContextValue {
    items: CartItem[]
    addItem: (product: Product, quantity?: number) => void
    updateQuantity: (id: number, quantity: number) => void
    removeItem: (id: number) => void
    clear: () => void
    total: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])

    const addItem = (product: Product, quantity: number = 1) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === product.id)
            if (existing) {
                return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i))
            }
            return [...prev, { ...product, quantity }]
        })
    }

    const updateQuantity = (id: number, quantity: number) => {
        setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)))
    }

    const removeItem = (id: number) => {
        setItems((prev) => prev.filter((i) => i.id !== id))
    }

    const clear = () => setItems([])

    const total = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items])

    const value: CartContextValue = { items, addItem, updateQuantity, removeItem, clear, total }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error("useCart must be used within CartProvider")
    return ctx
}


