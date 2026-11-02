import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Banknote, Clock, MapPin, Truck } from "lucide-react"
import Breadcrumbs from "@/app/components/collection/Breadcrumbs"
import { FaqList } from "@/app/components/collection/CollectionView"
import ProductRail from "@/app/components/home/ProductRail"
import { WhatsAppIcon } from "@/app/components/WhatsAppButton"
import { DUBAI_AREAS, getDubaiArea, type DubaiArea } from "@/app/data/dubaiAreas"
import { getProductById, getProducts } from "@/app/data/products"
import { ORIGIN_COUNT, STORE, whatsappLink } from "@/app/data/store"
import { DELIVERY, FREE_DELIVERY_RULE, formatAED } from "@/app/lib/pricing"
import type { Product } from "@/app/types"

type Params = { params: Promise<{ emirate: string; area: string }> }

export const dynamicParams = false

// Only Dubai has neighbourhood pages for now.
export function generateStaticParams() {
    return DUBAI_AREAS.map((a) => ({ emirate: "dubai", area: a.slug }))
}

const short = (a: DubaiArea) => a.name.replace(/\s*\(.*\)$/, "")

function faqsFor(a: DubaiArea) {
    const name = short(a)
    return [
        {
            question: `Do you deliver IQOS and TEREA to ${name}?`,
            answer: `Yes. We deliver TEREA sticks, IQOS ILUMA devices and VGOD STIG pods to homes, offices and hotels in ${a.name}.`,
        },
        {
            question: `How fast is delivery in ${name}?`,
            answer: "Order before 12PM for same-day delivery; orders after 12PM arrive the next day.",
        },
        {
            question: `How much is delivery to ${name}?`,
            answer: `Free on ${FREE_DELIVERY_RULE}. Otherwise it's ${formatAED(DELIVERY.dubai)}, the standard Dubai rate.`,
        },
        {
            question: `Can I pay cash on delivery in ${name}?`,
            answer: "Yes — pay cash when your order arrives, or use bank transfer or online payment if you prefer.",
        },
    ]
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const a = getDubaiArea((await params).area)
    if (!a) return {}
    const name = short(a)
    const path = `/delivery/dubai/${a.slug}`
    const title = `IQOS & TEREA Delivery in ${name}, Dubai — Same-Day | ${STORE.name}`
    const description = `Order TEREA, IQOS ILUMA and VGOD STIG online for delivery in ${a.name}, Dubai. Same-day before 12PM, free on ${FREE_DELIVERY_RULE}, cash on delivery.`
    return {
        title: { absolute: title },
        description,
        alternates: { canonical: path },
        openGraph: { title, description, url: path },
    }
}

// Best sellers shown on every area page: pinned TEREA flavours, the new ILUMA i and top STIG.
function popularProducts(): Product[] {
    const ids = [
        "terea-amber-kazakhstan",
        "terea-silver-uzbekistan",
        "terea-turquoise-menthol-kazakhstan",
        "terea-purple-wave-indonesia",
        "terea-amber-italy",
        "iqos-iluma-i-one-breeze-blue",
        "stig-lush-ice",
    ]
    const picked = ids.map(getProductById).filter((p): p is Product => !!p?.inStock)
    return picked.length >= 4 ? picked : getProducts({ category: "terea" }).filter((p) => p.inStock).slice(0, 8)
}

