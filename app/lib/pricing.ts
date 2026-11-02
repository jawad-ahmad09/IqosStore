import { getProductById } from "@/app/data/products"
import type { CartLine, Product } from "@/app/types"

export const DELIVERY = {
    freeFromItems: 2,
    freeFromAmount: 400,
    dubai: 20,
    otherEmirates: 30,
}

// Short wording used across the site, e.g. "Free delivery on 2+ items or orders over AED 400".
export const FREE_DELIVERY_RULE = `${DELIVERY.freeFromItems}+ items or orders over AED ${DELIVERY.freeFromAmount}`

export const MAX_QUANTITY = 99

export function qualifiesForFreeDelivery(totalItems: number, subtotal: number) {
    return totalItems >= DELIVERY.freeFromItems || subtotal >= DELIVERY.freeFromAmount
}

// Free anywhere in the UAE for 2+ items or orders of AED 400+; otherwise AED 20 in Dubai, AED 30 elsewhere.
export function deliveryCharge(totalItems: number, subtotal: number, emirate?: string) {
    if (totalItems === 0 || qualifiesForFreeDelivery(totalItems, subtotal)) return 0
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
    const delivery = deliveryCharge(items, subtotal, emirate)
    return { lines: priced, items, subtotal, delivery, total: subtotal + delivery }
}

export function formatAED(value: number) {
    return `AED ${value.toLocaleString("en-AE", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
}
