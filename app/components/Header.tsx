"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { ChevronDown, Menu, Search, ShoppingBag, X, ArrowRight } from "lucide-react"
import { useCart } from "@/app/context/CartContext"
import { useUI } from "@/app/context/UIContext"
import { getProducts, priceRange, products } from "@/app/data/products"
import { CATEGORIES, REGIONS, STORE, listingHref, whatsappLink } from "@/app/data/store"
import { formatAED } from "@/app/lib/pricing"
import type { Region } from "@/app/types"

const ANNOUNCEMENTS = [
    "Same-day delivery in Dubai — order before 12PM",
    "Free delivery on 2+ items across the UAE",
    "100% authentic TEREA, ILUMA & STIG",
    "Cash on delivery available",
    "WhatsApp support 24/7",
]

export function Logo({ light = false }: { light?: boolean }) {
    return (
        <span className="flex items-center gap-2.5">
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-night md:h-10 md:w-10">
                <span className="absolute h-6 w-6 rounded-full bg-ember blur-md" />
                <span className="relative font-display text-lg font-extrabold text-white">i</span>
            </span>
            <span className="leading-none">
                <span className={`block font-display text-[17px] font-extrabold tracking-tight md:text-lg ${light ? "text-white" : "text-ink"}`}>
                    IQOS STORE
                </span>
                <span className={`block text-[10px] font-bold uppercase tracking-[0.22em] ${light ? "text-white/50" : "text-ink-faint"}`}>
                    Dubai · UAE
                </span>
            </span>
        </span>
    )
}

const regionStats = (Object.keys(REGIONS) as Region[]).map((region) => {
    const list = getProducts({ category: "terea", region })
    return { region, count: list.length, from: priceRange(list).min }
})

