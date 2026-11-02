import { getProductById } from "@/app/data/products"
import type { CartLine, Product } from "@/app/types"

export const DELIVERY = {
    freeFromAmount: 400,
    fee: 20,
}

// Short wording used across the site, e.g. "Free delivery on orders over AED 400".
export const FREE_DELIVERY_RULE = `orders over AED ${DELIVERY.freeFromAmount}`

export const MAX_QUANTITY = 99

export function qualifiesForFreeDelivery(subtotal: number) {
    return subtotal >= DELIVERY.freeFromAmount
}

// Free anywhere in the UAE on orders of AED 400+; AED 20 below that.
export function deliveryCharge(subtotal: number) {
    if (subtotal <= 0 || qualifiesForFreeDelivery(subtotal)) return 0
    return DELIVERY.fee
}

export interface PricedLine {
    product: Product
    quantity: number
    lineTotal: number
}

// Prices always come from the catalogue, never from the client.
export function priceOrder(lines: CartLine[]) {
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
    const delivery = deliveryCharge(subtotal)
    return { lines: priced, items, subtotal, delivery, total: subtotal + delivery }
}

export function formatAED(value: number) {
    return `AED ${value.toLocaleString("en-AE", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
}
