import type { Metadata } from "next"
import Link from "next/link"
import Breadcrumbs from "@/app/components/collection/Breadcrumbs"
import { FaqList } from "@/app/components/collection/CollectionView"
import { getProducts, priceRange } from "@/app/data/products"
import { CATEGORIES, REGIONS, STORE, listingHref } from "@/app/data/store"
import { DELIVERY, formatAED } from "@/app/lib/pricing"
import type { Product, Region } from "@/app/types"

const REGION_KEYS = Object.keys(REGIONS) as Region[]
const terea = getProducts({ category: "terea" })
const updated = new Date().toLocaleDateString("en-AE", { month: "long", year: "numeric" })

export const metadata: Metadata = {
    title: { absolute: `TEREA Price in UAE (${new Date().getFullYear()}) — Full Price List by Origin | ${STORE.name}` },
    description: `Current TEREA prices in Dubai & UAE: every flavour from ${REGION_KEYS.join(", ")}, plus IQOS ILUMA and STIG prices. TEREA from ${formatAED(priceRange(terea).min)} per carton.`,
    alternates: { canonical: "/terea-price-uae" },
}

function PriceTable({ title, href, products }: { title: string; href: string; products: Product[] }) {
    const { min, max } = priceRange(products)
    return (
        <section className="overflow-hidden rounded-[1.5rem] border border-line bg-paper">
            <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
                <h2 className="text-xl font-extrabold">
                    <Link href={href} className="hover:text-ember">{title}</Link>
                </h2>
                <span className="text-sm font-bold text-ink-soft">{min === max ? formatAED(min) : `${formatAED(min)} – ${formatAED(max)}`}</span>
            </div>
            <table className="w-full text-sm">
                <tbody className="divide-y divide-line">
                    {products.map((p) => (
                        <tr key={p.id}>
                            <td className="px-5 py-2.5">
                                <Link href={`/products/${p.id}`} className="font-semibold hover:text-ember">{p.name}</Link>
                                {!p.inStock && <span className="ml-2 text-xs text-ink-faint">sold out</span>}
                            </td>
                            <td className="whitespace-nowrap px-5 py-2.5 text-right font-display font-extrabold">{formatAED(p.price)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default function PriceListPage() {
    const iluma = getProducts({ category: "iluma" })
    const stig = getProducts({ category: "stig" })
    const faqs = [
        {
            question: "How much is TEREA in the UAE?",
            answer: `In our store a carton of TEREA (200 sticks) costs ${REGION_KEYS.map((r) => {
                const { min, max } = priceRange(getProducts({ category: "terea", region: r }))
                return `${min === max ? formatAED(min) : `${formatAED(min)}–${max}`} for ${r}`
            }).join(", ")}.`,
        },
        {
            question: "What's the cheapest TEREA in Dubai?",
            answer: `Our lowest TEREA price is ${formatAED(priceRange(terea).min)} per carton. Order 2 or more items and delivery is free anywhere in the UAE.`,
        },
        {
            question: "Is delivery included in the price?",
            answer: `Delivery is free on ${DELIVERY.freeFromItems}+ items. For a single item it's ${formatAED(DELIVERY.dubai)} in Dubai and ${formatAED(DELIVERY.otherEmirates)} elsewhere.`,
        },
    ]

    return (
        <div className="container-x py-8 md:py-14">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
                    }),
                }}
            />
            <Breadcrumbs items={[{ name: "TEREA price list", href: "/terea-price-uae" }]} />
            <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-6xl">TEREA price in UAE</h1>
            <p className="mt-4 max-w-2xl text-ink-soft md:text-lg">
                Every price in our store, updated {updated}. Prices are per carton of 10 packs (200 sticks) for TEREA, in UAE dirhams.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
                {REGION_KEYS.map((r) => {
                    const { min } = priceRange(getProducts({ category: "terea", region: r }))
                    return (
                        <a key={r} href={`#${r.toLowerCase()}`} className="chip">
                            <span className="h-2 w-2 rounded-full" style={{ background: REGIONS[r].color }} />
                            {r} · from {formatAED(min)}
                        </a>
                    )
                })}
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
                {REGION_KEYS.map((r) => (
                    <div key={r} id={r.toLowerCase()} className="scroll-mt-28">
                        <PriceTable title={`TEREA ${r}`} href={listingHref({ category: "terea", region: r })} products={getProducts({ category: "terea", region: r })} />
                    </div>
                ))}
                <PriceTable title={CATEGORIES.iluma.label} href={listingHref({ category: "iluma" })} products={iluma} />
                <PriceTable title={CATEGORIES.stig.label} href={listingHref({ category: "stig" })} products={stig} />
            </div>

            <section className="mt-14 max-w-3xl">
                <h2 className="mb-4 text-2xl font-extrabold md:text-3xl">Price questions</h2>
                <FaqList faqs={faqs} />
            </section>
        </div>
    )
}
