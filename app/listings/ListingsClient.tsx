"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import ProductCard from "@/app/components/ProductCard"
import { products } from "@/app/data/products"
import { CATEGORIES, REGIONS } from "@/app/data/store"
import type { Category, Product, Region } from "@/app/types"

const CATEGORY_KEYS = Object.keys(CATEGORIES) as Category[]
const REGION_KEYS = Object.keys(REGIONS) as Region[]

const SORTS = {
    featured: { label: "Featured", fn: () => 0 },
    "price-asc": { label: "Price: low to high", fn: (a: Product, b: Product) => a.price - b.price },
    "price-desc": { label: "Price: high to low", fn: (a: Product, b: Product) => b.price - a.price },
    name: { label: "Name A–Z", fn: (a: Product, b: Product) => a.name.localeCompare(b.name) },
}
type SortKey = keyof typeof SORTS

function asCategory(v: string | null): Category | undefined {
    return CATEGORY_KEYS.find((c) => c === v)
}
function asRegion(v: string | null): Region | undefined {
    return REGION_KEYS.find((r) => r.toLowerCase() === v?.toLowerCase())
}

export default function ListingsClient() {
    const router = useRouter()
    const pathname = usePathname()
    const params = useSearchParams()

    const region = asRegion(params.get("region"))
    const category = asCategory(params.get("category")) ?? (region ? "terea" : undefined)
    const query = params.get("q") ?? params.get("search") ?? ""

    const [family, setFamily] = useState<string | null>(null)
    const [inStockOnly, setInStockOnly] = useState(false)
    const [sort, setSort] = useState<SortKey>("featured")
    const [search, setSearch] = useState(query)
    const [prevQuery, setPrevQuery] = useState(query)
    if (query !== prevQuery) {
        // The header search can change ?q= while this page is open.
        setPrevQuery(query)
        setSearch(query)
    }

    const setParams = (next: { category?: Category; region?: Region; q?: string }) => {
        const sp = new URLSearchParams()
        if (next.category) sp.set("category", next.category)
        if (next.region) sp.set("region", next.region)
        if (next.q) sp.set("q", next.q)
        setFamily(null)
        router.replace(sp.size ? `${pathname}?${sp}` : pathname, { scroll: false })
    }

    const scoped = useMemo(
        () => products.filter((p) => (!category || p.category === category) && (!region || p.region === region)),
        [category, region],
    )

    const families = useMemo(() => [...new Set(scoped.map((p) => p.family))].filter((f) => f !== "Device"), [scoped])

    const visible = useMemo(() => {
        const q = search.trim().toLowerCase()
        return scoped
            .filter((p) => !family || p.family === family)
            .filter((p) => !inStockOnly || p.inStock)
            .filter((p) => !q || `${p.name} ${p.region ?? ""} ${p.line ?? ""} ${p.notes} ${p.family}`.toLowerCase().includes(q))
            .sort(SORTS[sort].fn)
    }, [scoped, family, inStockOnly, search, sort])

    const title = region ? `TEREA ${region}` : category ? CATEGORIES[category].label : "All products"
    const blurb = region ? REGIONS[region].blurb : category ? CATEGORIES[category].blurb : "TEREA, IQOS ILUMA and VGOD STIG — all in one place."
    const accent = region ? REGIONS[region].color : category ? CATEGORIES[category].color : "var(--color-ember)"
    const hasFilters = !!(category || region || family || inStockOnly || search)

    return (
        <div className="pb-16">
            <section className="grain relative overflow-hidden bg-night text-white">
                <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full opacity-40 blur-[100px]" style={{ background: accent }} />
                <div className="container-x relative py-10 md:py-14">
                    <span className="eyebrow" style={{ color: accent }}>
                        Shop
                    </span>
                    <h1 className="mt-3 text-4xl font-extrabold md:text-6xl">{title}</h1>
                    <p className="mt-3 max-w-xl text-white/65">{blurb}</p>
                </div>
            </section>

            <div className="sticky top-16 z-30 border-b border-line bg-sand/90 backdrop-blur-xl md:top-[72px]">
                <div className="container-x space-y-3 py-3">
                    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
                        <button data-active={!category} onClick={() => setParams({ q: search })} className="chip">
                            All
                        </button>
                        {CATEGORY_KEYS.map((c) => (
                            <button key={c} data-active={category === c && !region} onClick={() => setParams({ category: c, q: search })} className="chip">
                                {CATEGORIES[c].short}
                            </button>
                        ))}
                        <span className="mx-1 w-px shrink-0 bg-line" />
                        {REGION_KEYS.map((r) => (
                            <button
                                key={r}
                                data-active={region === r}
                                onClick={() => setParams(region === r ? { category: "terea", q: search } : { category: "terea", region: r, q: search })}
                                className="chip"
                            >
                                <span className="h-2 w-2 rounded-full" style={{ background: region === r ? "#fff" : REGIONS[r].color }} />
                                {r}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <label className="relative min-w-0 flex-1 basis-56">
                            <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search flavours, devices…"
                                className="field !rounded-full !py-2.5 pl-10"
                                aria-label="Search products"
                            />
                        </label>
                        <label className="relative">
                            <SlidersHorizontal size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value as SortKey)}
                                className="field !w-auto appearance-none !rounded-full !py-2.5 pl-9 pr-4 text-sm font-bold"
                                aria-label="Sort products"
                            >
                                {Object.entries(SORTS).map(([key, s]) => (
                                    <option key={key} value={key}>
                                        {s.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <button data-active={inStockOnly} onClick={() => setInStockOnly((v) => !v)} className="chip">
                            In stock
                        </button>
                    </div>

                    {families.length > 1 && (
                        <div className="no-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
                            <span className="shrink-0 text-xs font-extrabold uppercase tracking-wider text-ink-faint">Flavour</span>
                            {families.map((f) => (
                                <button
                                    key={f}
                                    data-active={family === f}
                                    onClick={() => setFamily(family === f ? null : f)}
                                    className="chip !py-1.5 !text-xs"
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="container-x pt-6">
                <div className="mb-4 flex items-center justify-between text-sm">
                    <span className="font-bold text-ink-soft">
                        {visible.length} {visible.length === 1 ? "product" : "products"}
                    </span>
                    {hasFilters && (
                        <button
                            onClick={() => {
                                setSearch("")
                                setInStockOnly(false)
                                setParams({})
                            }}
                            className="flex items-center gap-1 font-bold text-ember"
                        >
                            <X size={15} /> Clear filters
                        </button>
                    )}
                </div>

                {visible.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
                        {visible.map((p, i) => (
                            <ProductCard key={p.id} product={p} priority={i < 4} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-[1.5rem] border border-dashed border-line bg-paper px-6 py-16 text-center">
                        <p className="font-display text-xl font-bold">No products match</p>
                        <p className="mt-2 text-ink-soft">Try a different search or clear the filters.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
