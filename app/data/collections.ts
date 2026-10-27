import { getProducts, priceRange } from "@/app/data/products"
import { ORIGIN_COUNT, ORIGIN_LIST } from "@/app/data/store"
import { formatAED } from "@/app/lib/pricing"
import type { Category, Product, Region } from "@/app/types"

// Prices in the copy are computed from the catalogue so they never drift from the product data.
const rangeText = (list: Product[]) => {
    const { min, max } = priceRange(list)
    return min === max ? formatAED(min) : `${formatAED(min)}–${max}`
}
const tereaFrom = (region?: Region) => formatAED(priceRange(getProducts({ category: "terea", region })).min)
const tereaRange = (region: Region) => rangeText(getProducts({ category: "terea", region }))
const lineFrom = (category: Category, line: string) =>
    formatAED(priceRange(getProducts({ category }).filter((p) => p.line === line)).min)

// Indexable collection landing pages. Each has its own URL, copy and FAQs so it
// can rank for searches like "TEREA Japan Dubai" or "IQOS ILUMA price UAE".
export interface Collection {
    slug: string // path without leading slash
    category: Category
    region?: Region
    h1: string
    metaTitle: string
    metaDescription: string
    intro: string
    body: { heading: string; text: string }[]
    faqs: { question: string; answer: string }[]
}

