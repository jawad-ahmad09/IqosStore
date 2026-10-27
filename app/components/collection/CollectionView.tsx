import Link from "next/link"
import { ArrowRight, Clock, Tag, Truck } from "lucide-react"
import type { Collection } from "@/app/data/collections"
import { EMIRATE_PAGES } from "@/app/data/emirates"
import { getProducts, priceRange } from "@/app/data/products"
import { CATEGORIES, REGIONS, STORE, listingHref } from "@/app/data/store"
import { DELIVERY, formatAED } from "@/app/lib/pricing"
import type { Product, Region } from "@/app/types"
import Breadcrumbs, { type Crumb } from "./Breadcrumbs"
import CollectionGrid from "./CollectionGrid"

const NAV: { label: string; href: string; color?: string }[] = [
    { label: "TEREA", href: listingHref({ category: "terea" }) },
    ...(Object.keys(REGIONS) as Region[]).map((r) => ({ label: r, href: listingHref({ category: "terea", region: r }), color: REGIONS[r].color })),
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

export default function CollectionView({ collection }: { collection: Collection }) {
    const products = getProducts({ category: collection.category, region: collection.region })
    const { min } = priceRange(products)
    const accent = collection.region ? REGIONS[collection.region].color : CATEGORIES[collection.category].color
    const href = `/${collection.slug}`
    const crumbs: Crumb[] = collection.region
        ? [
              { name: "TEREA", href: listingHref({ category: "terea" }) },
              { name: collection.region, href },
          ]
        : [{ name: CATEGORIES[collection.category].short, href }]

    return (
        <>
            {collectionSchemas(collection.slug, collection.h1, collection.metaDescription, products, collection.faqs).map((s, i) => (
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
                            <Truck size={15} className="text-gold" /> Free delivery on {DELIVERY.freeFromItems}+ items
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

                <CollectionGrid products={products} />

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
                        {collection.faqs.length > 0 && (
                            <section>
                                <h2 className="mb-4 text-2xl font-extrabold md:text-3xl">Frequently asked</h2>
                                <FaqList faqs={collection.faqs} />
                            </section>
                        )}
                        <DeliveryAreas />
                    </div>
                </div>
            </div>
        </>
    )
}
