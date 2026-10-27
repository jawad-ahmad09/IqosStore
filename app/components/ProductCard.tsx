"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import { Check, Plus } from "lucide-react"
import { useCart } from "@/app/context/CartContext"
import { useToast } from "@/app/components/Toast"
import { whatsappLink } from "@/app/data/store"
import { flyToCart } from "@/app/lib/flyToCart"
import { formatAED } from "@/app/lib/pricing"
import { discountPercent, isLimited, productTag } from "@/app/lib/product"
import type { Product } from "@/app/types"

export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
    const { addItem } = useCart()
    const { show } = useToast()
    const [added, setAdded] = useState(false)
    const imageRef = useRef<HTMLImageElement>(null)
    const tag = productTag(product)
    const discount = discountPercent(product)
    const limited = isLimited(product)

    const handleAdd = () => {
        addItem(product.id)
        flyToCart(imageRef.current)
        show(`${product.name} added to cart`)
        setAdded(true)
        setTimeout(() => setAdded(false), 1400)
    }

    return (
        <article
            className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_24px_50px_-24px_rgb(23_19_15/0.35)]"
            style={{ "--tint": tag.color } as React.CSSProperties}
        >
            <Link href={`/products/${product.id}`} className="plate relative block aspect-square overflow-hidden">
                <Image
                    ref={imageRef}
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    priority={priority}
                    sizes="(min-width: 1280px) 280px, (min-width: 768px) 30vw, 50vw"
                    className={`object-contain p-4 transition-transform duration-500 group-hover:scale-[1.06] ${product.inStock ? "" : "opacity-50 grayscale"}`}
                />
                <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-ink shadow-sm backdrop-blur">
                    <span className="h-2 w-2 rounded-full" style={{ background: tag.color }} />
                    {tag.label}
                </span>
                <span className="absolute right-2.5 top-2.5 flex flex-col items-end gap-1">
                    {!product.inStock ? (
                        <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-bold text-white">Sold out</span>
                    ) : discount > 0 ? (
                        <span className="rounded-full bg-ember px-2.5 py-1 text-[11px] font-bold text-white">-{discount}%</span>
                    ) : null}
                    {limited && (
                        <span className="rounded-full bg-gradient-to-r from-gold to-[#e9c987] px-2.5 py-1 text-[11px] font-extrabold text-ink">
                            Limited
                        </span>
                    )}
                </span>
                {product.category === "terea" && (
                    <span className="absolute bottom-2.5 left-2.5 rounded-full bg-ink/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
                        {product.family}
                    </span>
                )}
            </Link>

            <div className="flex flex-1 flex-col gap-1 p-3 md:p-4">
                <Link href={`/products/${product.id}`} className="line-clamp-2 font-display text-[15px] font-bold leading-snug md:text-base">
                    {product.name}
                </Link>
                {product.notes && <p className="line-clamp-1 text-xs text-ink-soft md:text-[13px]">{product.notes}</p>}

                <div className="mt-auto flex items-end justify-between gap-2 pt-3">
                    <div className="leading-tight">
                        {product.compareAt && (
                            <span className="block text-xs text-ink-faint line-through">{formatAED(product.compareAt)}</span>
                        )}
                        <span className="font-display text-base font-extrabold md:text-lg">{formatAED(product.price)}</span>
                    </div>
                    {product.inStock ? (
                        <button
                            onClick={handleAdd}
                            aria-label={`Add ${product.name} to cart`}
                            className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-white transition-all duration-300 active:scale-90 ${
                                added ? "bg-success" : "bg-ink hover:bg-ember"
                            }`}
                        >
                            {added ? <Check size={18} strokeWidth={3} /> : <Plus size={20} strokeWidth={2.5} />}
                        </button>
                    ) : (
                        <a
                            href={whatsappLink(`Hi! Is ${product.name} back in stock?`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 rounded-full border border-line px-3 py-2 text-xs font-bold hover:border-ink"
                        >
                            Ask
                        </a>
                    )}
                </div>
            </div>
        </article>
    )
}
