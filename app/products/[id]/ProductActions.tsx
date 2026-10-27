"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { ShoppingBag } from "lucide-react"
import { QuantityStepper } from "@/app/components/CartDrawer"
import { useToast } from "@/app/components/Toast"
import { WhatsAppIcon } from "@/app/components/WhatsAppButton"
import { useCart } from "@/app/context/CartContext"
import { whatsappLink } from "@/app/data/store"
import { flyToCart } from "@/app/lib/flyToCart"
import { MAX_QUANTITY, formatAED } from "@/app/lib/pricing"
import type { Product } from "@/app/types"

export default function ProductActions({ product }: { product: Product }) {
    const router = useRouter()
    const { addItem } = useCart()
    const { show } = useToast()
    const [quantity, setQuantity] = useState(1)
    const [showBar, setShowBar] = useState(false)
    const actionsRef = useRef<HTMLDivElement>(null)

    // Show the compact mobile bar once the main buttons have scrolled off the top.
    useEffect(() => {
        const el = actionsRef.current
        if (!el) return
        const observer = new IntersectionObserver(([entry]) => {
            setShowBar(!entry.isIntersecting && entry.boundingClientRect.top < 0)
        })
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    if (!product.inStock) {
        return (
            <div className="mt-8 rounded-2xl border border-line bg-paper p-5">
                <p className="font-bold">This one is currently sold out.</p>
                <p className="mt-1 text-sm text-ink-soft">Message us and we&apos;ll let you know as soon as it&apos;s back.</p>
                <a
                    href={whatsappLink(`Hi! Please let me know when ${product.name} is back in stock.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp mt-4 w-full"
                >
                    <WhatsAppIcon size={18} /> Notify me on WhatsApp
                </a>
            </div>
        )
    }

    const add = (qty = quantity) => {
        addItem(product.id, qty)
        flyToCart(document.querySelector<HTMLElement>("[data-product-image]"))
        show(`${qty} × ${product.name} added`)
    }

    return (
        <>
            <div ref={actionsRef} className="mt-8 space-y-3">
                <div className="flex gap-3">
                    <QuantityStepper value={quantity} onChange={(q) => setQuantity(Math.max(1, Math.min(MAX_QUANTITY, q)))} size="lg" />
                    <button onClick={() => add()} className="btn btn-ink flex-1 text-base">
                        <ShoppingBag size={18} /> Add · {formatAED(product.price * quantity)}
                    </button>
                </div>
                <button
                    onClick={() => {
                        addItem(product.id, quantity)
                        router.push("/checkout")
                    }}
                    className="btn btn-ember w-full text-base"
                >
                    Buy now
                </button>
                <a
                    href={whatsappLink(`Hi! I'd like to order ${quantity} × ${product.name} (${formatAED(product.price)} each).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2 text-sm font-bold text-[#1fa855]"
                >
                    <WhatsAppIcon size={16} /> Or order this on WhatsApp
                </a>
            </div>

            {showBar && (
                <div className="animate-slide-up fixed inset-x-0 bottom-[calc(57px+env(safe-area-inset-bottom))] z-[70] border-t border-line bg-paper/95 px-4 py-2.5 shadow-[0_-12px_30px_-18px_rgb(0_0_0/0.4)] backdrop-blur-xl md:hidden">
                    <div className="flex items-center gap-3">
                        <span className="plate relative h-11 w-11 shrink-0 overflow-hidden rounded-xl">
                            <Image src={product.images[0]} alt="" fill sizes="44px" className="object-contain p-1" />
                        </span>
                        <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-bold">{product.name}</span>
                            <span className="block font-display text-sm font-extrabold text-ember">{formatAED(product.price)}</span>
                        </span>
                        <button
                            onClick={() => add(1)}
                            className="btn btn-ember shrink-0 !px-4 !py-2.5 text-sm"
                        >
                            <ShoppingBag size={16} /> Add
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
