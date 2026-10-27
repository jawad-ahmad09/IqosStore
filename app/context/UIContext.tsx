"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

interface UIContextValue {
    isCartOpen: boolean
    openCart: () => void
    closeCart: () => void
}

const UIContext = createContext<UIContextValue | undefined>(undefined)

export function UIProvider({ children }: { children: ReactNode }) {
    const [isCartOpen, setIsCartOpen] = useState(false)

    const openCart = useCallback(() => setIsCartOpen(true), [])
    const closeCart = useCallback(() => setIsCartOpen(false), [])
    const value = useMemo(() => ({ isCartOpen, openCart, closeCart }), [isCartOpen, openCart, closeCart])

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export function useUI() {
    const ctx = useContext(UIContext)
    if (!ctx) throw new Error("useUI must be used within UIProvider")
    return ctx
}