export const COLLECTIONS: Collection[] = [
    {
        slug: "terea",
        category: "terea",
        h1: "TEREA Sticks in Dubai & UAE",
        metaTitle: `Buy TEREA Sticks in Dubai & UAE — All Flavours from ${tereaFrom()}`,
        metaDescription:
            `Shop authentic TEREA sticks in Dubai and across the UAE: ${ORIGIN_LIST} editions. From ${tereaFrom()} per carton, same-day delivery in Dubai, free on 2+ cartons.`,
        intro:
            "Every TEREA flavour we stock, in one place — from classic tobacco blends to menthol and click-capsule pearls. Pick by origin or by taste, and get it delivered the same day in Dubai.",
        body: [
            {
                heading: "What is TEREA?",
                text: "TEREA is the heated tobacco stick made for the IQOS ILUMA range. Each stick carries a small metal element that ILUMA heats by induction, so there's no blade to clean and no burning. A carton holds 10 packs of 20 sticks.",
            },
            {
                heading: "Which origin should you choose?",
                text: `All ${ORIGIN_COUNT} origins fit every ILUMA device. Indonesia has the biggest variety of editions and pearls, Kazakhstan and Uzbekistan cover the classic favourites at everyday prices, Switzerland brings classic European tobacco blends, and Japan offers premium Japanese-market blends you rarely find elsewhere in the UAE.`,
            },
            {
                heading: "Looking for HEETS?",
                text: "HEETS were made for older IQOS devices (IQOS 3 DUO and earlier). If you use an IQOS ILUMA, TEREA is the stick you need — HEETS won't work in ILUMA, and TEREA won't work in older IQOS models.",
            },
        ],
        faqs: [
            {
                question: "How much is a TEREA carton in Dubai?",
                answer: `In our store a TEREA carton is ${tereaRange("Indonesia")} for Indonesia, ${tereaRange("Kazakhstan")} for Kazakhstan, ${tereaRange("Uzbekistan")} for Uzbekistan, ${tereaRange("Switzerland")} for Switzerland and ${tereaRange("Japan")} for Japan. Each carton has 200 sticks (10 packs × 20).`,
            },
            {
                question: "Do you deliver TEREA outside Dubai?",
                answer: "Yes — we deliver to every emirate, including Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, Umm Al Quwain and Al Ain. Delivery is free on 2 or more items.",
            },
            {
                question: "Will TEREA work in my IQOS ILUMA i?",
                answer: "Yes. TEREA works in every IQOS ILUMA device: ILUMA, ILUMA One, ILUMA Prime and the newer ILUMA i series.",
            },
        ],
    },
    {
        slug: "terea/indonesia",
        category: "terea",
        region: "Indonesia",
        h1: "TEREA Indonesia in Dubai & UAE",
        metaTitle: `TEREA Indonesia Dubai — Pearls, Editions & Waves from ${tereaFrom("Indonesia")}`,
        metaDescription:
            `Buy TEREA Indonesia in Dubai and the UAE: Sun Pearl, Oasis Pearl, Purple Wave, Black Green, Golden Edition and more. From ${tereaFrom("Indonesia")} per carton with same-day Dubai delivery.`,
        intro:
            "Indonesia has the widest TEREA line-up we carry — limited editions, fruity pearls with click capsules, and icy waves — at everyday carton prices.",
        body: [
            {
                heading: "Why TEREA Indonesia?",
                text: `Indonesian TEREA gets new editions often, so it's the origin to watch if you like trying something different — and it's one of the best-value ranges in our store at ${tereaRange("Indonesia")} per carton.`,
            },
            {
                heading: "Popular Indonesian flavours",
                text: "Pearl sticks like Sun Pearl and Oasis Pearl add a capsule you click for a burst of flavour. Wave sticks bring fresh menthol, and the Black range (Black Green, Black Purple, Black Ruby) delivers an intense icy hit.",
            },
        ],
        faqs: [
            {
                question: "Is TEREA Indonesia different from Kazakhstan?",
                answer: "The format is identical and both fit every ILUMA device. What differs is the flavour line-up and packaging — Indonesia has more editions and pearls, Kazakhstan focuses on the classic range.",
            },
            {
                question: "How many sticks are in a TEREA Indonesia carton?",
                answer: "200 sticks — 10 packs of 20.",
            },
        ],
    },
    {
        slug: "terea/kazakhstan",
        category: "terea",
        region: "Kazakhstan",
        h1: "TEREA Kazakhstan in Dubai & UAE",
        metaTitle: `TEREA Kazakhstan Dubai — Amber, Turquoise, Silver from ${tereaFrom("Kazakhstan")}`,
        metaDescription:
            `Shop TEREA Kazakhstan in Dubai and the UAE: Amber, Turquoise Menthol, Silver, Bronze, Yellow, Green Zing and Pearl capsules. From ${tereaFrom("Kazakhstan")}, same-day delivery in Dubai.`,
        intro:
            "The Kazakhstan range covers the TEREA classics most UAE customers grew up with — Amber, Silver, Bronze, Turquoise — plus a strong selection of click-capsule pearls.",
        body: [
            {
                heading: "The classic TEREA range",
                text: "If you want a dependable everyday stick, Kazakhstan is the place to start: balanced tobacco in Amber, smoother Silver, richer Bronze and menthol options like Turquoise and Purple.",
            },
            {
                heading: "Capsule pearls",
                text: "Kazakhstan also carries several pearls — Starling, Provence, Tidal, Twilight and Sun Pearl — that let you click a capsule mid-session to change the flavour.",
            },
        ],
        faqs: [
            {
                question: "What's the most popular TEREA Kazakhstan flavour?",
                answer: "Amber and Turquoise are two of the most requested — Amber for a balanced tobacco taste, Turquoise for cool menthol.",
            },
            {
                question: "How much is TEREA Kazakhstan in the UAE?",
                answer: `TEREA Kazakhstan cartons are ${tereaRange("Kazakhstan")} in our store, with free delivery on 2 or more items.`,
            },
        ],
    },
    {
        slug: "terea/uzbekistan",
        category: "terea",
        region: "Uzbekistan",
        h1: "TEREA Uzbekistan in Dubai & UAE",
        metaTitle: `TEREA Uzbekistan Dubai — Smooth Classics from ${tereaFrom("Uzbekistan")}`,
        metaDescription:
            `Buy TEREA Uzbekistan in Dubai and across the UAE: Amber, Bronze, Silver, Yellow, Turquoise, Purple Wave, Summer Wave and pearls. ${tereaRange("Uzbekistan")} per carton, same-day Dubai delivery.`,
        intro:
            "Uzbekistan TEREA brings the smooth favourites — Amber, Silver, Bronze, Turquoise and the Wave range — at a flat, fair price per carton.",
        body: [
            {
                heading: "Everyday favourites at one price",
                text: "Every Uzbekistan carton in our range is the same price, which makes it easy to mix tobacco, menthol and capsule flavours in one order — and with 2 or more items, delivery is free.",
            },
        ],
        faqs: [
            {
                question: "Is TEREA Uzbekistan authentic?",
                answer: "Yes. Uzbekistan is an official TEREA market; the sticks are the same format and fit every IQOS ILUMA device.",
            },
            {
                question: "How much is TEREA Uzbekistan in Dubai?",
                answer: `${tereaRange("Uzbekistan")} per carton of 200 sticks in our store.`,
            },
        ],
    },
    {
        slug: "terea/switzerland",
        category: "terea",
        region: "Switzerland",
        h1: "TEREA Swiss in Dubai & UAE",
        metaTitle: `TEREA Swiss Dubai — Amber, Teak, Silver & More from ${tereaFrom("Switzerland")}`,
        metaDescription: `Buy TEREA Swiss in Dubai and the UAE: Amber, Bronze, Sienna, Teak, Silver, Yellow, Turquoise and Purple Wave. Swiss-made TEREA at ${tereaRange("Switzerland")} per carton, same-day delivery in Dubai.`,
        intro:
            "Swiss-made TEREA covers the classic European line-up — from light Silver and sweet Yellow to rich Amber and bold, smoky Teak — plus two menthol options.",
        body: [
            {
                heading: "The Swiss range, light to bold",
                text: "Silver and Yellow are the gentlest Swiss sticks, Amber and Sienna sit in the middle with a rounder aroma, and Bronze and Teak bring the most body. Turquoise adds a soft menthol, while Purple Wave pairs grape with a cool finish.",
            },
            {
                heading: "Made for every ILUMA",
                text: "Swiss TEREA fits every IQOS ILUMA device, including the ILUMA i series. It doesn't work in older IQOS models such as the IQOS 3 DUO.",
            },
        ],
        faqs: [
            {
                question: "How much is TEREA Swiss in Dubai?",
                answer: `${tereaRange("Switzerland")} per carton of 200 sticks (10 packs × 20) in our store, with free delivery on 2 or more items.`,
            },
            {
                question: "Which Swiss TEREA is the strongest?",
                answer: "Teak is the boldest, with a smoky, woody character. For something lighter, try Silver or Yellow.",
            },
        ],
    },
    {
        slug: "terea/japan",
        category: "terea",
        region: "Japan",
        h1: "TEREA Japan in Dubai & UAE",
        metaTitle: `TEREA Japan Dubai — Premium Japanese Flavours from ${tereaFrom("Japan")}`,
        metaDescription:
            "Shop TEREA Japan in Dubai and the UAE: Rich Regular, Black Menthol, Tropical Menthol, Blossom Pearl, Ruby Regular and more. Premium Japanese-market TEREA with same-day Dubai delivery.",
        intro:
            "Japanese-market TEREA is known for refined, distinctive blends — from deep Rich Regular to Tropical Menthol and floral Blossom Pearl. It's our premium range.",
        body: [
            {
                heading: "Why TEREA Japan costs more",
                text: "Japan has its own TEREA line-up with flavours made for Japanese smokers, and it's imported in smaller quantities. Many of these blends aren't sold in any other market.",
            },
            {
                heading: "Regular, menthol and pearls",
                text: "The 'Regular' family (Rich, Smooth, Balanced, Warm, Ruby) covers tobacco from mild to full. Menthol options range from Bright to Black, and pearls like Blossom, Stellar and Sun add a click capsule.",
            },
        ],
        faqs: [
            {
                question: "Does TEREA Japan work with ILUMA bought in the UAE?",
                answer: "Yes. TEREA from any origin works in every IQOS ILUMA device, regardless of where the device was bought.",
            },
            {
                question: "How much is TEREA Japan in Dubai?",
                answer: `TEREA Japan cartons are ${tereaRange("Japan")} in our store.`,
            },
        ],
    },
    {
        slug: "iqos-iluma",
        category: "iluma",
        h1: "IQOS ILUMA Devices in Dubai & UAE",
        metaTitle: "IQOS ILUMA Price in UAE — ILUMA i, Prime, One & Limited Editions",
        metaDescription:
            `Buy IQOS ILUMA in Dubai and the UAE: ILUMA i, ILUMA i Prime, ILUMA Prime, ILUMA One, Standard kits and limited editions. Authentic devices from ${formatAED(priceRange(getProducts({ category: "iluma" })).min)} with same-day Dubai delivery.`,
        intro:
            "IQOS ILUMA heats TEREA sticks from the inside with SMARTCORE INDUCTION — no blade, no cleaning. Choose the newer ILUMA i series, the premium Prime, the compact One or a collectable limited edition.",
        body: [
            {
                heading: "Which ILUMA is right for you?",
                text: "ILUMA One is an all-in-one device — simple and pocket-sized. ILUMA (Standard) pairs a holder with a pocket charger for back-to-back sessions. ILUMA Prime adds premium materials and a wraparound design. The ILUMA i series is the latest generation with extra features such as a touchscreen on selected models.",
            },
            {
                heading: "Works only with TEREA",
                text: "ILUMA devices are designed for TEREA sticks only. Don't use HEETS or other sticks in an ILUMA.",
            },
        ],
        faqs: [
            {
                question: "What is the IQOS ILUMA price in the UAE?",
                answer: `In our store, ILUMA One starts at ${lineFrom("iluma", "ILUMA One")}, ILUMA Standard at ${lineFrom("iluma", "ILUMA Standard")}, ILUMA i at ${lineFrom("iluma", "ILUMA i")} and ILUMA i Prime at ${lineFrom("iluma", "ILUMA i Prime")}. Limited editions vary.`,
            },
            {
                question: "Are your IQOS ILUMA devices original?",
                answer: "Yes — every device is authentic and delivered sealed.",
            },
        ],
    },
    {
        slug: "vgod-stig",
        category: "stig",
        h1: "VGOD STIG Disposable Pods in Dubai & UAE",
        metaTitle: `VGOD STIG Dubai — Disposable Pods from ${formatAED(priceRange(getProducts({ category: "stig" })).min)}`,
        metaDescription:
            `Buy VGOD STIG and STIG XL disposable pods in Dubai and the UAE: Iced Mango Bomb, Lush Ice, Cubano, Mix flavours and more. From ${formatAED(priceRange(getProducts({ category: "stig" })).min)} with same-day delivery in Dubai.`,
        intro:
            "VGOD STIG is a pocket-sized disposable pod — no charging, no refilling. Pick a flavour, draw, and go. STIG XL offers a bigger capacity for longer use.",
        body: [
            {
                heading: "STIG vs STIG XL",
                text: "The original STIG comes in packs of 3 pods with 6% salt nicotine. STIG XL is a larger single device with more puffs per unit and a lower nicotine strength.",
            },
        ],
        faqs: [
            {
                question: "How much is VGOD STIG in Dubai?",
                answer: `STIG packs are ${lineFrom("stig", "STIG")} and STIG XL is ${lineFrom("stig", "STIG XL")} in our store, with free delivery on 2 or more items.`,
            },
            {
                question: "Do you deliver STIG across the UAE?",
                answer: "Yes, to every emirate. Same-day in Dubai when you order before 12PM.",
            },
        ],
    },
]

export function getCollection(slug: string) {
    return COLLECTIONS.find((c) => c.slug === slug)
}

export function collectionFor(category: Category, region?: Region) {
    return COLLECTIONS.find((c) => c.category === category && c.region === region)
}