export default async function DubaiAreaPage({ params }: Params) {
    const { emirate, area } = await params
    const a = emirate === "dubai" ? getDubaiArea(area) : undefined
    if (!a) notFound()

    const name = short(a)
    const path = `/delivery/dubai/${a.slug}`
    const faqs = faqsFor(a)
    const nearby = a.nearby.map(getDubaiArea).filter((n): n is DubaiArea => !!n)

    const schemas = [
        {
            "@context": "https://schema.org",
            "@type": "Service",
            name: `IQOS, TEREA and STIG delivery in ${a.name}, Dubai`,
            serviceType: "Home delivery",
            url: `${STORE.url}${path}`,
            provider: { "@id": `${STORE.url}/#store` },
            areaServed: {
                "@type": "Place",
                name: `${a.name}, Dubai`,
                containedInPlace: { "@type": "City", name: "Dubai", containedInPlace: { "@type": "Country", name: "United Arab Emirates" } },
            },
            offers: { "@type": "Offer", priceCurrency: "AED", price: DELIVERY.dubai, description: `Delivery fee; free on ${FREE_DELIVERY_RULE}` },
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
                    <Breadcrumbs
                        items={[
                            { name: "Delivery", href: "/delivery" },
                            { name: "Dubai", href: "/delivery/dubai" },
                            { name, href: path },
                        ]}
                        light
                    />
                    <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] md:text-6xl">IQOS & TEREA delivery in {name}</h1>
                    <p className="mt-4 max-w-2xl text-white/70 md:text-lg">{a.blurb}</p>
                    <p className="mt-3 max-w-2xl text-sm text-white/55">
                        TEREA from {ORIGIN_COUNT} origins, IQOS ILUMA and ILUMA i devices, and VGOD STIG pods — ordered online, delivered in Dubai.
                    </p>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                        <Link href="/terea" className="btn btn-ember">
                            Shop TEREA <ArrowRight size={18} />
                        </Link>
                        <a
                            href={whatsappLink(`Hi! I'd like to order for delivery in ${a.name}, Dubai.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-ghost text-white hover:bg-white hover:text-ink"
                        >
                            <WhatsAppIcon size={18} /> Order on WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            <div className="container-x py-10 md:py-14">
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {[
                        { icon: Clock, title: "Same-day", text: "Order before 12PM, delivered today" },
                        { icon: Truck, title: "Delivery fee", text: `Free on ${FREE_DELIVERY_RULE} · else ${formatAED(DELIVERY.dubai)}` },
                        { icon: Banknote, title: "Cash on delivery", text: "Or bank transfer / online payment" },
                        { icon: MapPin, title: "Door to door", text: `Anywhere in ${name}` },
                    ].map(({ icon: Icon, title, text }) => (
                        <div key={title} className="rounded-[1.5rem] border border-line bg-paper p-4 md:p-5">
                            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ember-soft text-ember">
                                <Icon size={20} />
                            </span>
                            <h2 className="mt-3 text-base font-extrabold md:text-lg">{title}</h2>
                            <p className="mt-1 text-sm text-ink-soft">{text}</p>
                        </div>
                    ))}
                </div>

                <section className="mt-14">
                    <div className="mb-6 flex items-end justify-between gap-4">
                        <h2 className="text-2xl font-extrabold md:text-4xl">Popular picks for {name}</h2>
                        <Link href="/listings" className="shrink-0 whitespace-nowrap text-sm font-bold text-ember">
                            Shop all
                        </Link>
                    </div>
                    <ProductRail products={popularProducts()} />
                </section>

                <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
                    <section>
                        <h2 className="text-2xl font-extrabold md:text-3xl">Nearby areas we deliver to</h2>
                        <ul className="mt-4 flex flex-wrap gap-2">
                            {nearby.map((n) => (
                                <li key={n.slug}>
                                    <Link href={`/delivery/dubai/${n.slug}`} className="chip">
                                        <MapPin size={14} /> {short(n)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">Shop by category</h2>
                        <ul className="mt-4 flex flex-wrap gap-2">
                            {[
                                ["/terea", "TEREA sticks"],
                                ["/iqos-iluma-i", "IQOS ILUMA i"],
                                ["/iqos-iluma", "IQOS ILUMA"],
                                ["/vgod-stig", "VGOD STIG"],
                                ["/terea-price-uae", "TEREA price list"],
                            ].map(([href, label]) => (
                                <li key={href}>
                                    <Link href={href} className="chip">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Link href="/delivery/dubai" className="mt-8 inline-flex items-center gap-2 font-bold text-ember">
                            All Dubai delivery areas <ArrowRight size={16} />
                        </Link>
                    </section>
                    <section>
                        <h2 className="mb-4 text-2xl font-extrabold md:text-3xl">Delivery in {name}: questions</h2>
                        <FaqList faqs={faqs} />
                    </section>
                </div>
            </div>
        </>
    )
}
