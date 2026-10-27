import type { Category, Region } from "@/app/types"

export const STORE = {
    name: "IQOS Store UAE",
    url: "https://www.iqosstoredubai.com",
    email: "iqosstoredubai@gmail.com",
    phone: "+971 56 192 8359",
    phoneHref: "tel:+971561928359",
    whatsapp: "971543019680",
    whatsappDisplay: "+971 54 301 9680",
}

export function whatsappLink(text = "Hello! I'm interested in your IQOS products.") {
    return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}`
}

export const REGIONS: Record<Region, { label: string; code: string; color: string; blurb: string }> = {
    Indonesia: {
        label: "Indonesia",
        code: "ID",
        color: "var(--color-indo)",
        blurb: "The widest range — editions, pearls and waves.",
    },
    Kazakhstan: {
        label: "Kazakhstan",
        code: "KZ",
        color: "var(--color-kzk)",
        blurb: "Classic blends loved across the UAE.",
    },
    Uzbekistan: {
        label: "Uzbekistan",
        code: "UZ",
        color: "var(--color-uzb)",
        blurb: "Smooth favourites at everyday prices.",
    },
    Japan: {
        label: "Japan",
        code: "JP",
        color: "var(--color-jp)",
        blurb: "Premium Japanese-market flavours.",
    },
}

export const CATEGORIES: Record<Category, { label: string; short: string; color: string; blurb: string }> = {
    terea: {
        label: "TEREA Sticks",
        short: "TEREA",
        color: "var(--color-ember)",
        blurb: "Heated tobacco sticks for IQOS ILUMA.",
    },
    iluma: {
        label: "IQOS ILUMA Devices",
        short: "ILUMA",
        color: "var(--color-iluma)",
        blurb: "Bladeless SMARTCORE induction devices.",
    },
    stig: {
        label: "VGOD STIG Pods",
        short: "STIG",
        color: "var(--color-stig)",
        blurb: "Ready-to-use disposable pods.",
    },
}

export function listingHref(params: { category?: Category; region?: Region; q?: string } = {}) {
    const search = new URLSearchParams()
    if (params.category) search.set("category", params.category)
    if (params.region) search.set("region", params.region)
    if (params.q) search.set("q", params.q)
    const qs = search.toString()
    return qs ? `/listings?${qs}` : "/listings"
}

export const EMIRATES = [
    "Dubai",
    "Abu Dhabi",
    "Sharjah",
    "Ajman",
    "Umm Al Quwain",
    "Ras Al Khaimah",
    "Fujairah",
    "Al Ain",
] as const
