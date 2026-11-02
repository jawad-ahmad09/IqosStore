import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Breadcrumbs from "@/app/components/collection/Breadcrumbs"
import { GUIDES } from "@/app/data/guides"
import { STORE } from "@/app/data/store"

export const metadata: Metadata = {
    title: { absolute: "TEREA & IQOS ILUMA Guides — Flavours, Origins & Devices" },
    description: "Practical guides for IQOS users in the UAE: every TEREA flavour explained, Indonesia vs Kazakhstan vs Japan TEREA, and IQOS ILUMA models compared.",
    alternates: { canonical: "/guides" },
}

const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "TEREA & IQOS ILUMA guides",
    url: `${STORE.url}/guides`,
    mainEntity: {
        "@type": "ItemList",
        numberOfItems: GUIDES.length,
        itemListElement: GUIDES.map((g, i) => ({ "@type": "ListItem", position: i + 1, name: g.title, url: `${STORE.url}/guides/${g.slug}` })),
    },
}

export default function GuidesIndex() {
    return (
        <div className="container-x py-8 md:py-14">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <Breadcrumbs items={[{ name: "Guides", href: "/guides" }]} />
            <h1 className="mt-5 text-4xl font-extrabold md:text-6xl">Guides</h1>
            <p className="mt-4 max-w-2xl text-ink-soft md:text-lg">Everything you need to choose the right TEREA flavour and IQOS ILUMA device.</p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
                {GUIDES.map((g) => (
                    <Link key={g.slug} href={`/guides/${g.slug}`} className="group flex flex-col rounded-[1.5rem] border border-line bg-paper p-6 transition hover:-translate-y-1 hover:shadow-lg">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-ember">{g.readMinutes} min read</span>
                        <h2 className="mt-3 text-xl font-extrabold leading-snug">{g.title}</h2>
                        <p className="mt-2 flex-1 text-sm text-ink-soft">{g.description}</p>
                        <span className="mt-5 flex items-center gap-1 font-bold text-ember">
                            Read guide <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    )
}
