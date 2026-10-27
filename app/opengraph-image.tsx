import { ImageResponse } from "next/og"
import { products } from "./data/products"

export const alt = "IQOS Store UAE — TEREA, IQOS ILUMA & STIG with same-day delivery in Dubai"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 72,
                    color: "#fff",
                    backgroundColor: "#13100d",
                    backgroundImage: "radial-gradient(circle at 85% 20%, rgba(228,87,46,0.55) 0%, rgba(19,16,13,0) 45%)",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <div
                        style={{
                            width: 72,
                            height: 72,
                            borderRadius: 18,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 48,
                            fontWeight: 800,
                            background: "radial-gradient(circle at 50% 55%, #e4572e 0%, #8a2f12 40%, #2b241d 75%)",
                        }}
                    >
                        i
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ fontSize: 34, fontWeight: 800 }}>IQOS STORE</div>
                        <div style={{ fontSize: 18, letterSpacing: 6, color: "rgba(255,255,255,0.55)" }}>DUBAI · UAE</div>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.02 }}>Every TEREA.</div>
                    <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1.02 }}>
                        At your door&nbsp;<span style={{ color: "#e4572e" }}>today.</span>
                    </div>
                </div>
                <div style={{ display: "flex", gap: 16, fontSize: 26, fontWeight: 700 }}>
                    {[`${products.length}+ products`, "Same-day in Dubai", "Free delivery 2+ items", "Cash on delivery"].map((t) => (
                        <div key={t} style={{ display: "flex", padding: "12px 22px", borderRadius: 999, background: "rgba(255,255,255,0.1)" }}>
                            {t}
                        </div>
                    ))}
                </div>
            </div>
        ),
        size,
    )
}
