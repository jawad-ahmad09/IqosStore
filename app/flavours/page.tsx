import type { Metadata } from "next"
import Link from "next/link"
import Breadcrumbs from "@/app/components/collection/Breadcrumbs"
import { FLAVOURS, flavourSummary } from "@/app/data/flavours"
import { REGIONS } from "@/app/data/store"
import { formatAED } from "@/app/lib/pricing"

export const metadata: Metadata = {
    title: { absolute: "TEREA Flavours Compared by Origin — Amber, Silver, Sun Pearl & More | IQOS Store UAE" },
    description: "Compare popular TEREA flavours across Indonesia, Kazakhstan, Uzbekistan, Switzerland and Japan — taste notes and prices side by side, with same-day delivery in Dubai.",
    alternates: { canonical: "/flavours" },
}

export default function FlavoursIndex() {
    return (
        <div className="container-x py-8 md:py-14">
            <Breadcrumbs items={[{ name: "Flavours", href: "/flavours" }]} />
            <h1 className="mt-5 text-4xl font-extrabold md:text-6xl">TEREA flavours, compared</h1>
            <p className="mt-4 max-w-2xl text-ink-soft md:text-lg">
                Many TEREA flavours come from more than one origin. Pick a flavour to compare every version we stock — taste, type and price.
            </p>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {FLAVOURS.map((f) => {
                    const { min, max } = flavourSummary(f)
                    return (
                        <Link key={f.slug} href={`/flavours/${f.slug}`} className="rounded-[1.5rem] border border-line bg-paper p-5 transition hover:-translate-y-1 hover:shadow-lg">
                            <span className="font-display text-xl font-extrabold">TEREA {f.name}</span>
                            <span className="mt-2 flex flex-wrap gap-1.5">
                                {f.products.map((p) => (
                                    <span key={p.id} className="flex items-center gap-1 rounded-full bg-sand px-2 py-0.5 text-xs font-bold">
                                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: REGIONS[p.region!].color }} />
                                        {p.region}
                                    </span>
                                ))}
                            </span>
                            <span className="mt-3 block text-sm text-ink-soft">
                                {min === max ? formatAED(min) : `${formatAED(min)} – ${formatAED(max)}`} per carton
                            </span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
