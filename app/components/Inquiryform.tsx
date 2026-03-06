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
    const isDubai = formData?.city?.toLowerCase().includes("dubai")

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
                <div className="inline-flex items-center gap-3 mb-4">
                    <div className="h-[2px] w-8 md:w-12 bg-gradient-to-r from-transparent via-accent to-accent rounded-full"></div>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-lg blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
                        <span className="relative text-xs md:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary px-4 py-1.5 border-2 border-accent/30 rounded-full backdrop-blur-sm">
                            📦 CHECKOUT
                        </span>
                    </div>
                    <div className="h-[2px] w-8 md:w-12 bg-gradient-to-r from-accent to-transparent rounded-full"></div>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                    <span className="relative inline-block">
                        <span className="relative">
                            Complete Your{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent animate-pulse-scale">
                                Order
                            </span>
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 md:w-48 h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full"></div>
                        </span>
                    </span>
                </h2>
                <p className="text-lg text-muted">Fast delivery across UAE - Safe and Secure</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
                    {/* Personal Information Card */}
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-gray-100 hover:border-accent/30 transition-all">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-md">
                                <span className="text-xl">👤</span>
                            </div>
                            <h3 className="text-xl font-bold">
                                <span className="relative inline-block">
                                    Personal Information
                                    <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-accent/50 via-primary to-transparent rounded-full"></div>
                                </span>
                            </h3>
                        </div>

                        <div className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-foreground flex items-center gap-2">
                                        <span className="text-accent">👤</span>
                                        Full Name <span className="text-accent">*</span>
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="relative w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all hover:border-accent/50 shadow-sm focus:shadow-lg"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-foreground flex items-center gap-2">
                                        <span className="text-accent">📧</span>
                                        Email Address <span className="text-accent">*</span>
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                            title="Enter a valid email address"
                                            className="relative w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all hover:border-accent/50 shadow-sm focus:shadow-lg invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2 text-foreground flex items-center gap-2">
                                    <span className="text-accent">📱</span>
                                    Phone Number <span className="text-accent">*</span>
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        pattern="^(\+971|00971|0)?[0-9]{9,10}$"
                                        title="Enter a valid UAE phone number (e.g., +971501234567 or 0501234567)"
                                        className="relative w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all hover:border-accent/50 shadow-sm focus:shadow-lg invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                                        placeholder="+971 50 XXX XXXX"
                                    />
                                </div>
                                <p className="text-xs text-muted mt-1.5 flex items-center gap-1">
                                    <span className="text-accent">ℹ️</span>
                                    Format: +971501234567 or 0501234567
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Information Card */}
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-gray-100 hover:border-accent/30 transition-all">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
                                <span className="text-xl">🚚</span>
                            </div>
                            <h3 className="text-xl font-bold">
                                <span className="relative inline-block">
                                    Delivery Information
                                    <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-primary/50 via-accent to-transparent rounded-full"></div>
                                </span>
                            </h3>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold mb-2 text-foreground flex items-center gap-2">
                                    <span className="text-accent">📍</span>
                                    Street Address <span className="text-accent">*</span>
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        className="relative w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all hover:border-accent/50 shadow-sm focus:shadow-lg"
                                        placeholder="Street address, building, apartment"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-foreground flex items-center gap-2">
                                        <span className="text-accent">🏙️</span>
                                        City
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="relative w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all hover:border-accent/50 shadow-sm focus:shadow-lg"
                                            placeholder="Dubai, Abu Dhabi, etc."
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-foreground flex items-center gap-2">
                                        <span className="text-accent">🇦🇪</span>
                                        Country
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="country"
                                            value={formData.country}
                                            disabled
                                            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 font-semibold cursor-not-allowed shadow-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Notes Card */}
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-gray-100 hover:border-accent/30 transition-all">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-md">
                                <span className="text-xl">💬</span>
                            </div>
                            <h3 className="text-xl font-bold">
                                <span className="relative inline-block">
                                    Special Instructions
                                    <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-accent/50 via-primary to-transparent rounded-full"></div>
                                </span>
                            </h3>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2 text-foreground flex items-center gap-2">
                                <span className="text-accent">📝</span>
                                Optional delivery notes or preferences
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="relative w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all hover:border-accent/50 shadow-sm focus:shadow-lg resize-none"
                                    placeholder="Any special requests, preferred delivery time, or instructions..."
                                    rows={4}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent rounded-xl blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
                        <button
                            type="submit"
                            disabled={loading || cartItems.length === 0}
                            className="relative w-full px-8 py-5 bg-gradient-to-r from-primary via-accent to-primary text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 group overflow-hidden"
                        >
                            {loading && (
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary/70 animate-pulse"></div>
                            )}
                            <div className="relative flex items-center gap-3">
                                {loading ? (
                                    <>
                                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Processing Your Order...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Submit Order Inquiry</span>
                                        <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
                                    </>
                                )}
                            </div>
                        </button>
                    </div>

                    {/* Loading Overlay for Form */}
                    {loading && (
                        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center">
                            <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4 animate-fadeInUp">
                                <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                                <p className="font-semibold text-lg">Sending your order...</p>
                                <p className="text-sm text-muted">Please wait</p>
                            </div>
                        </div>
                    )}

                    {/* Trust Badges Below Form */}
                    <div className="grid grid-cols-3 gap-4 pt-4">
                        <div className="text-center p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl border border-accent/20 hover:border-accent/40 transition-all hover:shadow-lg group">
                            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🔒</div>
                            <p className="text-xs font-bold text-foreground">Secure</p>
                            <p className="text-xs text-muted">Payment</p>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg group">
                            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">✓</div>
                            <p className="text-xs font-bold text-foreground">100%</p>
                            <p className="text-xs text-muted">Authentic</p>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl border border-accent/20 hover:border-accent/40 transition-all hover:shadow-lg group">
                            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🚚</div>
                            <p className="text-xs font-bold text-foreground">Fast</p>
                            <p className="text-xs text-muted">Delivery</p>
                        </div>
                    </div>
                </form>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-white via-accent/5 to-accent/10 border-2 border-accent/30 rounded-2xl p-4 md:p-6 shadow-2xl lg:sticky lg:top-24">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-accent/20">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg animate-pulse-scale">
                                    <span className="text-xl md:text-2xl">🛒</span>
                                </div>
                                <div>
                                    <h3 className="text-lg md:text-xl font-bold">
                                        <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
                                            Order Summary
                                        </span>
                                    </h3>
                                    <p className="text-xs text-muted">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</p>
                                </div>
                            </div>
                        </div>

                        {cartItems.length > 0 ? (
                            <>
                                {/* Products List */}
                                <div className="space-y-3 mb-6 max-h-[300px] md:max-h-96 overflow-y-auto custom-scrollbar pr-2">
                                    {cartItems.map((item, index) => (
                                        <div
                                            key={item.id}
                                            className="group bg-white rounded-xl p-3 md:p-4 shadow-md hover:shadow-xl border-2 border-gray-100 hover:border-accent/40 transition-all animate-slide-up"
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex-1 pr-2">
                                                    <span className="font-bold text-xs md:text-sm text-foreground line-clamp-2 group-hover:text-accent transition-colors">
                                                        {item.name}
                                                    </span>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent/10 rounded-full">
                                                            <span className="text-accent font-bold text-xs">×{item.quantity}</span>
                                                        </span>
                                                        <span className="text-xs text-muted">AED {item.price.toFixed(2)} each</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="font-black text-sm md:text-base text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary whitespace-nowrap">
                                                        AED {(item.price * item.quantity).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pricing Section */}
                                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 mb-5 border-2 border-gray-200 shadow-inner">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-semibold text-muted">Subtotal</span>
                                            <span className="font-bold text-foreground">AED {subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-muted">Delivery</span>
                                                {deliveryCharge > 0 && (
                                                    <span className="text-xs text-muted mt-0.5">
                                                        {isDubai ? "Dubai (single)" : "Outside Dubai"}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                {deliveryCharge === 0 ? (
                                                    <span className="font-bold text-green-600 flex items-center gap-1">
                                                        <span className="text-lg">✓</span>
                                                        FREE
                                                    </span>
                                                ) : (
                                                    <span className="font-bold text-foreground">AED {deliveryCharge.toFixed(2)}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="text-base md:text-lg font-black text-foreground">Total Amount</span>
                                            <span className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent animate-pulse-scale">
                                                AED {total.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Benefits */}
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2 p-3 bg-white rounded-xl border border-green-200 hover:shadow-md transition-all group">
                                        <span className="text-green-500 text-base md:text-lg group-hover:scale-110 transition-transform">✓</span>
                                        <div className="flex-1">
                                            <p className="text-xs md:text-sm font-bold text-foreground">Free delivery on 2+ items</p>
                                            <p className="text-xs text-muted mt-0.5">Single item: AED 10 (Dubai) / AED 20 (Outside)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-blue-200 hover:shadow-md transition-all group">
                                        <span className="text-blue-500 text-base md:text-lg group-hover:scale-110 transition-transform">✓</span>
                                        <p className="text-xs md:text-sm font-bold text-foreground">100% Authentic products</p>
                                    </div>
                                    <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-accent/30 hover:shadow-md transition-all group">
                                        <span className="text-accent text-base md:text-lg group-hover:scale-110 transition-transform">⚡</span>
                                        <p className="text-xs md:text-sm font-bold text-foreground">Same Day Delivery (Before 12PM)</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-4xl animate-bounce">🛒</span>
                                </div>
                                <p className="font-bold text-foreground mb-2 text-lg">Your cart is empty</p>
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
                    background: rgba(212, 165, 116, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(180deg, #d4a574 0%, #c89560 100%);
                    border-radius: 10px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(180deg, #c89560 0%, #b8854f 100%);
                }
            `}</style>
        </div>
    )
}
