import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import Breadcrumbs from "@/app/components/collection/Breadcrumbs"
import { EnglishLink } from "@/app/components/ar/ArCollectionView"
import CollectionGrid from "@/app/components/collection/CollectionGrid"
import { FaqList, collectionSchemas } from "@/app/components/collection/CollectionView"
import { AR_FAMILY, AR_REGION, aed, arFlavour } from "@/app/data/ar"
import { FLAVOURS, flavourSummary, getFlavour, type Flavour } from "@/app/data/flavours"
import { REGIONS } from "@/app/data/store"
import { arPath, arabicMetadata } from "@/app/lib/seo"

type Params = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
    return FLAVOURS.map((f) => ({ slug: f.slug }))
}

const joinAr = (items: string[]) => (items.length < 2 ? items.join("") : `${items.slice(0, -1).join("، ")} و${items[items.length - 1]}`)
const family = (f: string) => AR_FAMILY[f] ?? f

// Arabic counterpart of /flavours/<slug>: one TEREA flavour compared across origins, priced from the catalogue.
function copyFor(f: Flavour) {
    const { min, max, regions, families, cheapest } = flavourSummary(f)
    const name = `تيريا ${arFlavour(f.name)}`
    const regionsAr = regions.map((r) => AR_REGION[r])
    const priceText = min === max ? aed(min) : `${min}–${max} درهم`
    const faqs = [
        {
            question: `كم سعر ${name} في دبي؟`,
            answer: `سعر ${name} ${priceText} للكرتونة (200 عود) حسب بلد المنشأ: ${f.products.map((p) => `${AR_REGION[p.region!]} ${aed(p.price)}`).join("، ")}.`,
        },
        {
            question: `أي ${name} أختار؟`,
            answer: `جميع الإصدارات تعمل مع كل أجهزة ايكوس إيلوما وإيلوما i. الفرق في بلد المنشأ ولغة العلبة والسعر، وقد يلاحظ البعض فرقاً بسيطاً في الطعم. الأوفر سعراً هو إصدار ${AR_REGION[cheapest.region!]} بسعر ${aed(cheapest.price)}.`,
        },
        {
            question: `هل ${name} بنكهة المنثول؟`,
            answer:
                families.length === 1
                    ? families[0] === "Menthol"
                        ? `نعم، ${name} بنكهة المنثول في جميع المناشئ المتوفرة لدينا.`
                        : families[0] === "Capsule"
                          ? `${name} يحتوي على كبسولة في الفلتر تضغط عليها لتغيير النكهة أثناء الاستخدام.`
                          : `لا، ${name} تبغ بدون منثول.`
                    : `يختلف حسب المنشأ: ${f.products.map((p) => `${AR_REGION[p.region!]}: ${family(p.family)}`).join("، ")}.`,
        },
        {
            question: `هل توصلون ${name} خارج دبي؟`,
            answer: "نعم، نوصل إلى جميع الإمارات. التوصيل في نفس اليوم داخل دبي للطلبات قبل 12 ظهراً، وفي اليوم التالي لباقي الإمارات.",
        },
    ]
    return { name, regionsAr, priceText, faqs, min }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const f = getFlavour((await params).slug)
    if (!f) return {}
    const { name, regionsAr, priceText, min } = copyFor(f)
    return arabicMetadata(
        `/flavours/${f.slug}`,
        `${name} دبي — ${regionsAr.length} مناشئ من ${aed(min)} للكرتونة`,
        `قارن ${name} من ${joinAr(regionsAr)}: الطعم والسعر (${priceText}) والتوفر. توصيل في نفس اليوم في دبي والدفع عند الاستلام.`,
    )
}

export default async function ArFlavourPage({ params }: Params) {
    const f = getFlavour((await params).slug)
    if (!f) notFound()
    const { name, regionsAr, priceText, faqs } = copyFor(f)
    const path = arPath(`/flavours/${f.slug}`)
    const others = FLAVOURS.filter((o) => o.slug !== f.slug)

    return (
        <>
            {collectionSchemas(path.slice(1), name, `${name} من ${joinAr(regionsAr)}`, f.products, faqs).map((s, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
            ))}
            <div className="container-x py-8 md:py-14">
                <div className="flex items-center justify-between gap-3">
                    <Breadcrumbs items={[{ name: "تيريا", href: "/ar/terea" }, { name, href: path }]} home={{ name: "الرئيسية", href: "/ar" }} />
                    <EnglishLink href={`/flavours/${f.slug}`} />
                </div>
                <h1 className="mt-5 text-4xl font-extrabold leading-[1.25] md:text-6xl">{name} في دبي والإمارات</h1>
                <p className="mt-4 max-w-2xl leading-loose text-ink-soft md:text-lg">
                    نوفر {name} من {f.products.length} مناشئ: {joinAr(regionsAr)}. نفس اسم النكهة لكن بإصدارات وأسعار مختلفة ({priceText} للكرتونة). قارن بينها
                    واختر الأنسب لك.
                </p>

                <div className="mt-8 overflow-x-auto rounded-[1.5rem] border border-line bg-paper">
                    <table className="w-full min-w-[560px] text-right text-sm">
                        <thead className="border-b border-line text-xs text-ink-faint">
                            <tr>
                                <th className="px-4 py-3">المنشأ</th>
                                <th className="px-4 py-3">النوع</th>
                                <th className="px-4 py-3">السعر للكرتونة</th>
                                <th className="px-4 py-3">التوفر</th>
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
                                            {name} {AR_REGION[p.region!]}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-3">{family(p.family)}</td>
                                    <td className="px-4 py-3 font-extrabold">{aed(p.price)}</td>
                                    <td className="px-4 py-3">{p.inStock ? "متوفر" : "نفد من المخزون"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <section className="mt-12" dir="ltr" lang="en">
                    <CollectionGrid products={f.products} />
                </section>

                <div className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
                    <section>
                        <h2 className="mb-4 text-2xl font-extrabold md:text-3xl">أسئلة عن {name}</h2>
                        <FaqList faqs={faqs} />
                    </section>
                    <section>
                        <h2 className="text-2xl font-extrabold md:text-3xl">قارن نكهات أخرى</h2>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {others.map((o) => (
                                <Link key={o.slug} href={arPath(`/flavours/${o.slug}`)} className="chip">
                                    تيريا {arFlavour(o.name)}
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
