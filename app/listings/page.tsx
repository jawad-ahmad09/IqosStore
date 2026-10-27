import type { Metadata } from "next"
import { permanentRedirect } from "next/navigation"
import { Suspense } from "react"
import { CATEGORIES, ORIGIN_LIST, REGIONS, listingHref } from "@/app/data/store"
import type { Category, Region } from "@/app/types"
import ListingsClient from "./ListingsClient"

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> }

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const q = first((await searchParams).q)
    return {
        title: { absolute: "Shop All — TEREA, IQOS ILUMA & STIG in Dubai | IQOS Store UAE" },
        description:
            `Browse every product: TEREA sticks from ${ORIGIN_LIST}, IQOS ILUMA devices and VGOD STIG pods. Same-day delivery in Dubai, free delivery on 2+ items.`,
        alternates: { canonical: "/listings" },
        // Search result variations shouldn't compete with the real collection pages.
        robots: q ? { index: false, follow: true } : undefined,
    }
}

export default async function ListingsPage({ searchParams }: Props) {
    const params = await searchParams
    const q = first(params.q) ?? first(params.search)
    const category = (Object.keys(CATEGORIES) as Category[]).find((c) => c === first(params.category))
    const region = (Object.keys(REGIONS) as Region[]).find((r) => r.toLowerCase() === first(params.region)?.toLowerCase())

    // Old filter URLs (e.g. /listings?region=KAZAKHSTAN) move to the indexable collection pages.
    if (!q && (category || region)) permanentRedirect(listingHref({ category: category ?? "terea", region }))

    return (
        <Suspense
            fallback={
                <div className="min-h-screen">
                    <div className="h-48 bg-night md:h-60" />
                    <div className="container-x grid grid-cols-2 gap-3 pt-24 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
                        {Array.from({ length: 8 }, (_, i) => (
                            <div key={i} className="skeleton aspect-[3/4]" />
                        ))}
                    </div>
                </div>
            }
        >
            <ListingsClient />
        </Suspense>
    )
}
