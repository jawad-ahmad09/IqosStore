import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, BadgeCheck, Banknote, Clock, MessageCircle } from "lucide-react"
import { EnglishLink } from "@/app/components/ar/ArCollectionView"
import { FaqList } from "@/app/components/collection/CollectionView"
import ProductRail from "@/app/components/home/ProductRail"
import { WhatsAppIcon } from "@/app/components/WhatsAppButton"
import { AR_COLLECTIONS, AR_DELIVERY, AR_REGION, aed } from "@/app/data/ar"
import { getProducts, priceRange, products } from "@/app/data/products"
import { CATEGORIES, REGIONS, STORE, whatsappLink } from "@/app/data/store"
import { DELIVERY } from "@/app/lib/pricing"
import { arabicMetadata, arPath } from "@/app/lib/seo"

const terea = getProducts({ category: "terea" })

export const metadata: Metadata = arabicMetadata(
    "/",
    "ايكوس دبي والإمارات — تيريا وايكوس إيلوما وستيج | توصيل في نفس اليوم",
    `متجر ايكوس إلكتروني في الإمارات: سجائر تيريا الأصلية من إندونيسيا وكازاخستان وأوزبكستان وسويسرا واليابان، أجهزة ايكوس إيلوما وبودات ستيج. توصيل في نفس اليوم داخل دبي، مجاني لطلبين أو أكثر، والدفع عند الاستلام.`,
)

const FAQS = [
    {
        question: "كم يستغرق التوصيل في الإمارات؟",
        answer: "اطلب قبل الساعة 12 ظهراً ليصلك الطلب في نفس اليوم داخل دبي. الطلبات بعد ذلك تصل في اليوم التالي إلى جميع الإمارات.",
    },
    {
        question: "كم تكلفة التوصيل؟",
        answer: `التوصيل مجاني لـ ${DELIVERY.freeFromItems} منتجات أو أكثر في أي مكان في الإمارات. للمنتج الواحد: ${aed(DELIVERY.dubai)} في دبي و${aed(DELIVERY.otherEmirates)} لباقي الإمارات.`,
    },
    {
        question: "ما الفرق بين تيريا إندونيسيا وكازاخستان واليابان؟",
        answer: "جميعها تيريا أصلية وتعمل مع كل أجهزة إيلوما، لكن تختلف تشكيلة النكهات والتغليف والسعر حسب بلد المنشأ. اليابان هي التشكيلة الفاخرة، وإندونيسيا الأوسع تنوعاً، وكازاخستان وأوزبكستان للنكهات الكلاسيكية، وسويسرا للخلطات الأوروبية.",
    },
    {
        question: "هل يمكنني الدفع عند الاستلام؟",
        answer: "نعم، الدفع عند الاستلام متاح، وكذلك التحويل البنكي والدفع الإلكتروني.",
    },
    {
        question: "هل منتجاتكم أصلية؟",
        answer: "نعم، جميع منتجات تيريا وايكوس إيلوما وستيج أصلية 100% وتصل مغلّفة.",
    },
]

