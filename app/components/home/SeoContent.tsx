import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { COLLECTIONS } from "@/app/data/collections"
import { EMIRATE_PAGES } from "@/app/data/emirates"
import { GUIDES } from "@/app/data/guides"
import { getProducts, priceRange } from "@/app/data/products"
import { ORIGIN_COUNT, REGIONS, listingHref } from "@/app/data/store"
import { formatAED } from "@/app/lib/pricing"
import type { Region } from "@/app/types"

const REGION_KEYS = Object.keys(REGIONS) as Region[]

// Plain, useful copy that answers what UAE shoppers search for, linking into the
// collection, delivery and guide pages so search engines can find them.
export default function SeoContent() {
    const terea = getProducts({ category: "terea" })
    const iluma = getProducts({ category: "iluma" })

    return (
        <section className="border-t border-line py-14 md:py-20">
            <div className="container-x grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
                <div className="space-y-6 text-ink-soft">
                    <h2 className="text-3xl font-extrabold text-ink md:text-4xl">Buy IQOS & TEREA online in Dubai and the UAE</h2>
                    <p className="leading-relaxed">
                        IQOS Store UAE is an online shop for heated tobacco and pods, delivering to every emirate. We stock {terea.length} TEREA
                        flavours from {ORIGIN_COUNT} origins —{" "}
                        {REGION_KEYS.map((r, i) => (
                            <span key={r}>
                                <Link href={listingHref({ category: "terea", region: r })} className="font-bold text-ink underline underline-offset-4">
                                    {r}
                                </Link>
                                {i < REGION_KEYS.length - 2 ? ", " : i === REGION_KEYS.length - 2 ? " and " : ""}
                            </span>
                        ))}{" "}
                        — starting at{" "}
                        {formatAED(priceRange(terea).min)} per carton.
                    </p>
                    <p className="leading-relaxed">
                        Need a device? Our <Link href="/iqos-iluma" className="font-bold text-ink underline underline-offset-4">IQOS ILUMA range</Link>{" "}
                        covers ILUMA i, ILUMA i Prime, Prime, One and limited editions from {formatAED(priceRange(iluma).min)}. Prefer pods? Browse{" "}
                        <Link href="/vgod-stig" className="font-bold text-ink underline underline-offset-4">VGOD STIG</Link>.
                    </p>
                    <p className="leading-relaxed">
                        Orders placed before 12PM are delivered the same day in Dubai, and the next day everywhere else — including Abu Dhabi,
                        Sharjah, Ajman, Ras Al Khaimah, Fujairah, Umm Al Quwain and Al Ain. Delivery is free on 2 or more items, and you can pay cash
                        on delivery.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {COLLECTIONS.map((c) => (
                            <Link key={c.slug} href={`/${c.slug}`} className="chip">
                                {c.h1.replace(" in Dubai & UAE", "")}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    <div>
                        <h3 className="text-lg font-extrabold">Delivery by emirate</h3>
                        <ul className="mt-3 grid grid-cols-2 gap-2">
                            {EMIRATE_PAGES.map((e) => (
                                <li key={e.slug}>
                                    <Link href={`/delivery/${e.slug}`} className="flex items-center justify-between rounded-xl bg-paper px-3 py-2.5 text-sm font-bold hover:text-ember">
                                        {e.name} <ArrowRight size={14} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-extrabold">Guides</h3>
                        <ul className="mt-3 space-y-2">
                            {GUIDES.map((g) => (
                                <li key={g.slug}>
                                    <Link href={`/guides/${g.slug}`} className="block rounded-xl bg-paper px-4 py-3 text-sm font-bold leading-snug hover:text-ember">
                                        {g.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
