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

// A full STIG box is 10 packs; it's added to the cart as 10 packs, so pricing and delivery stay consistent.
export const STIG_BOX_SIZE = 10

export default function ProductActions({ product }: { product: Product }) {
    const router = useRouter()
    const { addItem } = useCart()
    const { show } = useToast()
    const [quantity, setQuantity] = useState(1)
    const [box, setBox] = useState(false)
    const hasBox = product.category === "stig"
    const unit = product.line === "STIG XL" ? "device" : "pack"
    const perUnit = box ? STIG_BOX_SIZE : 1
    const maxQuantity = Math.floor(MAX_QUANTITY / perUnit)
    const describe = (qty: number) =>
        box ? `${qty} full ${qty === 1 ? "box" : "boxes"} (${qty * STIG_BOX_SIZE} ${unit}s) of ${product.name}` : `${qty} × ${product.name}`
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
        addItem(product.id, qty * perUnit)
        flyToCart(document.querySelector<HTMLElement>("[data-product-image]"))
        show(`${describe(qty)} added`)
    }

    return (
        <>
            <div ref={actionsRef} className="mt-8 space-y-3">
                {hasBox && (
                    <div role="radiogroup" aria-label="Pack size" className="grid grid-cols-2 gap-2">
                        {[
                            { value: false, title: product.line === "STIG XL" ? "Single device" : "Single pack", sub: product.line === "STIG XL" ? "1 device" : "3 pods", price: product.price },
                            {
                                value: true,
                                title: "Full box",
                                sub: product.line === "STIG XL" ? `${STIG_BOX_SIZE} devices` : `${STIG_BOX_SIZE} packs · ${STIG_BOX_SIZE * 3} pods`,
                                price: product.price * STIG_BOX_SIZE,
                            },
                        ].map((o) => (
                            <button
                                key={o.title}
                                role="radio"
                                aria-checked={box === o.value}
                                onClick={() => {
                                    setBox(o.value)
                                    setQuantity(1)
                                }}
                                className={`rounded-2xl border-2 p-3 text-left transition ${box === o.value ? "border-ember bg-ember-soft" : "border-line bg-paper hover:border-ink-faint"}`}
                            >
                                <span className="block font-display font-extrabold">{o.title}</span>
                                <span className="mt-0.5 block text-xs text-ink-soft">{o.sub}</span>
                                <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                                    <span className="font-display font-extrabold text-ember">{formatAED(o.price)}</span>
                                    {o.value && (
                                        <span className="whitespace-nowrap rounded-full bg-ember px-2 py-0.5 text-[10px] font-extrabold uppercase text-white">
                                            Free delivery
                                        </span>
                                    )}
                                </span>
                            </button>
                        ))}
                    </div>
                )}
                <div className="flex gap-3">
                    <QuantityStepper value={quantity} onChange={(q) => setQuantity(Math.max(1, Math.min(maxQuantity, q)))} size="lg" />
                    <button onClick={() => add()} className="btn btn-ink flex-1 text-base">
                        <ShoppingBag size={18} /> Add · {formatAED(product.price * quantity * perUnit)}
                    </button>
                </div>
                <button
                    onClick={() => {
                        addItem(product.id, quantity * perUnit)
                        router.push("/checkout")
                    }}
                    className="btn btn-ember w-full text-base"
                >
                    Buy now
                </button>
                <a
                    href={whatsappLink(`Hi! I'd like to order ${describe(quantity)} (${formatAED(product.price * perUnit)} each).`)}
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
                            <span className="block font-display text-sm font-extrabold text-ember">
                                {formatAED(product.price * perUnit)}
                                {box && <span className="font-sans text-xs font-bold text-ink-soft"> · full box</span>}
                            </span>
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
