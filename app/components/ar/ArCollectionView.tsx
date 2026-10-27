import Link from "next/link"
import { Clock, Globe, Tag, Truck } from "lucide-react"
import Breadcrumbs, { type Crumb } from "@/app/components/collection/Breadcrumbs"
import CollectionGrid from "@/app/components/collection/CollectionGrid"
import { FaqList, collectionSchemas } from "@/app/components/collection/CollectionView"
import { AR_COLLECTIONS, AR_REGION, aed, type ArCollection } from "@/app/data/ar"
import { getProducts, priceRange } from "@/app/data/products"
import { CATEGORIES, REGIONS } from "@/app/data/store"
import { DELIVERY } from "@/app/lib/pricing"
import { arPath } from "@/app/lib/seo"

const AR_HOME: Crumb = { name: "الرئيسية", href: "/ar" }

export function ArNav({ active }: { active?: string }) {
    const items = AR_COLLECTIONS.map((c) => ({
        href: arPath(`/${c.slug}`),
        label: c.region ? AR_REGION[c.region] : c.slug === "terea" ? "تيريا" : c.slug === "iqos-iluma" ? "إيلوما" : "ستيج",
        color: c.region ? REGIONS[c.region].color : c.slug === "terea" ? undefined : CATEGORIES[c.category].color,
    }))
    return (
        <nav aria-label="المجموعات" className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
            {items.map((n) => (
                <Link key={n.href} href={n.href} data-active={n.href === active} className="chip">
                    {n.color && <span className="h-2 w-2 rounded-full" style={{ background: n.href === active ? "#fff" : n.color }} />}
                    {n.label}
                </Link>
            ))}
        </nav>
    )
}

export function EnglishLink({ href }: { href: string }) {
    return (
        <Link href={href} lang="en" dir="ltr" className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80 hover:text-white">
            <Globe size={14} /> English
        </Link>
    )
}

export default function ArCollectionView({ collection }: { collection: ArCollection }) {
    const products = getProducts({ category: collection.category, region: collection.region })
    const enPath = `/${collection.slug}`
    const path = arPath(enPath)
    const accent = collection.region ? REGIONS[collection.region].color : CATEGORIES[collection.category].color
    const crumbs: Crumb[] = collection.region
        ? [
              { name: "تيريا", href: "/ar/terea" },
              { name: AR_REGION[collection.region], href: path },
          ]
        : [{ name: collection.h1.split(" في ")[0], href: path }]

    return (
        <>
            {collectionSchemas(path.slice(1), collection.h1, collection.metaDescription, products, collection.faqs).map((s, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...s, inLanguage: "ar" }) }} />
            ))}

            <section className="grain relative overflow-hidden bg-night text-white">
                <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full opacity-40 blur-[110px]" style={{ background: accent }} />
                <div className="container-x relative py-8 md:py-14">
                    <div className="flex items-center justify-between gap-3">
                        <Breadcrumbs items={crumbs} home={AR_HOME} light />
                        <EnglishLink href={enPath} />
                    </div>
                    <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.25] md:text-6xl">{collection.h1}</h1>
                    <p className="mt-4 max-w-2xl text-white/75 md:text-lg">{collection.intro}</p>
                    <div className="mt-6 flex flex-wrap gap-2 text-sm font-bold">
                        <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                            <Tag size={15} className="text-gold" /> {products.length} منتج · من {aed(priceRange(products).min)}
                        </span>
                        <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                            <Clock size={15} className="text-gold" /> توصيل في نفس اليوم داخل دبي قبل 12 ظهراً
                        </span>
                        <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                            <Truck size={15} className="text-gold" /> توصيل مجاني لـ {DELIVERY.freeFromItems} منتجات أو أكثر
                        </span>
                    </div>
                </div>
            </section>

            <div className="container-x py-6 md:py-10">
                <ArNav active={path} />
                <div dir="ltr" lang="en">
                    <CollectionGrid products={products} />
                </div>

                <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
                    <div className="space-y-8">
                        {collection.body.map((b) => (
                            <section key={b.heading}>
                                <h2 className="text-2xl font-extrabold md:text-3xl">{b.heading}</h2>
                                <p className="mt-3 leading-loose text-ink-soft">{b.text}</p>
                            </section>
                        ))}
                    </div>
                    <section>
                        <h2 className="mb-4 text-2xl font-extrabold md:text-3xl">أسئلة شائعة</h2>
                        <FaqList faqs={collection.faqs} />
                        <Link href="/ar/delivery" className="mt-6 inline-block font-bold text-ember">
                            التوصيل إلى جميع الإمارات ←
                        </Link>
                    </section>
                </div>
            </div>
        </>
    )
}
