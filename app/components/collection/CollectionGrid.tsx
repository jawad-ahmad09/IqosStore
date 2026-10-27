"use client"

import { useMemo, useState } from "react"
import { SlidersHorizontal } from "lucide-react"
import ProductCard from "../ProductCard"
import type { Product } from "@/app/types"

const SORTS = {
    featured: { label: "Featured", fn: () => 0 },
    "price-asc": { label: "Price: low to high", fn: (a: Product, b: Product) => a.price - b.price },
    "price-desc": { label: "Price: high to low", fn: (a: Product, b: Product) => b.price - a.price },
    name: { label: "Name A–Z", fn: (a: Product, b: Product) => a.name.localeCompare(b.name) },
}
type SortKey = keyof typeof SORTS

// Rendered on the server with every product visible, so search engines see the
// full grid; the filters only narrow it down after hydration.
export default function CollectionGrid({ products }: { products: Product[] }) {
    const [family, setFamily] = useState<string | null>(null)
    const [inStockOnly, setInStockOnly] = useState(false)
    const [sort, setSort] = useState<SortKey>("featured")

    const families = useMemo(() => [...new Set(products.map((p) => p.family))].filter((f) => f !== "Device"), [products])
    const visible = useMemo(
        () =>
            products
                .filter((p) => !family || p.family === family)
                .filter((p) => !inStockOnly || p.inStock)
                .sort(SORTS[sort].fn),
        [products, family, inStockOnly, sort],
    )

    return (
        <div>
            <div className="mb-5 flex flex-wrap items-center gap-2">
                {families.length > 1 && (
                    <div className="no-scrollbar -mx-4 flex w-full items-center gap-2 overflow-x-auto px-4 sm:mx-0 sm:w-auto sm:px-0">
                        <button data-active={!family} onClick={() => setFamily(null)} className="chip !py-1.5 !text-xs">
                            All flavours
                        </button>
                        {families.map((f) => (
                            <button key={f} data-active={family === f} onClick={() => setFamily(family === f ? null : f)} className="chip !py-1.5 !text-xs">
                                {f}
                            </button>
                        ))}
                    </div>
                )}
                <div className="ml-auto flex items-center gap-2">
                    <button data-active={inStockOnly} onClick={() => setInStockOnly((v) => !v)} className="chip !py-1.5 !text-xs">
                        In stock
                    </button>
                    <label className="relative">
                        <SlidersHorizontal size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value as SortKey)}
                            className="field !w-auto appearance-none !rounded-full !py-1.5 pl-8 pr-3 text-xs font-bold"
                            aria-label="Sort products"
                        >
                            {Object.entries(SORTS).map(([key, s]) => (
                                <option key={key} value={key}>
                                    {s.label}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>

            <p className="mb-4 text-sm font-bold text-ink-soft">
                {visible.length} {visible.length === 1 ? "product" : "products"}
            </p>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
                {visible.map((p, i) => (
                    <ProductCard key={p.id} product={p} priority={i < 4} />
                ))}
            </div>
        </div>
    )
}
