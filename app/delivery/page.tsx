import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import Breadcrumbs from "@/app/components/collection/Breadcrumbs"
import { EMIRATE_PAGES } from "@/app/data/emirates"
import { DELIVERY, FREE_DELIVERY_RULE, formatAED } from "@/app/lib/pricing"
import { languageAlternates } from "@/app/lib/seo"
import { STORE } from "@/app/data/store"

export const metadata: Metadata = {
    title: { absolute: "IQOS & TEREA Delivery Across the UAE — All Emirates" },
    description: `We deliver TEREA, IQOS ILUMA and VGOD STIG to every emirate. Same-day in Dubai before 12PM, free delivery on ${FREE_DELIVERY_RULE}, cash on delivery.`,
    alternates: { canonical: "/delivery", languages: languageAlternates("/delivery") },
}

const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "IQOS, TEREA and STIG home delivery across the UAE",
    serviceType: "Home delivery",
    url: `${STORE.url}/delivery`,
    provider: { "@id": `${STORE.url}/#store` },
    areaServed: EMIRATE_PAGES.map((e) => ({ "@type": "City", name: e.name, containedInPlace: { "@type": "Country", name: "United Arab Emirates" } })),
    offers: { "@type": "Offer", priceCurrency: "AED", price: DELIVERY.fee, description: `Delivery fee; free on ${FREE_DELIVERY_RULE}` },
}

export default function DeliveryIndex() {
    return (
        <div className="container-x py-8 md:py-14">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <Breadcrumbs items={[{ name: "Delivery", href: "/delivery" }]} />
            <h1 className="mt-5 text-4xl font-extrabold md:text-6xl">Delivery across the UAE</h1>
            <p className="mt-4 max-w-2xl text-ink-soft md:text-lg">
                We&apos;re an online store, delivering door to door in every emirate. Same-day in Dubai when you order before 12PM, and free
                delivery anywhere on orders over {formatAED(DELIVERY.freeFromAmount)}.
            </p>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {EMIRATE_PAGES.map((e) => (
                    <Link key={e.slug} href={`/delivery/${e.slug}`} className="group rounded-[1.5rem] border border-line bg-paper p-5 transition hover:-translate-y-1 hover:shadow-lg">
                        <span className="flex items-start justify-between">
                            <span className="font-display text-xl font-extrabold">{e.name}</span>
                            <ArrowUpRight size={18} className="text-ink-faint group-hover:text-ember" />
                        </span>
                        <span className="mt-2 block text-sm text-ink-soft">{e.speed}</span>
                        <span className="mt-3 block text-xs font-bold">
                            Free over AED {DELIVERY.freeFromAmount} · else {formatAED(DELIVERY.fee)}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    )
}
