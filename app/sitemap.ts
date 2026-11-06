import type { MetadataRoute } from "next"
import { COLLECTIONS } from "@/app/data/collections"
import { DUBAI_AREAS } from "@/app/data/dubaiAreas"
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
    // lastmod only where we know the real edit date (guides, policies): a date that changes on every
    // deploy teaches Google to ignore lastmod for the whole site.
    // English + Arabic versions point at each other (hreflang) wherever both exist.
    const alternates = (enPath: string) =>
        AR_PATHS.has(enPath) ? { languages: { "en-AE": url(enPath), "ar-AE": url(arPath(enPath)) } } : undefined

    return [
        { url: url("/"), changeFrequency: "daily", priority: 1, alternates: alternates("/") },
        ...COLLECTIONS.map((c) => ({
            url: url(`/${c.slug}`),
           
            changeFrequency: "daily" as const,
            priority: c.region ? 0.85 : 0.9,
            alternates: alternates(`/${c.slug}`),
        })),
        ...products.map((p) => ({
            url: url(`/products/${p.id}`),
           
            changeFrequency: "weekly" as const,
            priority: p.inStock ? 0.8 : 0.5,
            images: p.images.map((src) => url(src)),
        })),
        { url: url("/delivery"), changeFrequency: "monthly", priority: 0.6, alternates: alternates("/delivery") },
        ...EMIRATE_PAGES.map((e) => ({
            url: url(`/delivery/${e.slug}`),
            alternates: alternates(`/delivery/${e.slug}`),
           
            changeFrequency: "monthly" as const,
            priority: 0.7,
        })),
        ...DUBAI_AREAS.map((a) => ({
            url: url(`/delivery/dubai/${a.slug}`),
           
            changeFrequency: "monthly" as const,
            priority: 0.65,
        })),
        { url: url("/guides"), changeFrequency: "weekly", priority: 0.6 },
        ...GUIDES.map((g) => ({
            url: url(`/guides/${g.slug}`),
            lastModified: new Date(g.updated),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        })),
        { url: url("/ar"), changeFrequency: "daily", priority: 0.9, alternates: alternates("/") },
        ...AR_COLLECTIONS.map((c) => ({
            url: url(arPath(`/${c.slug}`)),
           
            changeFrequency: "daily" as const,
            priority: 0.8,
            alternates: alternates(`/${c.slug}`),
        })),
        { url: url("/ar/delivery"), changeFrequency: "monthly", priority: 0.6, alternates: alternates("/delivery") },
        { url: url("/terea-price-uae"), changeFrequency: "weekly", priority: 0.85 },
        { url: url("/heets-dubai"), changeFrequency: "weekly", priority: 0.8 },
        { url: url("/flavours"), changeFrequency: "weekly", priority: 0.7 },
        ...FLAVOURS.map((f) => ({ url: url(`/flavours/${f.slug}`), changeFrequency: "weekly" as const, priority: 0.75, alternates: alternates(`/flavours/${f.slug}`) })),
        ...EMIRATE_PAGES.map((e) => ({
            url: url(arPath(`/delivery/${e.slug}`)),
            changeFrequency: "monthly" as const,
            priority: 0.65,
            alternates: alternates(`/delivery/${e.slug}`),
        })),
        ...FLAVOURS.map((f) => ({
            url: url(arPath(`/flavours/${f.slug}`)),
            changeFrequency: "weekly" as const,
            priority: 0.7,
            alternates: alternates(`/flavours/${f.slug}`),
        })),
        ...POLICIES.map((p) => ({ url: url(`/policies/${p.slug}`), lastModified: new Date(p.updated), changeFrequency: "yearly" as const, priority: 0.3 })),
        { url: url("/listings"), changeFrequency: "daily", priority: 0.6 },
        { url: url("/contact"), changeFrequency: "yearly", priority: 0.4 },
    ]
}
