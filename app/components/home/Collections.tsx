import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { getProducts, priceRange } from "@/app/data/products"
import { CATEGORIES, REGIONS, listingHref } from "@/app/data/store"
import { formatAED } from "@/app/lib/pricing"
import type { Product, Region } from "@/app/types"

interface Tile {
    title: string
    subtitle: string
    href: string
    color: string
    list: Product[]
}

export default function Collections() {
    const tiles: Tile[] = [
        ...(Object.keys(REGIONS) as Region[]).map((region) => ({
            title: `TEREA ${region}`,
            subtitle: REGIONS[region].blurb,
            href: listingHref({ category: "terea", region }),
            color: REGIONS[region].color,
            list: getProducts({ category: "terea", region }),
        })),
        {
            title: "IQOS ILUMA",
            subtitle: CATEGORIES.iluma.blurb,
            href: listingHref({ category: "iluma" }),
            color: CATEGORIES.iluma.color,
            list: getProducts({ category: "iluma" }),
        },
        {
            title: "VGOD STIG",
            subtitle: CATEGORIES.stig.blurb,
            href: listingHref({ category: "stig" }),
            color: CATEGORIES.stig.color,
            list: getProducts({ category: "stig" }),
        },
    ]

    return (
        <section className="py-14 md:py-20">
            <div className="container-x">
                <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
                    <div>
                        <span className="eyebrow">Shop by collection</span>
                        <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">Pick your origin</h2>
                    </div>
                    <p className="max-w-sm text-ink-soft">
                        Each TEREA origin has its own flavours and packaging. Prices are per carton of 10 packs.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-6">
                    {tiles.map((tile, i) => {
                        // 6-column grid: 3 tiles on the first row, then pairs, so any tile count stays balanced.
                        const span = i < 3 ? "lg:col-span-2" : "lg:col-span-3"
                        const lastAlone = tiles.length % 2 === 1 && i === tiles.length - 1
                        const showcase = tile.list.filter((p) => p.inStock).slice(0, 3)
                        const from = priceRange(tile.list).min
                        return (
                            <Link
                                key={tile.title}
                                href={tile.href}
                                className={`group relative flex flex-col overflow-hidden rounded-[1.5rem] bg-paper p-4 ${span} ${lastAlone ? "col-span-2" : ""} transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgb(23_19_15/0.4)] md:p-6`}
                            >
                                <span
                                    className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-15 blur-2xl transition-opacity group-hover:opacity-30"
                                    style={{ background: tile.color }}
                                />
                                <div className="relative flex items-start justify-between gap-2">
                                    <div>
                                        <span className="mb-2 block h-1.5 w-8 rounded-full" style={{ background: tile.color }} />
                                        <h3 className="text-base font-extrabold leading-tight md:text-2xl">{tile.title}</h3>
                                        <p className="mt-1 hidden text-sm text-ink-soft md:block">{tile.subtitle}</p>
                                    </div>
                                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sand transition-all group-hover:bg-ink group-hover:text-white md:h-11 md:w-11">
                                        <ArrowUpRight size={18} />
                                    </span>
                                </div>

                                <div className="relative mt-4 flex h-24 items-end justify-center md:h-40">
                                    {showcase.map((p, i) => (
                                        <div
                                            key={p.id}
                                            className="relative -mx-2 aspect-square h-full transition-transform duration-500 md:-mx-4"
                                            style={{
                                                transform: `rotate(${(i - 1) * 8}deg) translateY(${i === 1 ? "-6px" : "4px"})`,
                                                zIndex: i === 1 ? 2 : 1,
                                            }}
                                        >
                                            <Image src={p.images[0]} alt="" fill sizes="160px" className="rounded-2xl bg-white object-contain p-1 shadow-md" />
                                        </div>
                                    ))}
                                </div>

                                <div className="relative mt-4 flex flex-col text-xs font-bold sm:flex-row sm:items-center sm:justify-between md:text-sm">
                                    <span className="text-ink-soft">{tile.list.length} products</span>
                                    <span className="whitespace-nowrap">from {formatAED(from)}</span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
