"use client"

import { useCart } from "@/app/context/CartContext"
import { useUI } from "@/app/context/UIContext"
import { useRouter } from "next/navigation"
import Image from "next/image"

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
        <div className="fixed inset-0 z-[100] flex items-start justify-end bg-black/40 backdrop-blur-sm animate-fade-in-simple">
            <div className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-slide-in-right">
                <div className="p-4 border-b border-border flex items-center justify-between bg-gradient-to-r from-accent/10 to-transparent">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <span className="text-2xl animate-bounce-in">🛒</span>
                        Your Cart
                    </h3>
                    <button onClick={closeCart} className="text-muted hover:text-red-500 transition-all hover:rotate-90 hover:scale-125 text-xl font-bold">✕</button>
                </div>
                <div className="p-4 overflow-y-auto flex-1">
                    {items.length === 0 ? (
                        <p className="text-muted">Your cart is empty</p>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item, index) => (
                                <div key={item.id} className={`border-2 border-border rounded-xl p-3 hover-glow hover-lift bg-white transition-all animate-slide-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="flex items-start gap-3">
                                        <div className="relative">
                                            <Image src={item.image} alt={item.name} width={64} height={64} className="w-16 h-16 object-cover rounded-lg shadow-md" />
                                            <div className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-in">
                                                {item.quantity}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <p className="font-bold leading-tight text-sm">{item.name}</p>
                                                    <p className="text-xs text-muted">AED {item.price} each</p>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-red-500 text-xs hover:text-red-700 hover:scale-110 transition-all font-semibold"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                            <div className="mt-2 flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                    className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg hover:from-accent hover:to-accent-light hover:text-white transition-all font-bold hover:scale-110 shadow-sm"
                                                >
                                                    −
                                                </button>
                                                <span className="w-8 text-center font-bold text-accent">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg hover:from-accent hover:to-accent-light hover:text-white transition-all font-bold hover:scale-110 shadow-sm"
                                                >
                                                    +
                                                </button>
                                                <span className="ml-auto font-bold text-accent text-sm">AED {(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="p-4 border-t-2 border-accent/20 bg-gradient-to-b from-transparent to-accent/5">
                    <div className="flex items-center justify-between mb-4 p-3 bg-white rounded-xl shadow-md">
                        <span className="text-muted font-semibold">Subtotal</span>
                        <span className="text-3xl font-bold text-accent animate-pulse-scale">AED {total.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        {items.length > 0 && (
                            <button
                                onClick={handlePlaceOrder}
                                className="w-full bg-gradient-to-r from-accent to-accent-light text-white py-4 rounded-xl font-bold hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 group animate-glow"
                            >
                                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Place Order</span>
                                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}