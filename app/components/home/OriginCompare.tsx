import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getProducts, priceRange } from "@/app/data/products"
import { REGIONS, listingHref } from "@/app/data/store"
import { formatAED } from "@/app/lib/pricing"
import type { Region } from "@/app/types"
import Reveal from "../Reveal"

const PROFILE: Record<Region, { packaging: string; bestFor: string }> = {
    Indonesia: { packaging: "Indonesian-market packs", bestFor: "Variety seekers — editions, pearls & waves" },
    Kazakhstan: { packaging: "Kazakh-market packs", bestFor: "Classic favourites and capsule sticks" },
    Uzbekistan: { packaging: "Uzbek-market packs", bestFor: "Smooth everyday smokes at a fair price" },
    Japan: { packaging: "Japanese-market packs", bestFor: "Premium blends you won't find elsewhere" },
}

export default function OriginCompare() {
    const rows = (Object.keys(REGIONS) as Region[]).map((region) => {
        const list = getProducts({ category: "terea", region })
        const families = new Map<string, number>()
        list.forEach((p) => families.set(p.family, (families.get(p.family) ?? 0) + 1))
        return {
            region,
            list,
            from: priceRange(list).min,
            families: [...families.entries()].sort((a, b) => b[1] - a[1]),
            hero: list.find((p) => p.inStock) ?? list[0],
        }
    })

    return (
        <section className="bg-sand-2 py-14 md:py-20">
            <div className="container-x">
                <Reveal className="mb-8 max-w-2xl">
                    <span className="eyebrow">Compare origins</span>
                    <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">Same TEREA, four personalities</h2>
                    <p className="mt-3 text-ink-soft">
                        Every origin works with every IQOS ILUMA. What changes is the flavour line-up, the packaging — and the price.
                    </p>
                </Reveal>

                <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 lg:grid-cols-4">
                    {rows.map(({ region, list, from, families, hero }, i) => (
                        <Reveal key={region} delay={i * 90} className="w-[78%] shrink-0 snap-start sm:w-[45%] md:w-auto">
                            <div
                                className="flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-paper"
                                style={{ "--tint": REGIONS[region].color } as React.CSSProperties}
                            >
                                <div className="plate relative h-36">
                                    <Image src={hero.images[0]} alt="" fill sizes="300px" className="object-contain p-4" />
                                    <span
                                        className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full font-display text-xs font-extrabold text-white"
                                        style={{ background: REGIONS[region].color }}
                                    >
                                        {REGIONS[region].code}
                                    </span>
                                </div>
                                <div className="flex flex-1 flex-col p-5">
                                    <h3 className="text-2xl font-extrabold">{region}</h3>
                                    <p className="mt-1 text-sm text-ink-soft">{PROFILE[region].bestFor}</p>

                                    <dl className="mt-5 grid grid-cols-2 gap-2">
                                        <div className="rounded-xl bg-sand p-3">
                                            <dt className="text-[11px] font-bold uppercase tracking-wider text-ink-faint">From</dt>
                                            <dd className="font-display text-lg font-extrabold">{formatAED(from)}</dd>
                                        </div>
                                        <div className="rounded-xl bg-sand p-3">
                                            <dt className="text-[11px] font-bold uppercase tracking-wider text-ink-faint">Flavours</dt>
                                            <dd className="font-display text-lg font-extrabold">{list.length}</dd>
                                        </div>
                                    </dl>

                                    <div className="mt-4 space-y-1.5">
                                        {families.map(([family, count]) => (
                                            <div key={family} className="flex items-center gap-2 text-xs font-semibold">
                                                <span className="w-16 text-ink-soft">{family}</span>
                                                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-sand">
                                                    <span
                                                        className="block h-full rounded-full"
                                                        style={{ width: `${(count / list.length) * 100}%`, background: REGIONS[region].color }}
                                                    />
                                                </span>
                                                <span className="w-5 text-right tabular-nums">{count}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="mt-4 text-xs text-ink-faint">{PROFILE[region].packaging} · 10 packs per carton</p>

                                    <Link
                                        href={listingHref({ category: "terea", region })}
                                        className="mt-5 flex items-center justify-between rounded-full bg-ink px-4 py-3 text-sm font-bold text-white transition hover:bg-ember"
                                    >
                                        Shop {region} <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
