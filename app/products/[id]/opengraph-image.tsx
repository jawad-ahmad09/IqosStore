import { readFile } from "node:fs/promises"
import path from "node:path"
import { ImageResponse } from "next/og"
import { getProductById, products } from "@/app/data/products"
import { REGIONS } from "@/app/data/store"
import { formatAED } from "@/app/lib/pricing"

export const alt = "Product image"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Built at build time (public/ isn't bundled into serverless functions).
export function generateStaticParams() {
    return products.map((p) => ({ id: p.id }))
}

export default async function ProductOgImage({ params }: { params: Promise<{ id: string }> }) {
    const product = getProductById((await params).id)
    if (!product) return new Response("Not found", { status: 404 })

    const file = await readFile(path.join(process.cwd(), "public", product.images[0]))
    const mime = product.images[0].endsWith(".png") ? "image/png" : "image/jpeg"
    const src = `data:${mime};base64,${file.toString("base64")}`
    const accent = product.region ? REGIONS[product.region].color.replace(/var\(--color-(\w+)\)/, (_, k) => ACCENTS[k] ?? "#e4572e") : "#e4572e"

    return new ImageResponse(
        (
            <div style={{ width: "100%", height: "100%", display: "flex", background: "#13100d", color: "#fff" }}>
                <div style={{ width: 560, height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#fbf9f6" }}>
                    <img src={src} width={460} height={460} style={{ objectFit: "contain" }} alt="" />
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 60 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>
                        <div style={{ width: 16, height: 16, borderRadius: 999, background: accent }} />
                        {product.region ? `${product.region} edition` : product.line}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.05 }}>{product.name}</div>
                        <div style={{ marginTop: 16, fontSize: 28, color: "rgba(255,255,255,0.65)" }}>{product.notes}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", padding: "14px 28px", borderRadius: 999, background: "#e4572e", fontSize: 40, fontWeight: 800 }}>
                            {formatAED(product.price)}
                        </div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>IQOS STORE · DUBAI</div>
                    </div>
                </div>
            </div>
        ),
        size,
    )
}

const ACCENTS: Record<string, string> = { indo: "#d63a31", kzk: "#1592cf", uzb: "#12a46b", jp: "#b5174b", ch: "#8b3fd9" }
