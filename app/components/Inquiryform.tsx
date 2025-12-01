"use client"

import type React from "react"
import { useState } from "react"
import type { CartItem, ContactFormData } from "@/app/types"
import { useToast } from "./Toast"

interface InquiryFormProps {
    cartItems: CartItem[]
    onSubmit?: (data: ContactFormData) => void
}

export default function InquiryForm({ cartItems, onSubmit }: InquiryFormProps) {
    const { show } = useToast()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "Dubai",
        country: "UAE",
        message: "",
        selectedProducts: cartItems,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const payload: ContactFormData = {
                ...formData,
                selectedProducts: cartItems,
            }

            const res = await fetch("/api/send-inquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            if (!res.ok) {
                show("Failed to send inquiry. Please try again.")
                setLoading(false)
                return
            }

            show("Inquiry sent successfully!")
            setFormData({
                name: "",
                email: "",
                phone: "",
                address: "",
                city: "Dubai",
                country: "UAE",
                message: "",
                selectedProducts: [],
            })
            onSubmit?.(payload)
        } catch (error) {
            show("Error sending inquiry")
            console.error("Form submission error:", error)
        } finally {
            setLoading(false)
        }
    }

    // Calculate delivery charges based on rules
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const isDubai = formData.city.toLowerCase().includes("dubai")

    // Delivery logic:
    // - Dubai: Free for 2+ items, AED 10 for single item
    // - Outside Dubai (rest of UAE): AED 20 for single item, Free for 2+ items
    let deliveryCharge = 0
    if (totalQuantity === 1) {
        deliveryCharge = isDubai ? 10 : 20
    }
    // If 2 or more items, delivery is free everywhere

    const total = subtotal + deliveryCharge

    return (
        <div className="w-full">
            {/* Header Section */}
            <div className="text-center mb-12">
                <div className="inline-block px-4 py-2 bg-accent/10 rounded-full mb-4">
                    <p className="text-accent font-semibold text-sm">📦 Checkout</p>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Complete Your Order</h2>
                <p className="text-lg text-muted">Fast delivery across UAE - Safe and Secure</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
                    {/* Personal Information Card */}
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-gray-100 hover:border-accent/30 transition-all">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                <span className="text-xl">👤</span>
                            </div>
                            <h3 className="text-xl font-bold">Personal Information</h3>
                        </div>

                        <div className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-foreground">
                                        Full Name <span className="text-accent">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                                            👤
                                        </span>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                                            placeholder="Your full name"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-foreground">
                                        Email Address <span className="text-accent">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                                            📧
                                        </span>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2 text-foreground">
                                    Phone Number <span className="text-accent">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                                        📱
                                    </span>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                                        placeholder="+971 50 XXX XXXX"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Information Card */}
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-gray-100 hover:border-accent/30 transition-all">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                <span className="text-xl">🚚</span>
                            </div>
                            <h3 className="text-xl font-bold">Delivery Information</h3>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-foreground">
                                    Street Address <span className="text-accent">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                                        📍
                                    </span>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                                        placeholder="Street address, building, apartment"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-foreground">
                                        City
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                                            🏙️
                                        </span>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                                            placeholder="Dubai, Abu Dhabi, etc."
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-foreground">
                                        Country
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                                            🇦🇪
                                        </span>
                                        <input
                                            type="text"
                                            name="country"
                                            value={formData.country}
                                            disabled
                                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Notes Card */}
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-gray-100 hover:border-accent/30 transition-all">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                <span className="text-xl">💬</span>
                            </div>
                            <h3 className="text-xl font-bold">Special Instructions</h3>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2 text-muted">
                                Optional delivery notes or preferences
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all resize-none"
                                placeholder="Any special requests, preferred delivery time, or instructions..."
                                rows={4}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || cartItems.length === 0}
                        className="w-full px-8 py-4 bg-gradient-to-r from-primary to-primary/90 text-background rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 group"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
                                Processing Your Order...
                            </>
                        ) : (
                            <>
                                <span>Submit Order Inquiry</span>
                                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                            </>
                        )}
                    </button>

                    {/* Trust Badges Below Form */}
                    <div className="grid grid-cols-3 gap-4 pt-4">
                        <div className="text-center p-4 bg-accent/5 rounded-xl">
                            <div className="text-2xl mb-2">🔒</div>
                            <p className="text-xs font-semibold text-foreground">Secure</p>
                            <p className="text-xs text-muted">Payment</p>
                        </div>
                        <div className="text-center p-4 bg-accent/5 rounded-xl">
                            <div className="text-2xl mb-2">✓</div>
                            <p className="text-xs font-semibold text-foreground">100%</p>
                            <p className="text-xs text-muted">Authentic</p>
                        </div>
                        <div className="text-center p-4 bg-accent/5 rounded-xl">
                            <div className="text-2xl mb-2">🚚</div>
                            <p className="text-xs font-semibold text-foreground">Fast</p>
                            <p className="text-xs text-muted">Delivery</p>
                        </div>
                    </div>
                </form>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30 rounded-2xl p-6 shadow-xl sticky top-24">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                                <span className="text-xl">🛒</span>
                            </div>
                            <h3 className="text-xl font-bold">Order Summary</h3>
                        </div>

                        {cartItems.length > 0 ? (
                            <>
                                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto custom-scrollbar">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="font-semibold text-sm text-foreground flex-1 pr-2">
                                                    {item.name}
                                                </span>
                                                <span className="font-bold text-accent whitespace-nowrap">
                                                    AED {(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-muted">
                                                <span>Qty: {item.quantity}</span>
                                                <span>•</span>
                                                <span>AED {item.price.toFixed(2)} each</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t-2 border-accent/30 pt-5 mb-5">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-muted">Subtotal</span>
                                        <span className="font-semibold">AED {subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex flex-col">
                                            <span className="text-muted">Delivery</span>
                                            {deliveryCharge > 0 && (
                                                <span className="text-xs text-muted-foreground mt-0.5">
                                                    {isDubai ? "Dubai single item" : "Outside Dubai"}
                                                </span>
                                            )}
                                        </div>
                                        <span className={`font-semibold ${deliveryCharge === 0 ? 'text-green-600' : 'text-foreground'}`}>
                                            {deliveryCharge === 0 ? 'FREE' : `AED ${deliveryCharge.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white rounded-xl p-4 shadow-md">
                                        <span className="text-lg font-bold">Total</span>
                                        <span className="text-2xl font-bold text-accent">AED {total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 p-3 bg-white rounded-xl">
                                        <span className="text-green-500 text-lg">✓</span>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-foreground">Free delivery on 2+ items</p>
                                            <p className="text-xs text-muted mt-0.5">Dubai: AED 10 for single item | Outside Dubai: AED 20</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                                        <span className="text-green-500 text-lg">✓</span>
                                        <p className="text-sm font-semibold text-foreground">Authentic products guaranteed</p>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                                        <span className="text-green-500 text-lg">✓</span>
                                        <p className="text-sm font-semibold text-foreground">2-hour express delivery</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                                    <span className="text-4xl">🛒</span>
                                </div>
                                <p className="font-semibold text-foreground mb-2">Your cart is empty</p>
                                <p className="text-sm text-muted">Add items to proceed with order</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #d4a574;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #c89560;
                }
            `}</style>
        </div>
    )
}
