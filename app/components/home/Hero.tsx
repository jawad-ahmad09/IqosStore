import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock, ShieldCheck, Truck } from "lucide-react"
import { getProductById, getProducts, priceRange, products } from "@/app/data/products"
import { REGIONS, listingHref, whatsappLink } from "@/app/data/store"
import { formatAED } from "@/app/lib/pricing"
import type { Product } from "@/app/types"
import { WhatsAppIcon } from "../WhatsAppButton"

// Hand-picked hero products; falls back to the first in-stock item of each category.
const HERO_PICKS = ["terea-sun-pearl-japan", "iqos-iluma-i-galaxy-blue", "terea-amber-kazakhstan"]

function heroProducts(): Product[] {
    const picked = HERO_PICKS.map(getProductById).filter((p): p is Product => !!p && p.inStock)
    if (picked.length === 3) return picked
    return (["terea", "iluma", "stig"] as const).map((c) => getProducts({ category: c }).find((p) => p.inStock)!).filter(Boolean)
}

export default function Hero() {
    const picks = heroProducts()
    const tereaFrom = priceRange(getProducts({ category: "terea" })).min
    const tilts = ["-8deg", "0deg", "8deg"]

    return (
        <section className="grain relative overflow-hidden bg-night text-white">
            <div className="animate-glow pointer-events-none absolute -right-32 top-10 h-[28rem] w-[28rem] rounded-full bg-ember/40 blur-[120px]" />
            <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-gold/20 blur-[100px]" />

            <div className="container-x relative grid items-center gap-10 py-12 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:py-24">
                <div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-white/80">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-[#25D366]" />
                        Open now · delivering across the UAE
                    </span>

                    <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">
                        Every TEREA.
                        <br />
                        At your door{" "}
                        <span className="relative whitespace-nowrap text-ember">
                            today.
                            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none" aria-hidden="true">
                                <path d="M2 9C40 3 120 1 198 6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                            </svg>
                        </span>
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                        {products.length}+ products — TEREA from Indonesia, Kazakhstan, Uzbekistan & Japan, plus IQOS ILUMA devices and VGOD STIG
                        pods. Same-day delivery in Dubai, free on 2+ items.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link href={listingHref({ category: "terea" })} className="btn btn-ember text-base">
                            Shop TEREA <ArrowRight size={18} />
                        </Link>
                        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-base text-white hover:bg-white hover:text-ink">
                            <WhatsAppIcon size={18} /> Order on WhatsApp
                        </a>
                    </div>
                    <Link href="/#finder" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-gold hover:text-white">
                        Not sure what to pick? Try the Flavour Finder <ArrowRight size={15} />
                    </Link>

                    <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3">
                        {[
                            { icon: Truck, value: "Same day", label: "in Dubai before 12PM" },
                            { icon: ShieldCheck, value: "100%", label: "authentic stock" },
                            { icon: Clock, value: formatAED(tereaFrom), label: "TEREA from / carton" },
                        ].map(({ icon: Icon, value, label }) => (
                            <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
                                <Icon size={18} className="text-ember" />
                                <dt className="mt-2 font-display text-base font-extrabold md:text-lg">{value}</dt>
                                <dd className="text-[11px] leading-tight text-white/55 md:text-xs">{label}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <div className="relative mx-auto aspect-[6/5] w-full max-w-md sm:max-w-lg lg:max-w-none">
                    <div className="absolute inset-[12%] rounded-full border border-white/10" />
                    <div className="absolute inset-[24%] rounded-full border border-dashed border-white/10" />
                    {picks.map((p, i) => {
                        const layout = [
                            "left-0 top-[16%] w-[38%] z-10 lg:top-[20%] lg:w-[35%]",
                            "left-[27%] top-0 w-[46%] z-20 lg:left-[31%] lg:w-[38%]",
                            "right-0 top-[18%] w-[38%] z-10 lg:top-[22%] lg:w-[35%]",
                        ][i]
                        return (
                            <div key={p.id} className={`absolute ${layout}`}>
                                <Link
                                    href={`/products/${p.id}`}
                                    className="animate-float group relative block"
                                    style={{ "--tilt": tilts[i], animationDelay: `${i * 0.9}s` } as React.CSSProperties}
                                >
                                    <div className="overflow-hidden rounded-[1.4rem] bg-white p-2 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)] ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-[1.04] md:rounded-[1.75rem] md:p-3">
                                        <div className="relative aspect-square">
                                            <Image src={p.images[0]} alt={p.name} fill priority sizes="(min-width: 1024px) 260px, 45vw" className="object-contain" />
                                        </div>
                                        <div className="mt-1 px-1 pb-1 text-ink">
                                            <p className="truncate text-[11px] font-bold md:text-sm">{p.name.replace("IQOS ", "")}</p>
                                            <p className="flex items-center gap-1 text-[10px] text-ink-soft md:text-xs">
                                                {p.region && <span className="h-1.5 w-1.5 rounded-full" style={{ background: REGIONS[p.region].color }} />}
                                                {p.region ?? p.line}
                                            </p>
                                        </div>
                                    </div>
                                    <span
                                        className={`absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 font-display text-xs font-extrabold shadow-lg md:text-sm ${
                                            i === 1 ? "bg-ember text-white" : "bg-night text-white ring-1 ring-white/15"
                                        }`}
                                    >
                                        {formatAED(p.price)}
                                    </span>
                                </Link>
                            </div>
                        )
                    })}
                    <span className="animate-float absolute bottom-[6%] left-[4%] z-30 hidden items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-bold backdrop-blur-md ring-1 ring-white/15 sm:flex" style={{ animationDelay: "1.5s" }}>
                        🚚 Same-day in Dubai
                    </span>
                    <span className="animate-float absolute bottom-[2%] right-[6%] z-30 hidden items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-bold backdrop-blur-md ring-1 ring-white/15 sm:flex" style={{ animationDelay: "0.4s" }}>
                        ✓ 100% authentic
                    </span>
                </div>
            </div>
        </section>
    )
}
