"use client"

import { useParams, useRouter } from "next/navigation"
import { getProductById } from "@/app/data/products"
import { useCart } from "@/app/context/CartContext"
import { useToast } from "@/app/components/Toast"
import { useMemo, useState } from "react"

export default function ProductDetailPage() {
    const params = useParams<{ id: string }>()
    const router = useRouter()
    const { addItem } = useCart()
    const { show } = useToast()
    const [adding, setAdding] = useState(false)
    const [quantity, setQuantity] = useState(1)

    const id = Number(params.id)
    const product = getProductById(id)

    const specs = useMemo(() => {
        // simple curated specs based on product id/name
        const base = {
            packSize: "20 sticks",
            origin: "EU Import",
            compatibility: "IQOS Iluma devices",
        }
        if (!product) return base
        if (product.name.toLowerCase().includes("turquoise")) {
            return { ...base, flavor: "Menthol, crisp finish", intensity: "Medium" }
        }
        if (product.name.toLowerCase().includes("amber")) {
            return { ...base, flavor: "Rich roasted", intensity: "Bold" }
        }
        if (product.name.toLowerCase().includes("bronze")) {
            return { ...base, flavor: "Intense, aromatic", intensity: "Strong" }
        }
        if (product.name.toLowerCase().includes("sienna")) {
            return { ...base, flavor: "Balanced and rounded", intensity: "Medium" }
        }
        if (product.name.toLowerCase().includes("teak")) {
            return { ...base, flavor: "Warm and mellow", intensity: "Smooth" }
        }
        return { ...base, flavor: "Smooth and balanced", intensity: "Smooth" }
    }, [product])

    if (!product) {
        return (
            <div className="min-h-screen bg-background pt-24 pb-20">
                <div className="container mx-auto px-4">
                    <div className="bg-white border border-border rounded-xl p-8">
                        <p className="text-lg mb-4">Product not found.</p>
                        <button onClick={() => router.push("/")} className="text-primary font-semibold">Go back home</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4">
                <nav className="text-sm text-muted mb-6">
                    <button onClick={() => router.push("/")} className="hover:underline">Home</button>
                    <span className="mx-2">/</span>
                    <button onClick={() => router.push("/#products")} className="hover:underline">Products</button>
                    <span className="mx-2">/</span>
                    <span className="text-foreground">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="bg-white rounded-lg overflow-hidden shadow-md">
                        <img src={product.image} alt={product.name} className="w-full h-auto" />
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="mb-2">
                            <span className="inline-block text-xs px-2 py-1 rounded bg-accent/10 text-accent border border-accent/30">Terea Heats</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
                        <p className="text-muted mb-4">{product.description}</p>

                        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                            <div className="bg-background border border-border rounded p-3">
                                <p className="text-muted">Flavor</p>
                                <p className="font-semibold">{specs.flavor as string}</p>
                            </div>
                            <div className="bg-background border border-border rounded p-3">
                                <p className="text-muted">Intensity</p>
                                <p className="font-semibold">{specs.intensity as string}</p>
                            </div>
                            <div className="bg-background border border-border rounded p-3">
                                <p className="text-muted">Pack size</p>
                                <p className="font-semibold">{specs.packSize}</p>
                            </div>
                            <div className="bg-background border border-border rounded p-3">
                                <p className="text-muted">Compatibility</p>
                                <p className="font-semibold">{specs.compatibility}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-bold text-accent">${product.price}</span>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-2 py-1 bg-border rounded">−</button>
                                <span className="w-8 text-center">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="px-2 py-1 bg-border rounded">+</button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                            <button
                                onClick={async () => {
                                    setAdding(true)
                                    await new Promise((r) => setTimeout(r, 400))
                                    addItem(product, quantity)
                                    setAdding(false)
                                    show("Added to cart")
                                }}
                                disabled={adding}
                                className="px-5 py-3 bg-primary text-background rounded-md font-semibold hover:bg-primary-light transition-smooth disabled:opacity-60"
                            >
                                {adding ? "Adding..." : "Add to Cart"}
                            </button>
                            <button onClick={() => router.push("/#products")} className="font-semibold">← Back</button>
                        </div>

                        <div className="border-t border-border pt-4 text-sm text-muted leading-relaxed">
                            <p>All Terea Heats are genuine and compatible with IQOS Iluma devices. Store in a cool, dry place.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
