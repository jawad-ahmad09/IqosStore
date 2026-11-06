import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Banknote, Clock, MapPin, Truck } from "lucide-react"
import Breadcrumbs from "@/app/components/collection/Breadcrumbs"
import { EnglishLink } from "@/app/components/ar/ArCollectionView"
import { FaqList } from "@/app/components/collection/CollectionView"
import ProductRail from "@/app/components/home/ProductRail"
import { WhatsAppIcon } from "@/app/components/WhatsAppButton"
import { AR_COLLECTIONS, AR_EMIRATE, AR_REGION, aed, arArea } from "@/app/data/ar"
import { EMIRATE_PAGES, getEmirate, type EmirateInfo } from "@/app/data/emirates"
import { getProducts, priceRange } from "@/app/data/products"
import { STORE, whatsappLink } from "@/app/data/store"
import { DELIVERY } from "@/app/lib/pricing"
import { arPath, arabicMetadata } from "@/app/lib/seo"

type Params = { params: Promise<{ emirate: string }> }

export const dynamicParams = false

export function generateStaticParams() {
    return EMIRATE_PAGES.map((e) => ({ emirate: e.slug }))
}

// Arabic counterpart of /delivery/<emirate> for searches like "ايكوس الشارقة" or "تيريا ابوظبي".
function copyFor(e: EmirateInfo) {
    const name = AR_EMIRATE[e.slug] ?? e.name
    const sameDay = e.slug === "dubai"
    const speed = sameDay ? "توصيل في نفس اليوم للطلبات قبل الساعة 12 ظهراً، وفي اليوم التالي بعد ذلك." : `توصيل في اليوم التالي إلى جميع مناطق ${name}.`
    const areas = e.areas.map(arArea)
    const tereaFrom = aed(priceRange(getProducts({ category: "terea" })).min)
    const faqs = [
        { question: `كم يستغرق توصيل ايكوس وتيريا إلى ${name}؟`, answer: speed },
        {
            question: `كم تكلفة التوصيل إلى ${name}؟`,
            answer: `التوصيل مجاني للطلبات فوق ${aed(DELIVERY.freeFromAmount)}. للطلبات الأقل تكلفة التوصيل ${aed(DELIVERY.fee)} فقط.`,
        },
        {
            question: `هل توصلون إلى ${areas[0]} و${areas[1]}؟`,
            answer: `نعم، نوصل إلى جميع مناطق ${name} ومنها ${areas.slice(0, 6).join("، ")} والمناطق المجاورة.`,
        },
        { question: `هل يمكنني الدفع عند الاستلام في ${name}؟`, answer: "نعم، الدفع نقداً عند الاستلام متاح، وكذلك التحويل البنكي والدفع الإلكتروني." },
        {
            question: `كم سعر كرتونة تيريا في ${name}؟`,
            answer: `أسعار تيريا تبدأ من ${tereaFrom} للكرتونة (200 عود)، وهي نفس الأسعار في جميع الإمارات.`,
        },
    ]
    return { name, speed, areas, faqs, sameDay }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const e = getEmirate((await params).emirate)
    if (!e) return {}
    const { name, sameDay } = copyFor(e)
    return arabicMetadata(
        `/delivery/${e.slug}`,
        `ايكوس وتيريا ${name} — توصيل ${sameDay ? "في نفس اليوم" : "سريع"} | IQOS Store UAE`,
        `اطلب تيريا وأجهزة ايكوس إيلوما وبودات ستيج مع التوصيل إلى ${name}. ${sameDay ? "توصيل في نفس اليوم قبل 12 ظهراً" : "توصيل في اليوم التالي"}، مجاني فوق ${aed(DELIVERY.freeFromAmount)} والدفع عند الاستلام.`,
    )
}

