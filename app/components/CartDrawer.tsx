"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { Minus, Plus, ShoppingBag, Trash2, X, Truck } from "lucide-react"
import { useCart } from "@/app/context/CartContext"
import { useUI } from "@/app/context/UIContext"
import { getRelatedProducts } from "@/app/data/products"
import { ORIGIN_COUNT, listingHref } from "@/app/data/store"
import { DELIVERY, formatAED } from "@/app/lib/pricing"
import { productTag } from "@/app/lib/product"

export function QuantityStepper({
    value,
    onChange,
    size = "sm",
}: {
    value: number
    onChange: (next: number) => void
    size?: "sm" | "lg"
}) {
    const box = size === "lg" ? "h-12 w-12" : "h-8 w-8"
    return (
        <div className="inline-flex items-center rounded-full border border-line bg-paper">
            <button onClick={() => onChange(value - 1)} aria-label="Decrease quantity" className={`grid ${box} place-items-center rounded-full hover:bg-sand`}>
                <Minus size={size === "lg" ? 18 : 14} />
            </button>
            <span className={`text-center font-bold tabular-nums ${size === "lg" ? "w-10 text-lg" : "w-7 text-sm"}`}>{value}</span>
            <button onClick={() => onChange(value + 1)} aria-label="Increase quantity" className={`grid ${box} place-items-center rounded-full hover:bg-sand`}>
                <Plus size={size === "lg" ? 18 : 14} />
            </button>
        </div>
    )
}

export function FreeDeliveryMeter({ count }: { count: number }) {
    const remaining = Math.max(0, DELIVERY.freeFromItems - count)
    const pct = Math.min(100, (count / DELIVERY.freeFromItems) * 100)
    return (
        <div className="rounded-2xl bg-ember-soft p-3">
            <p className="flex items-center gap-2 text-sm font-bold text-ember-deep">
                <Truck size={16} />
                {remaining === 0 ? "You've unlocked free delivery!" : `Add ${remaining} more item for free delivery`}
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white">
                <div className="h-full rounded-full bg-ember transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
        </div>
    )
}

function FreeDeliveryUpsell() {
    const { items, addItem } = useCart()
    if (items.length !== 1 || items[0].quantity !== 1) return null
    const inCart = items[0].product
    const suggestions = getRelatedProducts(inCart, 6).filter((p) => p.id !== inCart.id).slice(0, 4)
    if (suggestions.length === 0) return null

    return (
        <div className="mt-3">
            <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-ink-faint">Add one of these — delivery becomes free</p>
            <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
                {suggestions.map((p) => {
                    const tag = productTag(p)
                    return (
                        <div key={p.id} className="flex w-36 shrink-0 flex-col rounded-2xl bg-paper p-2" style={{ "--tint": tag.color } as React.CSSProperties}>
                            <span className="plate relative block aspect-square overflow-hidden rounded-xl">
                                <Image src={p.images[0]} alt={p.name} fill sizes="128px" className="object-contain p-2" />
                            </span>
                            <span className="mt-1.5 line-clamp-1 text-xs font-bold">{p.name}</span>
                            <span className="flex items-center justify-between">
                                <span className="font-display text-sm font-extrabold">{formatAED(p.price)}</span>
                                <button
                                    onClick={() => addItem(p.id)}
                                    aria-label={`Add ${p.name}`}
                                    className="grid h-7 w-7 place-items-center rounded-full bg-ink text-white hover:bg-ember"
                                >
                                    <Plus size={14} />
                                </button>
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default function CartDrawer() {
    const { isCartOpen, closeCart } = useUI()
    const { items, count, subtotal, updateQuantity, removeItem } = useCart()

    useEffect(() => {
        if (!isCartOpen) return
        document.body.style.overflow = "hidden"
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart()
        window.addEventListener("keydown", onKey)
        return () => {
            document.body.style.overflow = ""
            window.removeEventListener("keydown", onKey)
        }
    }, [isCartOpen, closeCart])

    if (!isCartOpen) return null

    return (
        <div className="fixed inset-0 z-[130]" role="dialog" aria-modal="true" aria-label="Shopping cart">
            <div className="absolute inset-0 bg-night/60 backdrop-blur-sm" onClick={closeCart} />
            <aside className="animate-slide-in absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-sand shadow-2xl">
                <div className="flex items-center justify-between border-b border-line px-5 py-4">
                    <h2 className="flex items-center gap-2 text-xl font-extrabold">
                        Your cart <span className="rounded-full bg-ink px-2 py-0.5 text-xs text-white">{count}</span>
                    </h2>
                    <button onClick={closeCart} aria-label="Close cart" className="grid h-10 w-10 place-items-center rounded-full bg-paper hover:bg-sand-2">
                        <X size={20} />
                    </button>
                </div>

                {items.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                        <span className="grid h-20 w-20 place-items-center rounded-full bg-paper">
                            <ShoppingBag size={32} className="text-ink-faint" />
                        </span>
                        <p className="font-display text-xl font-bold">Your cart is empty</p>
                        <p className="text-sm text-ink-soft">Browse TEREA from {ORIGIN_COUNT} origins, ILUMA devices and STIG pods.</p>
                        <Link href={listingHref()} onClick={closeCart} className="btn btn-ink mt-2">
                            Start shopping
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="px-5 pt-4">
                            <FreeDeliveryMeter count={count} />
                            <FreeDeliveryUpsell />
                        </div>
                        <ul className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
                            {items.map(({ id, quantity, product }) => {
                                const tag = productTag(product)
                                return (
                                    <li key={id} className="flex gap-3 rounded-2xl bg-paper p-3" style={{ "--tint": tag.color } as React.CSSProperties}>
                                        <Link
                                            href={`/products/${id}`}
                                            onClick={closeCart}
                                            className="plate relative h-20 w-20 shrink-0 overflow-hidden rounded-xl"
                                        >
                                            <Image src={product.images[0]} alt={product.name} fill sizes="80px" className="object-contain p-1" />
                                        </Link>
                                        <div className="flex min-w-0 flex-1 flex-col">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-bold">{product.name}</p>
                                                    <p className="flex items-center gap-1.5 text-xs text-ink-soft">
                                                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: tag.color }} />
                                                        {tag.label}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(id)}
                                                    aria-label={`Remove ${product.name}`}
                                                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-faint hover:bg-sand hover:text-danger"
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                            <div className="mt-auto flex items-center justify-between pt-2">
                                                <QuantityStepper value={quantity} onChange={(q) => updateQuantity(id, q)} />
                                                <span className="font-display font-extrabold">{formatAED(product.price * quantity)}</span>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                        <div className="border-t border-line bg-paper p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                            <div className="mb-1 flex justify-between text-sm text-ink-soft">
                                <span>Subtotal</span>
                                <span className="font-bold text-ink">{formatAED(subtotal)}</span>
                            </div>
                            <p className="mb-4 text-xs text-ink-faint">Delivery calculated at checkout.</p>
                            <Link href="/checkout" onClick={closeCart} className="btn btn-ember w-full text-base">
                                Checkout · {formatAED(subtotal)}
                            </Link>
                            <button onClick={closeCart} className="mt-2 w-full py-2 text-sm font-bold text-ink-soft hover:text-ink">
                                Continue shopping
                            </button>
                        </div>
                    </>
                )}
            </aside>
        </div>
    )
}