function AnnouncementBar() {
    const items = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS]
    return (
        <div className="overflow-hidden bg-night py-2 text-[12px] font-semibold text-white/80">
            <div className="animate-marquee flex w-max gap-10">
                {items.map((text, i) => (
                    <span key={i} className="flex items-center gap-10 whitespace-nowrap">
                        {text}
                        <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                    </span>
                ))}
            </div>
        </div>
    )
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
    const router = useRouter()
    const [query, setQuery] = useState("")

    const results = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return []
        return products
            .filter((p) => `${p.name} ${p.region ?? ""} ${p.line ?? ""} ${p.notes}`.toLowerCase().includes(q))
            .slice(0, 6)
    }, [query])

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        onClose()
        router.push(listingHref({ q: query.trim() || undefined }))
    }

    return (
        <div className="fixed inset-0 z-[120] bg-night/60 backdrop-blur-sm" onClick={onClose}>
            <div className="animate-pop bg-sand shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={submit} className="container-x flex items-center gap-3 py-4">
                    <Search size={20} className="shrink-0 text-ink-soft" />
                    <input
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search TEREA, ILUMA, STIG…"
                        className="min-w-0 flex-1 bg-transparent py-2 font-display text-lg font-semibold outline-none placeholder:text-ink-faint md:text-xl"
                    />
                    <button type="button" onClick={onClose} aria-label="Close search" className="grid h-10 w-10 place-items-center rounded-full hover:bg-sand-2">
                        <X size={20} />
                    </button>
                </form>
                {results.length > 0 && (
                    <div className="container-x grid gap-2 pb-5 sm:grid-cols-2">
                        {results.map((p) => (
                            <Link
                                key={p.id}
                                href={`/products/${p.id}`}
                                onClick={onClose}
                                className="flex items-center gap-3 rounded-2xl bg-paper p-2 pr-4 transition hover:shadow-md"
                            >
                                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white">
                                    <Image src={p.images[0]} alt="" fill sizes="56px" className="object-contain p-1" />
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block truncate text-sm font-bold">{p.name}</span>
                                    <span className="block text-xs text-ink-soft">{p.region ?? p.line}</span>
                                </span>
                                <span className="text-sm font-extrabold">{formatAED(p.price)}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

function MobileMenu({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-[120] lg:hidden">
            <div className="absolute inset-0 bg-night/60 backdrop-blur-sm" onClick={onClose} />
            <div className="animate-slide-in absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col overflow-y-auto bg-sand">
                <div className="flex items-center justify-between border-b border-line p-4">
                    <Logo />
                    <button onClick={onClose} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full bg-paper">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4">
                    <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-ink-faint">TEREA by origin</p>
                    <div className="grid grid-cols-2 gap-2">
                        {regionStats.map(({ region, count, from }) => (
                            <Link
                                key={region}
                                href={listingHref({ category: "terea", region })}
                                onClick={onClose}
                                className="rounded-2xl bg-paper p-3"
                                style={{ boxShadow: `inset 3px 0 0 ${REGIONS[region].color}` }}
                            >
                                <span className="block font-display font-bold">{region}</span>
                                <span className="text-xs text-ink-soft">
                                    {count} flavours · from {formatAED(from)}
                                </span>
                            </Link>
                        ))}
                    </div>

                    <nav className="mt-5 flex flex-col">
                        {[
                            { href: listingHref(), label: "Shop all" },
                            { href: listingHref({ category: "iluma" }), label: "IQOS ILUMA devices" },
                            { href: listingHref({ category: "stig" }), label: "VGOD STIG pods" },
                            { href: "/#finder", label: "Flavour Finder" },
                            { href: "/#faq", label: "FAQ" },
                            { href: "/contact", label: "Contact" },
                        ].map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={onClose}
                                className="flex items-center justify-between border-b border-line py-4 font-display text-lg font-bold"
                            >
                                {link.label}
                                <ArrowRight size={18} className="text-ink-faint" />
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="mt-auto p-4">
                    <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp w-full">
                        Order on WhatsApp
                    </a>
                    <p className="mt-3 text-center text-xs text-ink-soft">WhatsApp {STORE.whatsappDisplay} · 24/7</p>
                </div>
            </div>
        </div>
    )
}

export default function Header() {
    const pathname = usePathname()
    const { count } = useCart()
    const { openCart } = useUI()
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12)
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useEffect(() => {
        document.body.style.overflow = menuOpen || searchOpen ? "hidden" : ""
        return () => {
            document.body.style.overflow = ""
        }
    }, [menuOpen, searchOpen])

    const navLink = (href: string, label: string, active: boolean) => (
        <Link
            href={href}
            className={`relative rounded-full px-3.5 py-2 text-sm font-bold transition-colors hover:bg-sand-2 ${active ? "text-ember" : "text-ink"}`}
        >
            {label}
        </Link>
    )

    return (
        <>
            <AnnouncementBar />
            <header
                className={`sticky top-0 z-[90] border-b transition-all duration-300 ${
                    scrolled ? "border-line bg-sand/85 backdrop-blur-xl" : "border-transparent bg-sand"
                }`}
            >
                <div className="container-x flex h-16 items-center justify-between gap-4 md:h-[72px]">
                    <Link href="/" aria-label={`${STORE.name} home`}>
                        <Logo />
                    </Link>

                    <nav className="hidden items-center gap-1 lg:flex">
                        {navLink(listingHref(), "Shop all", pathname === "/listings")}
                        <div className="group relative">
                            <Link
                                href={listingHref({ category: "terea" })}
                                className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-bold transition-colors hover:bg-sand-2"
                            >
                                TEREA <ChevronDown size={15} className="transition-transform group-hover:rotate-180" />
                            </Link>
                            <div className="invisible absolute left-1/2 top-full w-[440px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                                <div className="grid grid-cols-2 gap-2 rounded-3xl border border-line bg-paper p-3 shadow-2xl">
                                    {regionStats.map(({ region, count, from }) => (
                                        <Link
                                            key={region}
                                            href={listingHref({ category: "terea", region })}
                                            className="group/r rounded-2xl p-3 transition hover:bg-sand"
                                        >
                                            <span className="flex items-center gap-2 font-display font-bold">
                                                <span className="h-2.5 w-2.5 rounded-full" style={{ background: REGIONS[region].color }} />
                                                {region}
                                            </span>
                                            <span className="mt-1 block text-xs text-ink-soft">
                                                {count} flavours · from {formatAED(from)}
                                            </span>
                                        </Link>
                                    ))}
                                    <Link
                                        href={listingHref({ category: "terea" })}
                                        className="col-span-2 flex items-center justify-between rounded-2xl bg-night px-4 py-3 text-sm font-bold text-white"
                                    >
                                        View all TEREA <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {navLink(listingHref({ category: "iluma" }), CATEGORIES.iluma.short, false)}
                        {navLink(listingHref({ category: "stig" }), CATEGORIES.stig.short, false)}
                        {navLink("/#finder", "Flavour Finder", false)}
                        {navLink("/#faq", "FAQ", false)}
                        {navLink("/contact", "Contact", pathname === "/contact")}
                    </nav>

                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={() => setSearchOpen(true)}
                            aria-label="Search products"
                            className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-sand-2"
                        >
                            <Search size={20} />
                        </button>
                        <button
                            onClick={openCart}
                            data-cart-target
                            aria-label={`Open cart, ${count} items`}
                            className="group relative flex h-10 items-center gap-2 rounded-full bg-ink pl-3 pr-3.5 text-sm font-bold text-white transition hover:bg-ember"
                        >
                            <ShoppingBag size={18} />
                            <span className="hidden sm:inline">Cart</span>
                            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-ember px-1 text-[11px] font-extrabold transition group-hover:bg-ink">
                                {count}
                            </span>
                        </button>
                        <button
                            onClick={() => setMenuOpen(true)}
                            aria-label="Open menu"
                            className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-sand-2 lg:hidden"
                        >
                            <Menu size={22} />
                        </button>
                    </div>
                </div>
            </header>

            {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
            {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
        </>
    )
}
