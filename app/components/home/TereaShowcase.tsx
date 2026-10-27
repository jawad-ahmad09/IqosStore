"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { getProducts } from "@/app/data/products"
import { REGIONS, listingHref } from "@/app/data/store"
import type { Region } from "@/app/types"
import ProductRail from "./ProductRail"

const REGION_KEYS = Object.keys(REGIONS) as Region[]

export default function TereaShowcase() {
    const [region, setRegion] = useState<Region>("Kazakhstan")
    const list = getProducts({ category: "terea", region })
    const visible = list.filter((p) => p.inStock).slice(0, 8)

    return (
        <section id="terea" className="py-14 md:py-20">
            <div className="container-x">
                <div className="mb-6 flex flex-col justify-between gap-4 md:mb-8 md:flex-row md:items-end">
                    <div>
                        <span className="eyebrow">TEREA heated sticks</span>
                        <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">Flavours by origin</h2>
                    </div>
                    <Link href={listingHref({ category: "terea", region })} className="hidden items-center gap-2 font-bold hover:text-ember md:flex">
                        All {list.length} from {region} <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0" role="tablist">
                    {REGION_KEYS.map((r) => (
                        <button
                            key={r}
                            role="tab"
                            aria-selected={r === region}
                            data-active={r === region}
                            onClick={() => setRegion(r)}
                            className="chip"
                        >
                            <span className="h-2 w-2 rounded-full" style={{ background: r === region ? "#fff" : REGIONS[r].color }} />
                            {r}
                        </button>
                    ))}
                </div>

                <ProductRail key={region} products={visible} />

                <Link href={listingHref({ category: "terea", region })} className="btn btn-ink mt-6 w-full md:hidden">
                    View all {list.length} from {region}
                </Link>
            </div>
        </section>
    )
}
