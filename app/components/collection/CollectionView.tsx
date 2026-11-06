import Link from "next/link"
import { ArrowRight, Clock, Tag, Truck } from "lucide-react"
import { COLLECTIONS, type Collection } from "@/app/data/collections"
import { EMIRATE_PAGES } from "@/app/data/emirates"
import { getProducts, priceRange } from "@/app/data/products"
import { CATEGORIES, REGIONS, STORE, listingHref } from "@/app/data/store"
import { FREE_DELIVERY_RULE, formatAED } from "@/app/lib/pricing"
import type { Product, Region } from "@/app/types"
import Breadcrumbs, { type Crumb } from "./Breadcrumbs"
import CollectionGrid from "./CollectionGrid"

const NAV: { label: string; href: string; color?: string }[] = [
    { label: "TEREA", href: listingHref({ category: "terea" }) },
    ...(Object.keys(REGIONS) as Region[]).map((r) => ({ label: r, href: listingHref({ category: "terea", region: r }), color: REGIONS[r].color })),
    { label: "ILUMA i", href: "/iqos-iluma-i", color: CATEGORIES.iluma.color },
    { label: "ILUMA", href: listingHref({ category: "iluma" }), color: CATEGORIES.iluma.color },
    { label: "STIG", href: listingHref({ category: "stig" }), color: CATEGORIES.stig.color },
]

export function FaqList({ faqs }: { faqs: { question: string; answer: string }[] }) {
    return (
        <div className="divide-y divide-line overflow-hidden rounded-[1.5rem] border border-line bg-paper">
            {faqs.map((f) => (
                <details key={f.question} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display font-bold [&::-webkit-details-marker]:hidden">
                        {f.question}
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sand text-lg transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="px-5 pb-5 leading-relaxed text-ink-soft">{f.answer}</p>
                </details>
            ))}
        </div>
    )
}

