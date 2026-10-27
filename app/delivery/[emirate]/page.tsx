import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Clock, MapPin, Truck } from "lucide-react"
import Breadcrumbs from "@/app/components/collection/Breadcrumbs"
import { DeliveryAreas, FaqList } from "@/app/components/collection/CollectionView"
import ProductRail from "@/app/components/home/ProductRail"
import { WhatsAppIcon } from "@/app/components/WhatsAppButton"
import { COLLECTIONS } from "@/app/data/collections"
import { EMIRATE_PAGES, getEmirate, type EmirateInfo } from "@/app/data/emirates"
import { getProducts, priceRange } from "@/app/data/products"
import { ORIGIN_COUNT, REGIONS, STORE, whatsappLink } from "@/app/data/store"
import { DELIVERY, formatAED } from "@/app/lib/pricing"

type Params = { params: Promise<{ emirate: string }> }

export const dynamicParams = false

export function generateStaticParams() {
    return EMIRATE_PAGES.map((e) => ({ emirate: e.slug }))
}

function faqsFor(e: EmirateInfo) {
    return [
        {
            question: `How fast is IQOS and TEREA delivery in ${e.name}?`,
            answer: e.speed,
        },
        {
            question: `How much does delivery to ${e.name} cost?`,
            answer: `Delivery is free for 2 or more items. A single item costs ${formatAED(e.singleItemFee)} to deliver in ${e.name}.`,
        },
        {
            question: `Do you deliver to ${e.areas[0]} and ${e.areas[1]}?`,
            answer: `Yes. We deliver across ${e.name}, including ${e.areas.slice(0, 6).join(", ")} and surrounding areas.`,
        },
        {
            question: `Can I pay cash on delivery in ${e.name}?`,
            answer: "Yes — cash on delivery is available, as well as bank transfer and online payment.",
        },
    ]
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const e = getEmirate((await params).emirate)
    if (!e) return {}
    const title = `IQOS & TEREA Delivery in ${e.name} — ILUMA, TEREA, STIG`
    const description = `Order TEREA, IQOS ILUMA and VGOD STIG online with delivery in ${e.name}. ${e.speed} Free delivery on 2+ items, cash on delivery available.`
    return {
        title: { absolute: title },
        description,
        alternates: { canonical: `/delivery/${e.slug}` },
        openGraph: { title, description, url: `/delivery/${e.slug}` },
    }
}

export default async function EmiratePage({ params }: Params) {
    const e = getEmirate((await params).emirate)
    if (!e) notFound()

    const faqs = faqsFor(e)
    const terea = getProducts({ category: "terea" })
    const popular = [...getProducts({ category: "terea", region: "Kazakhstan" }), ...getProducts({ category: "terea", region: "Indonesia" })]
        .filter((p) => p.inStock)
        .slice(0, 8)

    const schemas = [
        {
            "@context": "https://schema.org",
            "@type": "Service",
            name: `IQOS, TEREA and STIG delivery in ${e.name}`,
            serviceType: "Home delivery",
            provider: { "@id": `${STORE.url}/#store` },
            areaServed: { "@type": "City", name: e.name, containedInPlace: { "@type": "Country", name: "United Arab Emirates" } },
            offers: {
                "@type": "Offer",
                priceCurrency: "AED",
                price: e.singleItemFee,
                description: `Single-item delivery fee; free on ${DELIVERY.freeFromItems}+ items`,
            },
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
        },
    ]

    return (
        <>
            {schemas.map((s, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
            ))}

            <section className="grain relative overflow-hidden bg-night text-white">
                <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-ember/40 blur-[110px]" />
                <div className="container-x relative py-8 md:py-14">
                    <Breadcrumbs items={[{ name: "Delivery", href: "/delivery" }, { name: e.name, href: `/delivery/${e.slug}` }]} light />
                    <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] md:text-6xl">
                        IQOS & TEREA delivery in {e.name}
                    </h1>
                    <p className="mt-4 max-w-2xl text-white/70 md:text-lg">
                        Order TEREA from {ORIGIN_COUNT} origins, IQOS ILUMA devices and VGOD STIG pods online — delivered to your door in {e.name}. {e.note}
                    </p>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                        <Link href="/terea" className="btn btn-ember">
                            Shop TEREA <ArrowRight size={18} />
                        </Link>
                        <a href={whatsappLink(`Hi! I'd like to order for delivery in ${e.name}.`)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-white hover:bg-white hover:text-ink">
                            <WhatsAppIcon size={18} /> Order on WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            <div className="container-x py-10 md:py-14">
                <div className="grid gap-3 sm:grid-cols-3">
                    {[
                        { icon: Clock, title: "Delivery time", text: e.speed },
                        { icon: Truck, title: "Delivery fee", text: `Free on ${DELIVERY.freeFromItems}+ items · ${formatAED(e.singleItemFee)} for a single item` },
                        { icon: MapPin, title: "Coverage", text: `All of ${e.name}, door to door` },
                    ].map(({ icon: Icon, title, text }) => (
                        <div key={title} className="rounded-[1.5rem] border border-line bg-paper p-5">
                            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ember-soft text-ember">
                                <Icon size={20} />
                            </span>
                            <h2 className="mt-3 text-lg font-extrabold">{title}</h2>
                            <p className="mt-1 text-sm text-ink-soft">{text}</p>
                        </div>
                    ))}
                </div>

                <section className="mt-14">
                    <div className="mb-6 flex items-end justify-between">
                        <h2 className="text-2xl font-extrabold md:text-4xl">Popular in {e.name}</h2>
                        <Link href="/terea" className="text-sm font-bold text-ember">All TEREA</Link>
                    </div>
                    <ProductRail products={popular} />
                </section>

                <section className="mt-14">
                    <h2 className="text-2xl font-extrabold md:text-3xl">Shop by collection</h2>
                    <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                        {COLLECTIONS.filter((c) => c.slug !== "terea").map((c) => {
                            const list = c.region ? terea.filter((p) => p.region === c.region) : getProducts({ category: c.category })
                            return (
                                <Link
                                    key={c.slug}
                                    href={`/${c.slug}`}
                                    className="rounded-2xl bg-paper p-4 transition hover:-translate-y-0.5 hover:shadow-lg"
                                    style={c.region ? { boxShadow: `inset 3px 0 0 ${REGIONS[c.region].color}` } : undefined}
                                >
                                    <span className="block font-display font-bold">{c.h1.replace(" in Dubai & UAE", "")}</span>
                                    <span className="text-xs text-ink-soft">
                                        {list.length} products · from {formatAED(priceRange(list).min)}
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </section>

                <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
                    <section>
                        <h2 className="text-2xl font-extrabold md:text-3xl">Areas we cover in {e.name}</h2>
                        <ul className="mt-4 flex flex-wrap gap-2">
                            {e.areas.map((a) => (
                                <li key={a} className="rounded-full border border-line bg-paper px-3 py-1.5 text-sm font-semibold">
                                    {a}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-3 text-sm text-ink-soft">…and everywhere else in {e.name}. Not sure? Message us on WhatsApp.</p>
                        <div className="mt-10">
                            <DeliveryAreas title="Other emirates" />
                        </div>
                    </section>
                    <section>
                        <h2 className="mb-4 text-2xl font-extrabold md:text-3xl">Delivery questions</h2>
                        <FaqList faqs={faqs} />
                    </section>
                </div>
            </div>
        </>
    )
}
