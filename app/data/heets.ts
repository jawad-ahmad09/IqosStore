import { flavourName } from "@/app/data/flavours"
import type { Product } from "@/app/types"

// HEETS flavours and the TEREA stick that replaces each one on IQOS ILUMA.
// Used by the /heets-dubai landing page and the "switching from HEETS?" note on product pages.
export const HEETS_MATCHES: { heets: string; terea: string; productId: string }[] = [
    { heets: "HEETS Amber", terea: "TEREA Amber", productId: "terea-amber-kazakhstan" },
    { heets: "HEETS Silver", terea: "TEREA Silver", productId: "terea-silver-kazakhstan" },
    { heets: "HEETS Turquoise", terea: "TEREA Turquoise", productId: "terea-turquoise-menthol-kazakhstan" },
    { heets: "HEETS Purple Wave", terea: "TEREA Purple Wave", productId: "terea-purple-wave-uzbekistan" },
    { heets: "HEETS Yellow", terea: "TEREA Yellow", productId: "terea-yellow-kazakhstan" },
    { heets: "HEETS Bronze", terea: "TEREA Bronze", productId: "terea-bronze-kazakhstan" },
    { heets: "HEETS Sienna", terea: "TEREA Sienna", productId: "terea-sienna-switzerland" },
    { heets: "HEETS Teak", terea: "TEREA Teak", productId: "terea-teak-italy" },
]

// "HEETS Amber" for any TEREA Amber (any origin), undefined for everything else.
export function heetsMatchFor(product: Product) {
    if (product.category !== "terea") return undefined
    const terea = `TEREA ${flavourName(product)}`
    return HEETS_MATCHES.find((m) => m.terea === terea)?.heets
}
