import { flavourForProduct } from "@/app/data/flavours"
import { DELIVERY, FREE_DELIVERY_RULE, formatAED } from "@/app/lib/pricing"
import type { Product } from "@/app/types"

// Name/value pairs for the Product schema's additionalProperty, from catalogue facts only.
export function productProperties(product: Product): [string, string][] {
    const props: [string, string][] = []
    if (product.region) props.push(["Market edition", product.region])
    if (product.category === "terea") {
        props.push(["Flavour family", product.family])
        props.push(["Sticks per carton", "200 (10 packs × 20)"])
    }
    if (product.line) props.push(["Model", product.line])
    if (product.intensity) props.push(["Intensity", product.intensity])
    // A spec line can hold several facts: "Click capsule: No · Menthol: No".
    for (const spec of product.specs.flatMap((s) => s.split(" · "))) {
        const i = spec.indexOf(":")
        if (i > 0 && !/^origin$/i.test(spec.slice(0, i).trim())) props.push([spec.slice(0, i).trim(), spec.slice(i + 1).trim()])
    }
    return props
}

// Product-specific questions built from catalogue facts, so every product page
// answers what people actually search ("TEREA Amber price Dubai", "is it menthol").
export function productFaqs(product: Product) {
    const where = product.region ? ` (${product.region})` : ""
    const name = `${product.name}${where}`
    const faqs: { question: string; answer: string }[] = []

    if (product.category === "terea") {
        faqs.push({
            question: `How much is ${name} in Dubai?`,
            answer: `${name} is ${formatAED(product.price)} per carton of 200 sticks (10 packs × 20) at IQOS Store UAE.${product.inStock ? "" : " It's currently sold out — message us on WhatsApp to be notified."}`,
        })
        faqs.push({
            question: `Is ${product.name} menthol?`,
            answer:
                product.family === "Menthol"
                    ? `Yes — ${product.name} is a menthol stick${product.notes ? `: ${product.notes.toLowerCase()}` : ""}.`
                    : product.family === "Capsule"
                      ? `${product.name} has a capsule in the filter that you can click to change the flavour${product.notes ? ` (${product.notes.toLowerCase()})` : ""}.`
                      : `No — ${product.name} is a tobacco stick without menthol${product.notes ? `, with ${product.notes.toLowerCase()}` : ""}.`,
        })
        const flavour = flavourForProduct(product)
        const others = flavour?.products.filter((p) => p.id !== product.id) ?? []
        if (others.length) {
            faqs.push({
                question: `Is ${name} different from other origins?`,
                answer: `We also stock ${product.name} from ${others.map((p) => `${p.region} (${formatAED(p.price)})`).join(", ")}. It's the same flavour made for different markets, so the pack language and price differ, and some smokers notice small taste differences between origins.`,
            })
        }
        faqs.push({
            question: `How long does a carton of ${product.name} last?`,
            answer: "A carton holds 200 sticks. At 10 sticks a day it lasts about 20 days; at 20 a day, about 10 days.",
        })
        faqs.push({
            question: `Which devices work with ${product.name}?`,
            answer: "Every IQOS ILUMA device: ILUMA, ILUMA One, ILUMA Prime and the ILUMA i series. TEREA does not work in older IQOS models such as IQOS 3 DUO.",
        })
    } else if (product.category === "iluma") {
        faqs.push({
            question: `How much is the ${product.name} in the UAE?`,
            answer: `${product.name} is ${formatAED(product.price)} at IQOS Store UAE.${product.inStock ? "" : " It's currently sold out — message us on WhatsApp to be notified."}`,
        })
        faqs.push({
            question: `Which sticks does the ${product.name} use?`,
            answer: "TEREA sticks only — from any origin (Indonesia, Kazakhstan, Uzbekistan, Switzerland, Italy, Japan). Don't use HEETS in an ILUMA device.",
        })
        const battery = product.specs.find((s) => /sessions? per charge|back-to-back|consecutive/i.test(s))
        if (battery) faqs.push({ question: `How many sessions does the ${product.name} give per charge?`, answer: `${battery}.` })
    } else {
        faqs.push({
            question: `How much is ${product.name} in Dubai?`,
            answer: `${product.name} is ${formatAED(product.price)} at IQOS Store UAE.${product.inStock ? "" : " It's currently sold out — message us on WhatsApp to be notified."}`,
        })
        const puffs = product.specs.find((s) => /puff/i.test(s))
        if (puffs) faqs.push({ question: `How many puffs does ${product.name} have?`, answer: `${puffs}.` })
    }

    faqs.push({
        question: `How fast can I get ${product.name} delivered?`,
        answer: `Order before 12PM for same-day delivery in Dubai; other emirates get next-day delivery. Delivery is free on ${FREE_DELIVERY_RULE}; below that it's ${formatAED(DELIVERY.fee)}.`,
    })
    return faqs
}
