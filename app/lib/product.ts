import { CATEGORIES, REGIONS } from "@/app/data/store"
import type { Product } from "@/app/types"

export function productTag(product: Product) {
    if (product.region) {
        const r = REGIONS[product.region]
        return { label: r.label, color: r.color }
    }
    return { label: product.line ?? CATEGORIES[product.category].short, color: CATEGORIES[product.category].color }
}

export function isLimited(product: Product) {
    return /limited edition/i.test(product.name)
}

export function discountPercent(product: Product) {
    return product.compareAt ? Math.round((1 - product.price / product.compareAt) * 100) : 0
}
