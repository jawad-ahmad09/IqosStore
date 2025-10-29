"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface UIContextValue {
    isCartOpen: boolean
    openCart: () => void
    closeCart: () => void
}

const UIContext = createContext<UIContextValue | undefined>(undefined)

export function UIProvider({ children }: { children: ReactNode }) {
    const [isCartOpen, setIsCartOpen] = useState(false)

    const openCart = () => setIsCartOpen(true)
    const closeCart = () => setIsCartOpen(false)

    return (
        <UIContext.Provider value={{ isCartOpen, openCart, closeCart }}>{children}</UIContext.Provider>
    )
}

export function useUI() {
    const ctx = useContext(UIContext)
    if (!ctx) throw new Error("useUI must be used within UIProvider")
    return ctx
}


