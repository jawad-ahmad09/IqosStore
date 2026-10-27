import type { MetadataRoute } from "next"
import { COLLECTIONS } from "@/app/data/collections"
import { EMIRATE_PAGES } from "@/app/data/emirates"
import { FLAVOURS } from "@/app/data/flavours"
import { GUIDES } from "@/app/data/guides"
import { POLICIES } from "@/app/data/policies"
import { products } from "@/app/data/products"
import { AR_COLLECTIONS } from "@/app/data/ar"
import { STORE } from "@/app/data/store"
import { AR_PATHS, arPath } from "@/app/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
    const url = (path: string) => `${STORE.url}${path}`
    const now = new Date()
    // English + Arabic versions point at each other (hreflang) wherever both exist.
    const alternates = (enPath: string) =>
        AR_PATHS.has(enPath) ? { languages: { "en-AE": url(enPath), "ar-AE": url(arPath(enPath)) } } : undefined

    return [
        { url: url("/"), lastModified: now, changeFrequency: "daily", priority: 1, alternates: alternates("/") },
        ...COLLECTIONS.map((c) => ({
            url: url(`/${c.slug}`),
            lastModified: now,
            changeFrequency: "daily" as const,
            priority: c.region ? 0.85 : 0.9,
            alternates: alternates(`/${c.slug}`),
        })),
        ...products.map((p) => ({
            url: url(`/products/${p.id}`),
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: p.inStock ? 0.8 : 0.5,
            images: p.images.map((src) => url(src)),
        })),
        { url: url("/delivery"), lastModified: now, changeFrequency: "monthly", priority: 0.6, alternates: alternates("/delivery") },
        ...EMIRATE_PAGES.map((e) => ({
            url: url(`/delivery/${e.slug}`),
            lastModified: now,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        })),
        { url: url("/guides"), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
        ...GUIDES.map((g) => ({
            url: url(`/guides/${g.slug}`),
            lastModified: new Date(g.updated),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        })),
        { url: url("/ar"), lastModified: now, changeFrequency: "daily", priority: 0.9, alternates: alternates("/") },
        ...AR_COLLECTIONS.map((c) => ({
            url: url(arPath(`/${c.slug}`)),
            lastModified: now,
            changeFrequency: "daily" as const,
            priority: 0.8,
            alternates: alternates(`/${c.slug}`),
        })),
        { url: url("/ar/delivery"), lastModified: now, changeFrequency: "monthly", priority: 0.6, alternates: alternates("/delivery") },
        { url: url("/terea-price-uae"), lastModified: now, changeFrequency: "weekly", priority: 0.85 },
        { url: url("/flavours"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
        ...FLAVOURS.map((f) => ({ url: url(`/flavours/${f.slug}`), lastModified: now, changeFrequency: "weekly" as const, priority: 0.75 })),
        ...POLICIES.map((p) => ({ url: url(`/policies/${p.slug}`), lastModified: new Date(p.updated), changeFrequency: "yearly" as const, priority: 0.3 })),
        { url: url("/listings"), lastModified: now, changeFrequency: "daily", priority: 0.6 },
        { url: url("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    ]
}