export default function ArabicHome() {
    const featured = getProducts({ category: "terea", region: "Kazakhstan" }).filter((p) => p.inStock).slice(0, 4)
    const schemas = [
        {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "ايكوس دبي والإمارات",
            inLanguage: "ar",
            url: `${STORE.url}/ar`,
            isPartOf: { "@id": `${STORE.url}/#website` },
            about: { "@id": `${STORE.url}/#store` },
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            inLanguage: "ar",
            mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
        },
    ]

    return (
        <>
            {schemas.map((s, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
            ))}

            <section className="grain relative overflow-hidden bg-night text-white">
                <div className="animate-glow pointer-events-none absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-ember/40 blur-[120px]" />
                <div className="container-x relative py-12 md:py-20">
                    <div className="flex justify-end">
                        <EnglishLink href="/" />
                    </div>
                    <h1 className="mt-4 max-w-3xl text-[2.5rem] font-extrabold leading-[1.25] sm:text-6xl">
                        كل نكهات تيريا.
                        <br />
                        تصلك <span className="text-ember">اليوم.</span>
                    </h1>
                    <p className="mt-6 max-w-2xl leading-loose text-white/75 md:text-lg">
                        أكثر من {products.length} منتج — تيريا من إندونيسيا وكازاخستان وأوزبكستان وسويسرا واليابان، وأجهزة ايكوس إيلوما وبودات ستيج.
                        توصيل في نفس اليوم داخل دبي، ومجاني لطلبين أو أكثر.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link href="/ar/terea" className="btn btn-ember text-base">
                            تسوّق تيريا <ArrowLeft size={18} />
                        </Link>
                        <a
                            href={whatsappLink("مرحباً، أريد الطلب من متجر ايكوس.")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-ghost text-base text-white hover:bg-white hover:text-ink"
                        >
                            <WhatsAppIcon size={18} /> اطلب عبر واتساب
                        </a>
                    </div>
                    <p className="mt-6 text-sm font-bold text-gold">تيريا من {aed(priceRange(terea).min)} للكرتونة</p>
                </div>
            </section>

            <section className="py-14 md:py-20">
                <div className="container-x">
                    <h2 className="text-3xl font-extrabold md:text-5xl">تسوّق حسب المجموعة</h2>
                    <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                        {AR_COLLECTIONS.filter((c) => c.slug !== "terea").map((c) => {
                            const list = getProducts({ category: c.category, region: c.region })
                            const color = c.region ? REGIONS[c.region].color : CATEGORIES[c.category].color
                            return (
                                <Link
                                    key={c.slug}
                                    href={arPath(`/${c.slug}`)}
                                    className="rounded-[1.5rem] bg-paper p-5 transition hover:-translate-y-1 hover:shadow-lg"
                                    style={{ boxShadow: `inset -4px 0 0 ${color}` }}
                                >
                                    <span className="block text-lg font-extrabold">
                                        {c.region ? `تيريا ${AR_REGION[c.region]}` : c.h1.split(" في ")[0]}
                                    </span>
                                    <span className="mt-1 block text-sm text-ink-soft">
                                        {list.length} منتج · من {aed(priceRange(list).min)}
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-sand-2 py-14 md:py-20">
                <div className="container-x">
                    <div className="mb-6 flex items-end justify-between">
                        <h2 className="text-3xl font-extrabold md:text-4xl">الأكثر طلباً</h2>
                        <Link href="/ar/terea/kazakhstan" className="text-sm font-bold text-ember">
                            عرض الكل
                        </Link>
                    </div>
                    <div dir="ltr" lang="en">
                        <ProductRail products={featured} />
                    </div>
                </div>
            </section>

            <section className="py-14 md:py-20">
                <div className="container-x grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { icon: Clock, title: "توصيل في نفس اليوم", text: "داخل دبي للطلبات قبل الساعة 12 ظهراً، وفي اليوم التالي لباقي الإمارات." },
                        { icon: BadgeCheck, title: "منتجات أصلية 100%", text: "منتجات مغلّفة من موزعين موثوقين. نستبدل أي منتج تالف مجاناً." },
                        { icon: Banknote, title: "الدفع عند الاستلام", text: "ادفع نقداً عند الاستلام أو بالتحويل البنكي أو إلكترونياً." },
                        { icon: MessageCircle, title: "دعم على واتساب 24/7", text: "نساعدك في اختيار النكهة ومتابعة الطلب في أي وقت." },
                    ].map(({ icon: Icon, title, text }) => (
                        <div key={title} className="rounded-[1.5rem] border border-line bg-paper p-5">
                            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ember-soft text-ember">
                                <Icon size={22} />
                            </span>
                            <h3 className="mt-4 text-lg font-extrabold">{title}</h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="pb-16">
                <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <h2 className="mb-4 text-3xl font-extrabold md:text-4xl">أسئلة شائعة</h2>
                        <FaqList faqs={FAQS} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-extrabold md:text-4xl">نوصل إلى</h2>
                        <ul className="mt-4 grid grid-cols-2 gap-2">
                            {AR_DELIVERY.map((e) => (
                                <li key={e.slug} className="rounded-xl bg-paper px-4 py-3 text-sm font-bold">
                                    ايكوس {e.name}
                                </li>
                            ))}
                        </ul>
                        <Link href="/ar/delivery" className="mt-4 inline-block font-bold text-ember">
                            تفاصيل التوصيل ←
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
