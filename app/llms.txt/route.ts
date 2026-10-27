import { COLLECTIONS } from "@/app/data/collections"
import { EMIRATE_PAGES } from "@/app/data/emirates"
import { FLAVOURS } from "@/app/data/flavours"
import { GUIDES } from "@/app/data/guides"
import { getProducts, priceRange } from "@/app/data/products"
import { ORIGIN_LIST, STORE } from "@/app/data/store"
import { DELIVERY, formatAED } from "@/app/lib/pricing"

export const dynamic = "force-static"

// llms.txt: a plain-text summary that AI assistants and AI search engines can read
// when people ask them where to buy IQOS or TEREA in the UAE.
export function GET() {
    const line = (path: string, title: string, note = "") => `- [${title}](${STORE.url}${path})${note ? `: ${note}` : ""}`
    const body = [
        `# ${STORE.name}`,
        "",
        `> Online store in the UAE selling authentic TEREA heated tobacco sticks (${ORIGIN_LIST}), IQOS ILUMA devices and VGOD STIG disposable pods. Same-day delivery in Dubai for orders before 12PM, next-day delivery to all other emirates, free delivery on ${DELIVERY.freeFromItems}+ items, cash on delivery. WhatsApp support 24/7: +${STORE.whatsapp}.`,
        "",
        "## Collections",
        ...COLLECTIONS.map((c) => {
            const list = getProducts({ category: c.category, region: c.region })
            const { min, max } = priceRange(list)
            return line(`/${c.slug}`, c.h1, `${list.length} products, ${formatAED(min)}${min === max ? "" : `–${max}`}`)
        }),
        "",
        "## Prices & flavours",
        line("/terea-price-uae", "TEREA price list (all products)"),
        ...FLAVOURS.map((f) => line(`/flavours/${f.slug}`, `TEREA ${f.name} compared`, f.products.map((p) => `${p.region} ${formatAED(p.price)}`).join(", "))),
        "",
        "## Delivery",
        ...EMIRATE_PAGES.map((e) => line(`/delivery/${e.slug}`, `Delivery in ${e.name}`, e.speed)),
        "",
        "## Guides",
        ...GUIDES.map((g) => line(`/guides/${g.slug}`, g.title, g.description)),
        "",
        "## Arabic",
        line("/ar", "ايكوس دبي والإمارات (Arabic home)"),
        "",
        "## Contact",
        `- WhatsApp: +${STORE.whatsapp}`,
        `- Email: ${STORE.email}`,
        "",
    ].join("\n")
    return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
