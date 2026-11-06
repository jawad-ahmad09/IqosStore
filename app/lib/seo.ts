import type { Metadata } from "next"
import type { Collection } from "@/app/data/collections"
import { EMIRATE_PAGES } from "@/app/data/emirates"
import { FLAVOURS } from "@/app/data/flavours"

// English path → its Arabic counterpart, for pages that have one.
export const AR_PATHS = new Set([
    "/", "/terea", "/terea/indonesia", "/terea/kazakhstan", "/terea/uzbekistan", "/terea/switzerland", "/terea/italy", "/terea/japan",
    "/iqos-iluma", "/iqos-iluma-i", "/vgod-stig", "/delivery",
    ...EMIRATE_PAGES.map((e) => `/delivery/${e.slug}`),
    ...FLAVOURS.map((f) => `/flavours/${f.slug}`),
])

// Pages that set their own openGraph lose the file-based root image, so they pass this explicitly.
export const OG_IMAGE = [{ url: "/opengraph-image", width: 1200, height: 630, alt: "IQOS Store UAE — TEREA, IQOS ILUMA & STIG delivered across the UAE" }]

export const arPath = (enPath: string) => (enPath === "/" ? "/ar" : `/ar${enPath}`)

// hreflang links so Google serves the English page to English searches and the Arabic page to Arabic ones.
export function languageAlternates(enPath: string) {
    if (!AR_PATHS.has(enPath)) return undefined
    return { "en-AE": enPath, "ar-AE": arPath(enPath), "x-default": enPath }
}

export function collectionMetadata(collection: Collection): Metadata {
    const path = `/${collection.slug}`
    return {
        title: { absolute: collection.metaTitle },
        description: collection.metaDescription,
        alternates: { canonical: path, languages: languageAlternates(path) },
        openGraph: { title: collection.metaTitle, description: collection.metaDescription, url: path, type: "website", images: OG_IMAGE },
    }
}

export function arabicMetadata(enPath: string, title: string, description: string): Metadata {
    const path = arPath(enPath)
    return {
        title: { absolute: title },
        description,
        alternates: { canonical: path, languages: languageAlternates(enPath) },
        openGraph: { title, description, url: path, type: "website", locale: "ar_AE", images: OG_IMAGE },
    }
}