export default async function ArEmiratePage({ params }: Params) {
    const e = getEmirate((await params).emirate)
    if (!e) notFound()
    const { name, speed, areas, faqs, sameDay } = copyFor(e)
    const path = arPath(`/delivery/${e.slug}`)
    const popular = [...getProducts({ category: "terea", region: "Kazakhstan" }), ...getProducts({ category: "terea", region: "Indonesia" })]
        .filter((p) => p.inStock)
        .slice(0, 8)
    const others = EMIRATE_PAGES.filter((o) => o.slug !== e.slug)

    const schemas = [
        {
            "@context": "https://schema.org",
            "@type": "Service",
            name: `توصيل ايكوس وتيريا في ${name}`,
            inLanguage: "ar",
            serviceType: "Home delivery",
            url: `${STORE.url}${path}`,
            provider: { "@id": `${STORE.url}/#store` },
            areaServed: { "@type": "City", name: e.name, containedInPlace: { "@type": "Country", name: "United Arab Emirates" } },
            offers: { "@type": "Offer", priceCurrency: "AED", price: DELIVERY.fee },
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            inLanguage: "ar",
            mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
        },
    ]

    return (
        <>
            {schemas.map((s, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
            ))}

            <section className="grain relative overflow-hidden bg-night text-white">
                <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-ember/40 blur-[110px]" />
                <div className="container-x relative py-8 md:py-14">
                    <div className="flex items-center justify-between gap-3">
                        <Breadcrumbs
                            items={[
                                { name: "التوصيل", href: "/ar/delivery" },
                                { name, href: path },
                            ]}
                            home={{ name: "الرئيسية", href: "/ar" }}
                            light
                        />
                        <EnglishLink href={`/delivery/${e.slug}`} />
                    </div>
                    <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.25] md:text-6xl">توصيل ايكوس وتيريا في {name}</h1>
                    <p className="mt-4 max-w-2xl leading-loose text-white/75 md:text-lg">
                        نوصل تيريا من ستة مناشئ وأجهزة ايكوس إيلوما وإيلوما i وبودات ستيج إلى المنازل والمكاتب في {name}. {speed}
                    </p>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                        <Link href="/ar/terea" className="btn btn-ember">
                            تسوّق تيريا <ArrowLeft size={18} />
                        </Link>
                        <a
                            href={whatsappLink(`مرحباً، أريد الطلب مع التوصيل إلى ${name}.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-ghost text-white hover:bg-white hover:text-ink"
                        >
                            <WhatsAppIcon size={18} /> اطلب عبر واتساب
                        </a>
                    </div>
                </div>
            </section>

            <div className="container-x py-10 md:py-14">
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {[
                        { icon: Clock, title: sameDay ? "في نفس اليوم" : "اليوم التالي", text: sameDay ? "للطلبات قبل الساعة 12 ظهراً" : `إلى جميع مناطق ${name}` },
                        { icon: Truck, title: "رسوم التوصيل", text: `مجاناً فوق ${aed(DELIVERY.freeFromAmount)} · وإلا ${aed(DELIVERY.fee)}` },
                        { icon: Banknote, title: "الدفع عند الاستلام", text: "أو تحويل بنكي / دفع إلكتروني" },
                        { icon: MapPin, title: "من الباب إلى الباب", text: `في أي مكان في ${name}` },
                    ].map(({ icon: Icon, title, text }) => (
                        <div key={title} className="rounded-[1.5rem] border border-line bg-paper p-4 md:p-5">
                            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ember-soft text-ember">
                                <Icon size={20} />
                            </span>
                            <h2 className="mt-3 text-base font-extrabold md:text-lg">{title}</h2>
                            <p className="mt-1 text-sm text-ink-soft">{text}</p>
                        </div>
                    ))}
                </div>

                <section className="mt-14">
                    <h2 className="text-2xl font-extrabold md:text-3xl">مناطق التوصيل في {name}</h2>
                    <ul className="mt-4 flex flex-wrap gap-2">
                        {areas.map((a) => (
                            <li key={a} className="chip">
                                <MapPin size={14} /> {a}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="mt-14">
                    <h2 className="mb-6 text-2xl font-extrabold md:text-4xl">الأكثر طلباً في {name}</h2>
                    <div dir="ltr" lang="en">
                        <ProductRail products={popular} />
                    </div>
                </section>

                <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
                    <section>
                        <h2 className="mb-4 text-2xl font-extrabold md:text-3xl">أسئلة عن التوصيل إلى {name}</h2>
                        <FaqList faqs={faqs} />
                    </section>
                    <section>
                        <h2 className="text-2xl font-extrabold md:text-3xl">تسوّق حسب المجموعة</h2>
                        <ul className="mt-4 flex flex-wrap gap-2">
                            {AR_COLLECTIONS.map((c) => (
                                <li key={c.slug}>
                                    <Link href={arPath(`/${c.slug}`)} className="chip">
                                        {c.region ? `تيريا ${AR_REGION[c.region]}` : c.h1.split(" في ")[0]}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <h2 className="mt-10 text-2xl font-extrabold md:text-3xl">نوصل أيضاً إلى</h2>
                        <ul className="mt-4 flex flex-wrap gap-2">
                            {others.map((o) => (
                                <li key={o.slug}>
                                    <Link href={arPath(`/delivery/${o.slug}`)} className="chip">
                                        <Truck size={14} /> ايكوس {AR_EMIRATE[o.slug] ?? o.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </>
    )
}
