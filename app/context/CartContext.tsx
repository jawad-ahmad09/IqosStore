"use client"

import { createContext, useContext, useMemo, useState, useEffect, type ReactNode } from "react"
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

const CART_STORAGE_KEY = "iqos-cart-items"

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isHydrated, setIsHydrated] = useState(false)

    // Load cart from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(CART_STORAGE_KEY)
            if (saved) {
                const parsed = JSON.parse(saved) as CartItem[]
                setItems(parsed)
            }
        } catch (error) {
            console.error("Failed to load cart from localStorage:", error)
        }
        setIsHydrated(true)
    }, [])

    // Save cart to localStorage whenever items change (but only after hydration)
    useEffect(() => {
        if (isHydrated) {
            try {
                localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
            } catch (error) {
                console.error("Failed to save cart to localStorage:", error)
            }
        }
    }, [items, isHydrated])

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


