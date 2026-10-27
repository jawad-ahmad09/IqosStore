import type { Metadata } from "next"
import { Suspense } from "react"
import ListingsClient from "./ListingsClient"

export const metadata: Metadata = {
    title: "Shop TEREA, IQOS ILUMA & STIG in Dubai | IQOS Store UAE",
    description:
        "Browse TEREA sticks from Indonesia, Kazakhstan, Uzbekistan and Japan, IQOS ILUMA devices and VGOD STIG pods. Same-day delivery in Dubai, free delivery on 2+ items.",
    alternates: { canonical: "/listings" },
}

export default function ListingsPage() {
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
