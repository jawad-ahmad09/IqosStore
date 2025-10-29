"use client"

import { useCart } from "@/app/context/CartContext"
import { useUI } from "@/app/context/UIContext"

export default function CartModal() {
    const { isCartOpen, closeCart } = useUI()
    const { items, updateQuantity, removeItem, total } = useCart()

    if (!isCartOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-end bg-black/40">
            <div className="w-full max-w-md h-full bg-white shadow-xl flex flex-col">
                <div className="p-4 border-b border-border flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Your Cart</h3>
                    <button onClick={closeCart} className="text-muted hover:text-foreground transition-smooth">✕</button>
                </div>
                <div className="p-4 overflow-y-auto flex-1">
                    {items.length === 0 ? (
                        <p className="text-muted">Your cart is empty</p>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="border border-border rounded-lg p-3">
                                    <div className="flex items-start gap-3">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <p className="font-semibold leading-tight">{item.name}</p>
                                                    <p className="text-sm text-muted">${item.price}</p>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-error text-sm hover:underline"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                            <div className="mt-2 flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                    className="px-2 py-1 bg-border rounded hover:bg-primary-light"
                                                >
                                                    −
                                                </button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="px-2 py-1 bg-border rounded hover:bg-primary-light"
                                                >
                                                    +
                                                </button>
                                                <span className="ml-auto font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="p-4 border-t border-border">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-muted">Subtotal</span>
                        <span className="text-2xl font-bold text-accent">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-2">
                        <a href="#contact" onClick={closeCart} className="flex-1 text-center bg-primary text-background py-3 rounded-lg font-semibold hover:bg-primary-light transition-smooth">Checkout via WhatsApp</a>
                        <button onClick={closeCart} className="px-4 py-3 border border-border rounded-lg font-semibold">Continue</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


