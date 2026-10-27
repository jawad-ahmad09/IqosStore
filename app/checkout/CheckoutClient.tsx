"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, CheckCircle2, Loader2, Lock } from "lucide-react"
import { FreeDeliveryMeter, QuantityStepper } from "@/app/components/CartDrawer"
import { WhatsAppIcon } from "@/app/components/WhatsAppButton"
import { useCart } from "@/app/context/CartContext"
import { EMIRATES, listingHref, whatsappLink } from "@/app/data/store"
import { formatAED, priceOrder } from "@/app/lib/pricing"
import { useHydrated } from "@/app/lib/useHydrated"
import type { ContactFormData } from "@/app/types"

const EMPTY_FORM = { name: "", phone: "", email: "", emirate: "Dubai", address: "", message: "", website: "" }

type Order = ReturnType<typeof priceOrder>

function orderText(form: typeof EMPTY_FORM, order: Order) {
    const lines = order.lines.map((l) => `• ${l.quantity} × ${l.product.name}${l.product.region ? ` (${l.product.region})` : ""} — ${formatAED(l.lineTotal)}`)
    return [
        "Hi! I'd like to place an order:",
        ...lines,
        `Delivery: ${order.delivery === 0 ? "FREE" : formatAED(order.delivery)}`,
        `Total: ${formatAED(order.total)}`,
        "",
        form.name ? `Name: ${form.name}` : null,
        form.phone ? `Phone: ${form.phone}` : null,
        `Emirate: ${form.emirate}`,
        form.address ? `Address: ${form.address}` : null,
        form.message ? `Notes: ${form.message}` : null,
    ]
        .filter((l) => l !== null)
        .join("\n")
}

