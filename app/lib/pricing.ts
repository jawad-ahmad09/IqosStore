import { getProductById } from "@/app/data/products"
import type { CartLine, Product } from "@/app/types"

export const DELIVERY = {
    freeFromItems: 2,
    dubai: 10,
    otherEmirates: 20,
}

export const MAX_QUANTITY = 99

// Free for 2+ items anywhere in the UAE; single items cost AED 10 in Dubai, AED 20 elsewhere.
export function deliveryCharge(totalItems: number, emirate?: string) {
    if (totalItems === 0 || totalItems >= DELIVERY.freeFromItems) return 0
    return emirate === "Dubai" ? DELIVERY.dubai : DELIVERY.otherEmirates
}

export interface PricedLine {
    product: Product
    quantity: number
    lineTotal: number
}

// Prices always come from the catalogue, never from the client.
export function priceOrder(lines: CartLine[], emirate?: string) {
    const priced: PricedLine[] = []
    for (const line of lines) {
        const product = getProductById(line.id)
        const quantity = Math.floor(Number(line.quantity))
        if (!product || !product.inStock || !(quantity > 0)) continue
        const q = Math.min(quantity, MAX_QUANTITY)
        priced.push({ product, quantity: q, lineTotal: product.price * q })
    }
    const items = priced.reduce((sum, l) => sum + l.quantity, 0)
    const subtotal = priced.reduce((sum, l) => sum + l.lineTotal, 0)
    const delivery = deliveryCharge(items, emirate)
    return { lines: priced, items, subtotal, delivery, total: subtotal + delivery }
}

export function formatAED(value: number) {
    return `AED ${value.toLocaleString("en-AE", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
}
