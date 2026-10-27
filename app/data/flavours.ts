import { getProducts, priceRange } from "@/app/data/products"
import { REGIONS } from "@/app/data/store"
import type { Product, Region } from "@/app/types"

// Flavour pages group the same TEREA flavour across origins ("TEREA Amber":
// Kazakhstan, Uzbekistan, Switzerland) so shoppers can compare — and so the site
// can rank for flavour searches like "TEREA Amber Dubai".
const ALIASES: Record<string, string> = { "Turquoise Menthol": "Turquoise", "Purple Wave Menthol": "Purple Wave" }

export interface Flavour {
    slug: string
    name: string
    products: Product[]
}

export function flavourName(product: Product) {
    const variant = product.name.replace(/^TEREA\s+/, "")
    return ALIASES[variant] ?? variant
}

const REGION_ORDER = Object.keys(REGIONS) as Region[]

export const FLAVOURS: Flavour[] = (() => {
    const groups = new Map<string, Product[]>()
    for (const p of getProducts({ category: "terea" })) {
        const name = flavourName(p)
        groups.set(name, [...(groups.get(name) ?? []), p])
    }
    return [...groups.entries()]
        .filter(([, list]) => list.length > 1)
        .map(([name, list]) => ({
            slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            name,
            products: list.sort((a, b) => REGION_ORDER.indexOf(a.region!) - REGION_ORDER.indexOf(b.region!)),
        }))
        .sort((a, b) => b.products.length - a.products.length || a.name.localeCompare(b.name))
})()

export function getFlavour(slug: string) {
    return FLAVOURS.find((f) => f.slug === slug)
}

export function flavourForProduct(product: Product) {
    if (product.category !== "terea") return undefined
    const name = flavourName(product)
    return FLAVOURS.find((f) => f.name === name)
}

export function flavourSummary(flavour: Flavour) {
    const { min, max } = priceRange(flavour.products)
    const regions = flavour.products.map((p) => p.region!)
    const families = [...new Set(flavour.products.map((p) => p.family))]
    const cheapest = flavour.products.reduce((a, b) => (b.price < a.price ? b : a))
    return { min, max, regions, families, cheapest }
}
