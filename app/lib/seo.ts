import type { Metadata } from "next"
import type { Collection } from "@/app/data/collections"

// English path → its Arabic counterpart, for pages that have one.
export const AR_PATHS = new Set(["/", "/terea", "/terea/indonesia", "/terea/kazakhstan", "/terea/uzbekistan", "/terea/switzerland", "/terea/japan", "/iqos-iluma", "/vgod-stig", "/delivery"])

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
        openGraph: { title: collection.metaTitle, description: collection.metaDescription, url: path, type: "website" },
    }
}

export function arabicMetadata(enPath: string, title: string, description: string): Metadata {
    const path = arPath(enPath)
    return {
        title: { absolute: title },
        description,
        alternates: { canonical: path, languages: languageAlternates(enPath) },
        openGraph: { title, description, url: path, type: "website", locale: "ar_AE" },
    }
}
