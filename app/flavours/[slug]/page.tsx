import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import Breadcrumbs from "@/app/components/collection/Breadcrumbs"
import { FaqList, collectionSchemas } from "@/app/components/collection/CollectionView"
import CollectionGrid from "@/app/components/collection/CollectionGrid"
import { FLAVOURS, flavourSummary, getFlavour, type Flavour } from "@/app/data/flavours"
import { REGIONS } from "@/app/data/store"
import { formatAED } from "@/app/lib/pricing"

type Params = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
    return FLAVOURS.map((f) => ({ slug: f.slug }))
}

const join = (items: string[]) => (items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`)

function copyFor(f: Flavour) {
    const { min, max, regions, families, cheapest } = flavourSummary(f)
    const priceText = min === max ? formatAED(min) : `${formatAED(min)} to ${formatAED(max)}`
    const title = `TEREA ${f.name} Dubai — ${join(regions)} Compared`
    const description = `Compare TEREA ${f.name} from ${join(regions)}: taste notes, prices (${priceText} per carton) and stock. Buy TEREA ${f.name} in Dubai & UAE with same-day delivery.`
    const faqs = [
        {
            question: `How much is TEREA ${f.name} in Dubai?`,
            answer: `TEREA ${f.name} costs ${priceText} per carton (200 sticks) depending on origin. ${f.products.map((p) => `${p.region}: ${formatAED(p.price)}`).join(", ")}.`,
        },
        {
            question: `Which TEREA ${f.name} should I buy?`,
            answer: `All versions fit every IQOS ILUMA. ${f.products.map((p) => `The ${p.region} version is ${p.notes.toLowerCase() || p.family.toLowerCase()}`).join(". ")}. The best value is ${cheapest.region} at ${formatAED(cheapest.price)}.`,
        },
        {
            question: `Is TEREA ${f.name} menthol?`,
            answer:
                families.length === 1
                    ? families[0] === "Menthol"
                        ? `Yes — TEREA ${f.name} is a menthol stick in every origin we stock.`
                        : families[0] === "Capsule"
                          ? `TEREA ${f.name} has a click capsule in the filter that changes the flavour when pressed.`
                          : `No — TEREA ${f.name} is a tobacco stick without menthol.`
                    : `It depends on the origin: ${f.products.map((p) => `${p.region} is ${p.family.toLowerCase()}`).join(", ")}.`,
        },
    ]
    return { title, description, faqs, priceText, regions }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const f = getFlavour((await params).slug)
    if (!f) return {}
    const { title, description } = copyFor(f)
    return { title: { absolute: `${title} | IQOS Store UAE` }, description, alternates: { canonical: `/flavours/${f.slug}` } }
}

export default async function FlavourPage({ params }: Params) {
    const f = getFlavour((await params).slug)
    if (!f) notFound()
    const { faqs, priceText, regions } = copyFor(f)
    const others = FLAVOURS.filter((o) => o.slug !== f.slug)

    return (
        <>
            {collectionSchemas(`flavours/${f.slug}`, `TEREA ${f.name}`, `TEREA ${f.name} from ${join(regions)}`, f.products, faqs).map((s, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
            ))}
            <div className="container-x py-8 md:py-14">
                <Breadcrumbs items={[{ name: "Flavours", href: "/flavours" }, { name: `TEREA ${f.name}`, href: `/flavours/${f.slug}` }]} />
                <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-6xl">TEREA {f.name} in Dubai</h1>
                <p className="mt-4 max-w-2xl text-ink-soft md:text-lg">
                    We stock TEREA {f.name} from {f.products.length} origins — {join(regions)}. Same flavour name, slightly different blends and
                    prices ({priceText}). Compare them side by side and pick your favourite.
                </p>

                <div className="mt-8 overflow-x-auto rounded-[1.5rem] border border-line bg-paper">
                    <table className="w-full min-w-[640px] text-left text-sm">
                        <thead className="border-b border-line text-xs uppercase tracking-wider text-ink-faint">
                            <tr>
                                <th className="px-4 py-3">Origin</th>
                                <th className="px-4 py-3">Taste</th>
                                <th className="px-4 py-3">Type</th>
                                <th className="px-4 py-3">Price / carton</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                            {f.products.map((p) => (
                                <tr key={p.id}>
                                    <td className="px-4 py-3">
                                        <Link href={`/products/${p.id}`} className="flex items-center gap-3 font-bold">
                                            <span className="plate relative h-12 w-12 shrink-0 overflow-hidden rounded-xl" style={{ "--tint": REGIONS[p.region!].color } as React.CSSProperties}>
                                                <Image src={p.images[0]} alt={`${p.name} ${p.region}`} fill sizes="48px" className="object-contain p-1" />
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <span className="h-2 w-2 rounded-full" style={{ background: REGIONS[p.region!].color }} />
                                                {p.region}
                                            </span>
                                        </Link>
                                    </td>
                                    <td className="px-4 py-3 text-ink-soft">{p.notes}</td>
                                    <td className="px-4 py-3">{p.family}{p.intensity ? ` · ${p.intensity}` : ""}</td>
                                    <td className="px-4 py-3 font-display font-extrabold">{formatAED(p.price)}</td>
                                    <td className="px-4 py-3 text-right">
                                        <Link href={`/products/${p.id}`} className={`rounded-full px-3 py-1.5 text-xs font-bold ${p.inStock ? "bg-ink text-white" : "border border-line text-ink-soft"}`}>
                                            {p.inStock ? "View" : "Sold out"}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <section className="mt-12">
                    <CollectionGrid products={f.products} />
                </section>

                <div className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
                    <section>
                        <h2 className="mb-4 text-2xl font-extrabold md:text-3xl">TEREA {f.name} questions</h2>
                        <FaqList faqs={faqs} />
                    </section>
                    <section>
                        <h2 className="text-2xl font-extrabold md:text-3xl">More flavours to compare</h2>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {others.map((o) => (
                                <Link key={o.slug} href={`/flavours/${o.slug}`} className="chip">
                                    TEREA {o.name}
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