export default function CheckoutClient() {
    const { lines, items, updateQuantity, clear } = useCart()
    const hydrated = useHydrated()
    const [form, setForm] = useState(EMPTY_FORM)
    const [status, setStatus] = useState<"idle" | "sending" | "error">("idle")
    const [placed, setPlaced] = useState<{ order: Order; name: string } | null>(null)

    const order = priceOrder(lines, form.emirate)

    const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus("sending")
        const payload: ContactFormData = { ...form, items: lines }
        try {
            const res = await fetch("/api/send-inquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            setPlaced({ order, name: form.name })
            clear()
            setForm(EMPTY_FORM)
            setStatus("idle")
            window.scrollTo({ top: 0, behavior: "smooth" })
        } catch {
            setStatus("error")
        }
    }

    if (placed) {
        return (
            <div className="container-x max-w-xl py-16 text-center">
                <CheckCircle2 size={64} className="mx-auto text-success" />
                <h1 className="mt-5 text-4xl font-extrabold">Thank you, {placed.name.split(" ")[0]}!</h1>
                <p className="mt-3 text-ink-soft">
                    Your order is in. We&apos;ll call or WhatsApp you shortly to confirm delivery.
                </p>
                <div className="mt-8 rounded-[1.5rem] bg-paper p-5 text-left">
                    {placed.order.lines.map((l) => (
                        <div key={l.product.id} className="flex justify-between py-1.5 text-sm">
                            <span>{l.quantity} × {l.product.name}</span>
                            <span className="font-bold">{formatAED(l.lineTotal)}</span>
                        </div>
                    ))}
                    <div className="mt-3 flex justify-between border-t border-line pt-3 font-display text-lg font-extrabold">
                        <span>Total</span>
                        <span>{formatAED(placed.order.total)}</span>
                    </div>
                </div>
                <Link href={listingHref()} className="btn btn-ink mt-8">Continue shopping</Link>
            </div>
        )
    }

    if (!hydrated) {
        return (
            <div className="container-x py-10">
                <div className="skeleton h-12 w-56" />
                <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
                    <div className="skeleton h-96" />
                    <div className="skeleton h-72" />
                </div>
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="container-x max-w-xl py-20 text-center">
                <h1 className="text-4xl font-extrabold">Your cart is empty</h1>
                <p className="mt-3 text-ink-soft">Add a few favourites and come back here to check out.</p>
                <Link href={listingHref()} className="btn btn-ember mt-8">Browse products</Link>
            </div>
        )
    }

    return (
        <div className="container-x py-6 md:py-10">
            <Link href={listingHref()} className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-ink-soft hover:text-ink">
                <ArrowLeft size={16} /> Continue shopping
            </Link>
            <h1 className="text-4xl font-extrabold md:text-5xl">Checkout</h1>
            <p className="mt-2 text-ink-soft">Pay on delivery — no card needed.</p>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
                <form onSubmit={submit} className="order-2 relative space-y-4 lg:order-1">
                    <input
                        name="website"
                        value={form.website}
                        onChange={update}
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        className="absolute -left-[9999px] h-0 w-0 opacity-0"
                    />
                    <fieldset className="space-y-4 rounded-[1.5rem] bg-paper p-5 md:p-7">
                        <legend className="sr-only">Your details</legend>
                        <h2 className="text-xl font-extrabold">Your details</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="block">
                                <span className="mb-1.5 block text-sm font-bold">Full name *</span>
                                <input name="name" required autoComplete="name" value={form.name} onChange={update} className="field" />
                            </label>
                            <label className="block">
                                <span className="mb-1.5 block text-sm font-bold">Phone / WhatsApp *</span>
                                <input
                                    name="phone"
                                    type="tel"
                                    required
                                    autoComplete="tel"
                                    placeholder="+971 5X XXX XXXX"
                                    pattern="[+0-9 ()-]{7,20}"
                                    value={form.phone}
                                    onChange={update}
                                    className="field"
                                />
                            </label>
                        </div>
                        <label className="block">
                            <span className="mb-1.5 block text-sm font-bold">Email (optional)</span>
                            <input name="email" type="email" autoComplete="email" value={form.email} onChange={update} className="field" />
                        </label>
                    </fieldset>

                    <fieldset className="space-y-4 rounded-[1.5rem] bg-paper p-5 md:p-7">
                        <legend className="sr-only">Delivery</legend>
                        <h2 className="text-xl font-extrabold">Delivery</h2>
                        <div>
                            <span className="mb-1.5 block text-sm font-bold">Emirate *</span>
                            <div className="no-scrollbar -mx-1 flex flex-wrap gap-2 px-1">
                                {EMIRATES.map((em) => (
                                    <button
                                        key={em}
                                        type="button"
                                        data-active={form.emirate === em}
                                        onClick={() => setForm((f) => ({ ...f, emirate: em }))}
                                        className="chip !py-2 !text-xs"
                                    >
                                        {em}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <label className="block">
                            <span className="mb-1.5 block text-sm font-bold">Address *</span>
                            <textarea
                                name="address"
                                required
                                rows={2}
                                autoComplete="street-address"
                                placeholder="Building, street, area"
                                value={form.address}
                                onChange={update}
                                className="field resize-none"
                            />
                        </label>
                        <label className="block">
                            <span className="mb-1.5 block text-sm font-bold">Notes (optional)</span>
                            <textarea
                                name="message"
                                rows={2}
                                placeholder="Preferred delivery time, landmark…"
                                value={form.message}
                                onChange={update}
                                className="field resize-none"
                            />
                        </label>
                    </fieldset>

                    {status === "error" && (
                        <p className="rounded-2xl bg-danger/10 p-4 text-sm font-semibold text-danger">
                            We couldn&apos;t send your order. Please try again, or send it on WhatsApp below.
                        </p>
                    )}

                    <button type="submit" disabled={status === "sending"} className="btn btn-ember w-full py-4 text-base disabled:opacity-70">
                        {status === "sending" ? <Loader2 size={18} className="animate-spin" /> : <Lock size={16} />}
                        {status === "sending" ? "Placing order…" : `Place order · ${formatAED(order.total)}`}
                    </button>
                    <a
                        href={whatsappLink(orderText(form, order))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp w-full"
                    >
                        <WhatsAppIcon size={18} /> Send order on WhatsApp instead
                    </a>
                </form>

                <aside className="order-1 lg:order-2">
                    <div className="space-y-4 rounded-[1.5rem] bg-paper p-5 md:p-7 lg:sticky lg:top-28">
                        <h2 className="text-xl font-extrabold">Order summary</h2>
                        <ul className="divide-y divide-line">
                            {items.map(({ id, quantity, product }) => (
                                <li key={id} className="flex items-center gap-3 py-3">
                                    <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-line bg-white">
                                        <Image src={product.images[0]} alt={product.name} fill sizes="64px" className="object-contain p-1" />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block truncate text-sm font-bold">{product.name}</span>
                                        <span className="block text-xs text-ink-soft">{product.region ?? product.line}</span>
                                        <span className="mt-1.5 block">
                                            <QuantityStepper value={quantity} onChange={(q) => updateQuantity(id, q)} />
                                        </span>
                                    </span>
                                    <span className="font-display font-extrabold">{formatAED(product.price * quantity)}</span>
                                </li>
                            ))}
                        </ul>
                        <FreeDeliveryMeter count={order.items} />
                        <dl className="space-y-2 border-t border-line pt-4 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-ink-soft">Subtotal</dt>
                                <dd className="font-bold">{formatAED(order.subtotal)}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-ink-soft">Delivery to {form.emirate}</dt>
                                <dd className="font-bold">{order.delivery === 0 ? <span className="text-success">FREE</span> : formatAED(order.delivery)}</dd>
                            </div>
                            <div className="flex justify-between border-t border-line pt-3 font-display text-xl font-extrabold">
                                <dt>Total</dt>
                                <dd>{formatAED(order.total)}</dd>
                            </div>
                        </dl>
                    </div>
                </aside>
            </div>
        </div>
    )
}
