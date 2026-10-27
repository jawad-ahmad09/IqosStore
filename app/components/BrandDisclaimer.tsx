"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShieldCheck } from "lucide-react"
import { DISCLAIMER, DISCLAIMER_AR } from "@/app/data/policies"

// Prominent "independent retailer" notice: shown site-wide above the footer and,
// in compact form, on product pages next to the product images and brand names.
export default function BrandDisclaimer({ compact = false }: { compact?: boolean }) {
    const arabic = usePathname().startsWith("/ar")

    const body = (
        <div
            lang={arabic ? "ar" : "en"}
            dir={arabic ? "rtl" : "ltr"}
            className={`flex gap-4 rounded-[1.5rem] border-2 border-ember/30 bg-ember-soft ${compact ? "p-4" : "p-5 md:p-7"} ${arabic ? "arabic" : ""}`}
        >
            <span className={`grid shrink-0 place-items-center rounded-2xl bg-ember text-white ${compact ? "h-10 w-10" : "h-12 w-12"}`}>
                <ShieldCheck size={compact ? 20 : 24} />
            </span>
            <div>
                <p className={`font-display font-extrabold text-ink ${compact ? "text-sm" : "text-base md:text-lg"}`}>
                    {arabic ? "متجر مستقل — إشعار العلامات التجارية" : "Independent retailer — trademark notice"}
                </p>
                <p className={`mt-1 leading-relaxed text-ink-soft ${compact ? "text-xs" : "text-sm"}`}>{arabic ? DISCLAIMER_AR : DISCLAIMER}</p>
                {!compact && (
                    <Link href="/policies/terms" className="mt-2 inline-block text-xs font-bold text-ember-deep underline underline-offset-4">
                        {arabic ? "الشروط والأحكام" : "Read our terms"}
                    </Link>
                )}
            </div>
        </div>
    )

    if (compact) return <div className="mt-6">{body}</div>

    return (
        <section aria-label="Trademark notice" className="bg-sand py-8 md:py-10">
            <div className="container-x">{body}</div>
        </section>
    )
}
