import { DELIVERY, formatAED } from "@/app/lib/pricing"
import type { Product } from "@/app/types"

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
            answer: "TEREA sticks only — from any origin (Indonesia, Kazakhstan, Uzbekistan, Switzerland, Japan). Don't use HEETS in an ILUMA device.",
        })
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
        answer: `Order before 12PM for same-day delivery in Dubai; other emirates get next-day delivery. Delivery is free on ${DELIVERY.freeFromItems}+ items, otherwise ${formatAED(DELIVERY.dubai)} in Dubai and ${formatAED(DELIVERY.otherEmirates)} elsewhere.`,
    })
    return faqs
}
