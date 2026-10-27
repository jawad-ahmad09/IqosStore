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
    Switzerland: {
        label: "Switzerland",
        code: "CH",
        color: "var(--color-ch)",
        blurb: "Classic European blends, made in Switzerland.",
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

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]
const REGION_NAMES = Object.keys(REGIONS) as Region[]

// "Indonesia, Kazakhstan, Uzbekistan, Switzerland and Japan" — kept in sync with REGIONS.
export const ORIGIN_LIST = `${REGION_NAMES.slice(0, -1).join(", ")} and ${REGION_NAMES[REGION_NAMES.length - 1]}`
export const ORIGIN_COUNT = NUMBER_WORDS[REGION_NAMES.length] ?? String(REGION_NAMES.length)

const CATEGORY_PATHS: Record<Category, string> = { terea: "/terea", iluma: "/iqos-iluma", stig: "/vgod-stig" }

// Category/origin links go to their indexable collection pages; searches use /listings.
export function listingHref(params: { category?: Category; region?: Region; q?: string } = {}) {
    if (!params.q) {
        if (params.region) return `/terea/${params.region.toLowerCase()}`
        if (params.category) return CATEGORY_PATHS[params.category]
        return "/listings"
    }
    const search = new URLSearchParams()
    if (params.category) search.set("category", params.category)
    if (params.region) search.set("region", params.region)
    search.set("q", params.q)
    return `/listings?${search}`
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
