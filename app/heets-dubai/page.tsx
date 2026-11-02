import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Breadcrumbs from "@/app/components/collection/Breadcrumbs"
import { FaqList } from "@/app/components/collection/CollectionView"
import ProductRail from "@/app/components/home/ProductRail"
import { getProductById, getProducts, priceRange } from "@/app/data/products"
import { ORIGIN_LIST, REGIONS, listingHref } from "@/app/data/store"
import { DELIVERY, FREE_DELIVERY_RULE, formatAED } from "@/app/lib/pricing"
import { OG_IMAGE } from "@/app/lib/seo"
import { HEETS_MATCHES } from "@/app/data/heets"
import type { Product, Region } from "@/app/types"

// Many UAE shoppers search "HEETS" when they mean TEREA (the ILUMA stick). This page
// answers that search honestly: what HEETS are, why ILUMA needs TEREA, and where to shop.
const terea = getProducts({ category: "terea" })
const from = formatAED(priceRange(terea).min)

export const metadata: Metadata = {
    title: { absolute: `HEETS Dubai — TEREA Sticks for IQOS ILUMA from ${from}` },
    description: `Looking for HEETS in Dubai? IQOS ILUMA needs TEREA. Buy every TEREA flavour from ${from}, same-day delivery in Dubai, free over AED ${DELIVERY.freeFromAmount}.`,
    alternates: { canonical: "/heets-dubai" },
    openGraph: { title: "HEETS Dubai & UAE — TEREA for IQOS ILUMA", url: "/heets-dubai", images: OG_IMAGE },
}


const faqs = [
    {
        question: "Can I buy HEETS in Dubai?",
        answer: "HEETS are made for older IQOS devices such as the IQOS 3 DUO and IQOS ORIGINALS. Most smokers in the UAE now use IQOS ILUMA, which only works with TEREA — so that's what we stock, in every popular flavour.",
    },
    {
        question: "Do HEETS work in IQOS ILUMA?",
        answer: "No. ILUMA heats from the inside with induction and needs TEREA sticks, which have a metal heating element inside. HEETS have no element, so they won't heat in an ILUMA — and pushing them in can damage the device.",
    },
    {
        question: "Is TEREA the same as HEETS?",
        answer: "They're both heated tobacco sticks from the same family, and most flavours have a TEREA equivalent (Amber, Silver, Turquoise, Purple Wave, Yellow…). But they're built for different devices and aren't interchangeable.",
    },
    {
        question: "How much is TEREA in Dubai?",
        answer: `TEREA starts at ${from} per carton of 200 sticks in our store. Delivery is free on ${FREE_DELIVERY_RULE}, with same-day delivery in Dubai before 12PM.`,
    },
]

export default function HeetsDubaiPage() {
    const matches = HEETS_MATCHES.map(({ heets, terea, productId }) => ({ heets, name: terea, product: getProductById(productId) })).filter(
        (m): m is { heets: string; name: string; product: Product } => !!m.product,
    )
    const popular = matches.map((m) => m.product).filter((p) => p.inStock)
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <section className="grain relative overflow-hidden bg-night text-white">
                <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-ember/40 blur-[110px]" />
                <div className="container-x relative py-8 md:py-14">
                    <Breadcrumbs items={[{ name: "HEETS Dubai", href: "/heets-dubai" }]} light />
                    <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] md:text-6xl">HEETS in Dubai? Here&apos;s what your ILUMA needs</h1>
                    <p className="mt-4 max-w-2xl text-white/70 md:text-lg">
                        If you use an IQOS ILUMA, the sticks you want are <strong className="text-white">TEREA</strong> — the newer version of HEETS. We
                        deliver TEREA from {ORIGIN_LIST} across the UAE, from {from} per carton.
                    </p>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                        <Link href="/terea" className="btn btn-ember">
                            Shop TEREA <ArrowRight size={18} />
                        </Link>
                        <Link href="/terea-price-uae" className="btn btn-ghost text-white hover:bg-white hover:text-ink">
                            TEREA price list
                        </Link>
                    </div>
                </div>
            </section>

            <div className="container-x py-10 md:py-14">
                <section>
                    <h2 className="text-2xl font-extrabold md:text-4xl">Your HEETS flavour, in TEREA</h2>
                    <p className="mt-2 max-w-2xl text-ink-soft">Most HEETS favourites have a TEREA match. Tap one to order it.</p>
                    <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                        {matches.map((m) => (
                            <Link
                                key={m.heets}
                                href={`/products/${m.product.id}`}
                                className="rounded-[1.25rem] border border-line bg-paper p-3 transition hover:-translate-y-0.5 hover:shadow-lg md:p-4"
                            >
                                <span className="block text-sm text-ink-soft line-through decoration-ink-faint">{m.heets}</span>
                                <span className="mt-1 block font-display font-extrabold md:text-lg">→ {m.name}</span>
                                <span className="mt-1 block text-xs font-bold text-ember md:text-sm">
                                    {m.product.region} · {formatAED(m.product.price)}
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>

                {popular.length > 0 && (
                    <section className="mt-14">
                        <h2 className="mb-6 text-2xl font-extrabold md:text-4xl">Popular TEREA in Dubai</h2>
                        <ProductRail products={popular} />
                    </section>
                )}

                <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
                    <section className="space-y-4 leading-relaxed text-ink-soft">
                        <h2 className="text-2xl font-extrabold text-ink md:text-3xl">HEETS vs TEREA in one minute</h2>
                        <p>
                            HEETS were made for the older IQOS with a heating blade. IQOS ILUMA replaced the blade with SMARTCORE INDUCTION, so its sticks —
                            TEREA — carry their own metal heater inside. That means no blade to clean and no tobacco residue, but it also means the two
                            sticks can&apos;t be swapped.
                        </p>
                        <p>
                            Shop TEREA by origin:{" "}
                            {(Object.keys(REGIONS) as Region[]).map((r, i, all) => (
                                <span key={r}>
                                    <Link href={listingHref({ category: "terea", region: r })} className="font-bold text-ink underline underline-offset-4">
                                        {r}
                                    </Link>
                                    {i < all.length - 1 ? ", " : "."}
                                </span>
                            ))}{" "}
                            Need a device? See <Link href="/iqos-iluma-i" className="font-bold text-ink underline underline-offset-4">IQOS ILUMA i</Link>.
                        </p>
                        <Link href="/guides/heets-vs-terea" className="inline-flex items-center gap-2 font-bold text-ember">
                            Read the full HEETS vs TEREA guide <ArrowRight size={16} />
                        </Link>
                    </section>
                    <section>
                        <h2 className="mb-4 text-2xl font-extrabold md:text-3xl">HEETS questions</h2>
                        <FaqList faqs={faqs} />
                    </section>
                </div>
            </div>
        </>
    )
}
