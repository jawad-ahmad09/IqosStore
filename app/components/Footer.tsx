import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { EMIRATE_PAGES } from "@/app/data/emirates"
import { POLICIES } from "@/app/data/policies"
import { CATEGORIES, REGIONS, STORE, listingHref, whatsappLink } from "@/app/data/store"
import type { Region } from "@/app/types"
import { Logo } from "./Header"
import { WhatsAppIcon } from "./WhatsAppButton"

export default function Footer() {
    const linkClass = "text-sm text-white/60 transition hover:text-white"

    return (
        <footer className="grain relative overflow-hidden bg-night pb-24 text-white md:pb-0">
            <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-ember/20 blur-3xl" />

            <div className="container-x relative">
                <div className="flex flex-col items-start justify-between gap-6 border-b border-line-dark py-12 md:flex-row md:items-center">
                    <div>
                        <h2 className="text-3xl font-extrabold md:text-4xl">
                            Need help choosing a flavour?
                        </h2>
                        <p className="mt-2 text-white/60">Message us — we reply in minutes, day or night.</p>
                    </div>
                    <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp shrink-0 text-base">
                        <WhatsAppIcon size={20} /> Chat on WhatsApp
                    </a>
                </div>

                <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
                    <div className="col-span-2 md:col-span-1">
                        <Logo light />
                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
                            Authentic TEREA, IQOS ILUMA and VGOD STIG with same-day delivery across Dubai and fast delivery to every emirate.
                        </p>
                        <ul className="mt-5 space-y-2.5">
                            <li>
                                <a href={STORE.phoneHref} className={`${linkClass} flex items-center gap-2`}>
                                    <Phone size={15} /> {STORE.phone}
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${STORE.email}`} className={`${linkClass} flex items-center gap-2`}>
                                    <Mail size={15} /> {STORE.email}
                                </a>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-white/60">
                                <MapPin size={15} /> Dubai, United Arab Emirates
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.16em] text-white/40">TEREA</h3>
                        <ul className="space-y-2.5">
                            {(Object.keys(REGIONS) as Region[]).map((region) => (
                                <li key={region}>
                                    <Link href={listingHref({ category: "terea", region })} className={`${linkClass} flex items-center gap-2`}>
                                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: REGIONS[region].color }} />
                                        TEREA {region}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.16em] text-white/40">Shop</h3>
                        <ul className="space-y-2.5">
                            <li><Link href={listingHref()} className={linkClass}>All products</Link></li>
                            <li><Link href={listingHref({ category: "iluma" })} className={linkClass}>{CATEGORIES.iluma.label}</Link></li>
                            <li><Link href={listingHref({ category: "stig" })} className={linkClass}>{CATEGORIES.stig.label}</Link></li>
                            <li><Link href="/terea-price-uae" className={linkClass}>TEREA price list</Link></li>
                            <li><Link href="/flavours" className={linkClass}>Flavours compared</Link></li>
                            <li><Link href="/checkout" className={linkClass}>Checkout</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.16em] text-white/40">Help</h3>
                        <ul className="space-y-2.5">
                            <li><Link href="/delivery" className={linkClass}>Delivery areas</Link></li>
                            <li><Link href="/guides" className={linkClass}>Guides</Link></li>
                            <li><Link href="/ar" lang="ar" className={linkClass} style={{ fontFamily: "Tahoma, Arial, sans-serif" }}>العربية</Link></li>
                            <li><Link href="/#faq" className={linkClass}>FAQ</Link></li>
                            <li><Link href="/contact" className={linkClass}>Contact us</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-line-dark py-6">
                    <h3 className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-white/40">We deliver to</h3>
                    <ul className="flex flex-wrap gap-x-5 gap-y-2">
                        {EMIRATE_PAGES.map((e) => (
                            <li key={e.slug}>
                                <Link href={`/delivery/${e.slug}`} className={linkClass}>
                                    IQOS & TEREA {e.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="border-t border-line-dark py-6">
                    <ul className="flex flex-wrap gap-x-5 gap-y-2">
                        {POLICIES.map((p) => (
                            <li key={p.slug}>
                                <Link href={`/policies/${p.slug}`} className={linkClass}>
                                    {p.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col gap-2 border-t border-line-dark py-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
                    <p>© {new Date().getFullYear()} {STORE.name}. All rights reserved.</p>
                    <p>For adults 18+ only. Tobacco and nicotine products are addictive and harmful to health.</p>
                </div>
            </div>
        </footer>
    )
}