export function DeliveryAreas({ title = "We deliver across the UAE" }: { title?: string }) {
    return (
        <div>
            <h2 className="text-xl font-extrabold md:text-2xl">{title}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
                {EMIRATE_PAGES.map((e) => (
                    <Link key={e.slug} href={`/delivery/${e.slug}`} className="chip">
                        <Truck size={14} /> {e.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export function collectionSchemas(path: string, name: string, description: string, products: Product[], faqs: Collection["faqs"]) {
    return [
        {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name,
            description,
            url: `${STORE.url}/${path}`,
            mainEntity: {
                "@type": "ItemList",
                numberOfItems: products.length,
                itemListElement: products.map((p, i) => ({
                    "@type": "ListItem",
                    position: i + 1,
                    url: `${STORE.url}/products/${p.id}`,
                    name: p.name,
                })),
            },
        },
        ...(faqs.length
            ? [
                  {
                      "@context": "https://schema.org",
                      "@type": "FAQPage",
                      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
                  },
              ]
            : []),
    ]
}

const names = (list: Product[]) => list.map((p) => p.name.replace(/^TEREA\s+/, "")).join(", ")

// Extra origin questions answered straight from the catalogue, so they stay true as stock changes.
function originFaqs(region: Region, products: Product[]): Collection["faqs"] {
    const label = `TEREA ${region}`
    const inStock = products.filter((p) => p.inStock)
    const menthol = products.filter((p) => p.family === "Menthol")
    const capsule = products.filter((p) => p.family === "Capsule")
    const cheapest = (inStock.length ? inStock : products).reduce((a, b) => (b.price < a.price ? b : a))
    return [
        {
            question: `Which ${label} flavours are menthol?`,
            answer: menthol.length ? `${menthol.length} ${label} flavours are menthol: ${names(menthol)}.` : `None of our ${label} flavours are plain menthol.`,
        },
        {
            question: `Does ${label} have capsule (click) flavours?`,
            answer: capsule.length
                ? `Yes — ${names(capsule)} ${capsule.length === 1 ? "has" : "have"} a capsule in the filter you click to change the flavour mid-session.`
                : `No, our ${label} range has no capsule flavours. Look at Indonesia or Japan for pearl and capsule sticks.`,
        },
        {
            question: `What is the cheapest ${label} carton?`,
            answer: `${cheapest.name} ${region} at ${formatAED(cheapest.price)} per carton of 200 sticks.`,
        },
        {
            question: `Does ${label} work with IQOS ILUMA i?`,
            answer: `Yes. ${label} works in every IQOS ILUMA device — ILUMA, ILUMA One, ILUMA Prime and the ILUMA i series. It does not work in older IQOS models that use HEETS.`,
        },
        {
            question: `Why is the ${label} pack not in English?`,
            answer: `${label} is made for the ${region} market, so pack text and health warnings are in that market's language. Every carton we sell arrives sealed in its original cellophane.`,
        },
    ]
}

function PriceList({ title, products }: { title: string; products: Product[] }) {
    return (
        <section className="mt-16">
            <h2 className="text-2xl font-extrabold md:text-3xl">{title}</h2>
            <div className="mt-4 overflow-x-auto rounded-[1.5rem] border border-line bg-paper">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-line text-xs uppercase tracking-wider text-ink-soft">
                        <tr>
                            <th className="px-4 py-3">Product</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">Stock</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                        {products.map((p) => (
                            <tr key={p.id}>
                                <td className="px-4 py-2.5 font-bold">
                                    <Link href={`/products/${p.id}`} className="hover:text-ember">
                                        {p.name}
                                        {p.region ? ` ${p.region}` : ""}
                                    </Link>
                                    {p.notes && <span className="block text-xs font-normal text-ink-soft">{p.notes}</span>}
                                </td>
                                <td className="px-4 py-2.5">{p.family}</td>
                                <td className="whitespace-nowrap px-4 py-2.5 font-bold">{formatAED(p.price)}</td>
                                <td className="whitespace-nowrap px-4 py-2.5">{p.inStock ? "In stock" : "Sold out"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default function CollectionView({ collection }: { collection: Collection }) {
    const products = getProducts({ category: collection.category, region: collection.region, line: collection.line })
    const faqs = collection.region ? [...collection.faqs, ...originFaqs(collection.region, products)] : collection.faqs
    const priceListTitle = collection.region
        ? `TEREA ${collection.region} price list in Dubai`
        : `${collection.label ?? collection.line ?? CATEGORIES[collection.category].label} price list in the UAE`
    const { min } = priceRange(products)
    const accent = collection.region ? REGIONS[collection.region].color : CATEGORIES[collection.category].color
    const href = `/${collection.slug}`
    const crumbs: Crumb[] = collection.region
        ? [
              { name: "TEREA", href: listingHref({ category: "terea" }) },
              { name: collection.region, href },
          ]
        : collection.line
          ? [
                { name: CATEGORIES[collection.category].short, href: listingHref({ category: collection.category }) },
                ...(collection.slug.includes("/") ? [{ name: "ILUMA i", href: "/iqos-iluma-i" }] : []),
                { name: collection.label ?? collection.line, href },
            ]
          : [{ name: CATEGORIES[collection.category].short, href }]
    // Model pages (i One / i Prime / i Standard) get quick links to their siblings.
    const models = collection.line?.startsWith("ILUMA i") ? COLLECTIONS.filter((c) => c.slug.startsWith("iqos-iluma-i/")) : []

    return (
        <>
            {collectionSchemas(collection.slug, collection.h1, collection.metaDescription, products, faqs).map((s, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
            ))}

            <section className="grain relative overflow-hidden bg-night text-white">
                <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-40 blur-[110px]" style={{ background: accent }} />
                <div className="container-x relative py-8 md:py-14">
                    <Breadcrumbs items={crumbs} light />
                    <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] md:text-6xl">{collection.h1}</h1>
                    <p className="mt-4 max-w-2xl text-white/70 md:text-lg">{collection.intro}</p>
                    <div className="mt-6 flex flex-wrap gap-2 text-sm font-bold">
                        <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                            <Tag size={15} className="text-gold" /> {products.length} products · from {formatAED(min)}
                        </span>
                        <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                            <Clock size={15} className="text-gold" /> Same-day in Dubai before 12PM
                        </span>
                        <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                            <Truck size={15} className="text-gold" /> Free delivery on {FREE_DELIVERY_RULE}
                        </span>
                    </div>
                </div>
            </section>

            <div className="container-x py-6 md:py-10">
                <nav aria-label="Collections" className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
                    {NAV.map((n) => (
                        <Link key={n.href} href={n.href} data-active={n.href === href} className="chip">
                            {n.color && <span className="h-2 w-2 rounded-full" style={{ background: n.href === href ? "#fff" : n.color }} />}
                            {n.label}
                        </Link>
                    ))}
                    <Link href="/listings" className="chip">
                        All products
                    </Link>
                </nav>

                {models.length > 0 && (
                    <div className="mb-6 grid grid-cols-3 gap-2 md:max-w-2xl md:gap-3">
                        {models.map((m) => {
                            const list = getProducts({ category: "iluma", line: m.line })
                            const active = `/${m.slug}` === href
                            return (
                                <Link
                                    key={m.slug}
                                    href={`/${m.slug}`}
                                    data-active={active}
                                    className="rounded-2xl border border-line bg-paper p-3 transition hover:border-iluma data-[active=true]:border-iluma data-[active=true]:bg-iluma data-[active=true]:text-white"
                                >
                                    <span className="block font-display text-sm font-extrabold md:text-base">{m.label}</span>
                                    <span className="text-xs opacity-70">from {formatAED(priceRange(list).min)}</span>
                                </Link>
                            )
                        })}
                    </div>
                )}

                <CollectionGrid products={products} />

                {/* The all-TEREA list lives on /terea-price-uae; repeating it here would compete with that page. */}
                {collection.slug !== "terea" && <PriceList title={priceListTitle} products={products} />}

                <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
                    <div className="space-y-8">
                        {collection.body.map((b) => (
                            <section key={b.heading}>
                                <h2 className="text-2xl font-extrabold md:text-3xl">{b.heading}</h2>
                                <p className="mt-3 leading-relaxed text-ink-soft">{b.text}</p>
                            </section>
                        ))}
                        <Link href="/guides" className="inline-flex items-center gap-2 font-bold text-ember">
                            Read our TEREA & ILUMA guides <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="space-y-10">
                        {faqs.length > 0 && (
                            <section>
                                <h2 className="mb-4 text-2xl font-extrabold md:text-3xl">Frequently asked</h2>
                                <FaqList faqs={faqs} />
                            </section>
                        )}
                        <DeliveryAreas />
                    </div>
                </div>
            </div>
        </>
    )
}
