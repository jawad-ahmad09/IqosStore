"use client"

import { useCart } from "@/app/context/CartContext"
import { useUI } from "@/app/context/UIContext"
import { useRouter } from "next/navigation" // ✅ Router import karein

export default function CartModal() {
    const { isCartOpen, closeCart } = useUI()
    const { items, updateQuantity, removeItem, total } = useCart()
    const router = useRouter() // ✅ Router use karein

    if (!isCartOpen) return null

    // ✅ Function to handle order placement
    const handlePlaceOrder = () => {
        closeCart() // Cart modal band karein
        router.push("/#contact") // Inquiry form par navigate karein
    }

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
                                                    <p className="text-sm text-muted">AED {item.price}</p>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-error text-sm hover:underline text-red-700"
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
                                                <span className="ml-auto font-semibold">AED {(item.price * item.quantity).toFixed(2)}</span>
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
                        <span className="text-2xl font-bold text-accent">AED {total.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        {/* ✅ New Place Order Button */}
                        {items.length > 0 && (
                            <button
                                onClick={handlePlaceOrder}
                                className="w-full bg-accent text-background py-3 rounded-lg font-semibold hover:bg-accent/90 transition-smooth flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Place Order
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}