"use client"

import { useMemo, useSyncExternalStore } from "react"
import { getProductById } from "@/app/data/products"
import { MAX_QUANTITY } from "@/app/lib/pricing"
import type { CartItem, CartLine } from "@/app/types"

// The cart only stores product ids and quantities; names and prices are always
// read from the catalogue so a stale localStorage cart can never show old prices.
const CART_STORAGE_KEY = "iqos-cart-v2"
const EMPTY: CartLine[] = []

let lines: CartLine[] = EMPTY
let loaded = false
const listeners = new Set<() => void>()

function readStorage(): CartLine[] {
    try {
        const parsed: unknown = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) ?? "[]")
        if (!Array.isArray(parsed)) return EMPTY
        return parsed.filter(
            (l): l is CartLine =>
                typeof l?.id === "string" &&
                Number.isInteger(l.quantity) &&
                l.quantity > 0 &&
                getProductById(l.id)?.inStock === true,
        )
    } catch {
        return EMPTY
    }
}

function emit() {
    listeners.forEach((listener) => listener())
}

function setLines(next: CartLine[]) {
    lines = next
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines))
    } catch {
        // Storage can be unavailable (private mode); the cart still works for this visit.
    }
    emit()
}

function onStorage(e: StorageEvent) {
    if (e.key !== CART_STORAGE_KEY) return
    lines = readStorage()
    emit()
}

function subscribe(listener: () => void) {
    listeners.add(listener)
    if (listeners.size === 1) window.addEventListener("storage", onStorage)
    return () => {
        listeners.delete(listener)
        if (listeners.size === 0) window.removeEventListener("storage", onStorage)
    }
}

function getSnapshot() {
    if (!loaded) {
        loaded = true
        lines = readStorage()
    }
    return lines
}

function getServerSnapshot() {
    return EMPTY
}

const clamp = (q: number) => Math.max(0, Math.min(MAX_QUANTITY, Math.floor(q)))

const actions = {
    addItem(id: string, quantity = 1) {
        const product = getProductById(id)
        if (!product?.inStock) return
        const existing = lines.find((l) => l.id === id)
        setLines(
            existing
                ? lines.map((l) => (l.id === id ? { ...l, quantity: clamp(l.quantity + quantity) } : l))
                : [...lines, { id, quantity: clamp(quantity) }],
        )
    },
    updateQuantity(id: string, quantity: number) {
        const q = clamp(quantity)
        setLines(q === 0 ? lines.filter((l) => l.id !== id) : lines.map((l) => (l.id === id ? { ...l, quantity: q } : l)))
    },
    removeItem(id: string) {
        setLines(lines.filter((l) => l.id !== id))
    },
    clear() {
        setLines([])
    },
}

export function useCart() {
    const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

    return useMemo(() => {
        const items: CartItem[] = []
        for (const line of current) {
            const product = getProductById(line.id)
            if (product) items.push({ ...line, product })
        }
        return {
            lines: current,
            items,
            count: items.reduce((sum, i) => sum + i.quantity, 0),
            subtotal: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
            ...actions,
        }
    }, [current])
}
