import type { Metadata } from "next"
import Link from "next/link"
import { Truck } from "lucide-react"
import Breadcrumbs from "@/app/components/collection/Breadcrumbs"
import { EnglishLink } from "@/app/components/ar/ArCollectionView"
import { AR_DELIVERY, aed } from "@/app/data/ar"
import { DELIVERY } from "@/app/lib/pricing"
import { arabicMetadata } from "@/app/lib/seo"

export const metadata: Metadata = arabicMetadata(
    "/delivery",
    "توصيل ايكوس وتيريا إلى جميع الإمارات | IQOS Store UAE",
    `نوصل تيريا وأجهزة ايكوس إيلوما وستيج إلى دبي وأبوظبي والشارقة وعجمان ورأس الخيمة والفجيرة وأم القيوين والعين. توصيل مجاني لـ ${DELIVERY.freeFromItems} منتجات أو أكثر والدفع عند الاستلام.`,
)

export default function ArDeliveryPage() {
    return (
        <>
            <section className="grain relative overflow-hidden bg-night text-white">
                <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-ember/40 blur-[110px]" />
                <div className="container-x relative py-8 md:py-14">
                    <div className="flex items-center justify-between gap-3">
                        <Breadcrumbs items={[{ name: "التوصيل", href: "/ar/delivery" }]} home={{ name: "الرئيسية", href: "/ar" }} light />
                        <EnglishLink href="/delivery" />
                    </div>
                    <h1 className="mt-5 text-4xl font-extrabold leading-[1.25] md:text-6xl">التوصيل إلى جميع الإمارات</h1>
                    <p className="mt-4 max-w-2xl text-white/75 md:text-lg">
                        متجر إلكتروني يوصل إلى باب منزلك في كل إمارة. توصيل في نفس اليوم داخل دبي للطلبات قبل الساعة 12 ظهراً، وتوصيل مجاني لـ{" "}
                        {DELIVERY.freeFromItems} منتجات أو أكثر، مع الدفع عند الاستلام.
                    </p>
                </div>
            </section>
            <div className="container-x grid gap-3 py-10 sm:grid-cols-2 lg:grid-cols-4">
                {AR_DELIVERY.map((e) => (
                    <div key={e.slug} className="rounded-[1.5rem] border border-line bg-paper p-5">
                        <h2 className="flex items-center gap-2 text-xl font-extrabold">
                            <Truck size={18} className="text-ember" /> توصيل ايكوس في {e.name}
                        </h2>
                        <p className="mt-2 text-sm text-ink-soft">{e.speed}</p>
                        <p className="mt-3 text-xs font-bold">
                            منتج واحد: {aed(e.fee)} · {DELIVERY.freeFromItems}+ منتجات: مجاناً
                        </p>
                        <Link href={`/delivery/${e.slug}`} lang="en" className="mt-3 inline-block text-xs font-bold text-ember">
                            English →
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}
