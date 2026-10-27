import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getProducts, priceRange } from "@/app/data/products"
import { CATEGORIES, listingHref } from "@/app/data/store"
import { formatAED } from "@/app/lib/pricing"
import type { Category } from "@/app/types"
import ProductRail from "./ProductRail"

const COPY: Partial<Record<Category, { eyebrow: string; title: string; text: string }>> = {
    iluma: {
        eyebrow: "Devices",
        title: "IQOS ILUMA",
        text: "Bladeless SMARTCORE INDUCTION heating — no cleaning, no blade. Prime, One, Standard and the new ILUMA i, including limited editions.",
    },
    stig: {
        eyebrow: "Disposable pods",
        title: "VGOD STIG",
        text: "Pocket-sized, ready out of the box. No charging, no refilling — pick a flavour and go.",
    },
}

export default function CategoryBand({ category, dark = false }: { category: Category; dark?: boolean }) {
    const copy = COPY[category]!
    const list = getProducts({ category })
    const visible = [...list.filter((p) => p.inStock), ...list.filter((p) => !p.inStock)].slice(0, 8)
    const { min } = priceRange(list)

    return (
        <section id={category} className={`relative overflow-hidden py-14 md:py-20 ${dark ? "grain bg-night text-white" : "bg-sand-2"}`}>
            {dark && (
                <div
                    className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full opacity-30 blur-[120px]"
                    style={{ background: CATEGORIES[category].color }}
                />
            )}
            <div className="container-x relative">
                <div className="mb-8 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
                    <div>
                        <span className="eyebrow" style={{ color: dark ? "var(--color-gold)" : CATEGORIES[category].color }}>
                            {copy.eyebrow}
                        </span>
                        <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">{copy.title}</h2>
                        <p className={`mt-3 max-w-2xl ${dark ? "text-white/65" : "text-ink-soft"}`}>{copy.text}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className={`text-sm ${dark ? "text-white/60" : "text-ink-soft"}`}>
                            {list.length} products · from <b className={dark ? "text-white" : "text-ink"}>{formatAED(min)}</b>
                        </span>
                        <Link
                            href={listingHref({ category })}
                            className={`btn hidden md:inline-flex ${dark ? "bg-white text-ink hover:bg-ember hover:text-white" : "btn-ink"}`}
                        >
                            Shop {CATEGORIES[category].short} <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>

                <div className={dark ? "text-ink" : ""}>
                    <ProductRail products={visible} />
                </div>

                <Link
                    href={listingHref({ category })}
                    className={`btn mt-6 w-full md:hidden ${dark ? "bg-white text-ink" : "btn-ink"}`}
                >
                    Shop all {CATEGORIES[category].short}
                </Link>
            </div>
        </section>
    )
}
