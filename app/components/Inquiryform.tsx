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

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <div className="w-full">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Complete Your Order</h2>
            <p className="text-muted mb-8">Delivery within UAE - Fast and Secure</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Full Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                                placeholder="Your full name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                                placeholder="your@email.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="+971 50 XXX XXXX"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Address *</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="Street address"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                                placeholder="Dubai, Abu Dhabi, etc."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Country</label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                disabled
                                className="w-full px-4 py-2 border border-border rounded-lg bg-muted text-muted-foreground cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Special Instructions</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="Any special requests or instructions..."
                            rows={4}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || cartItems.length === 0}
                        className="w-full px-6 py-3 bg-primary text-background rounded-lg font-semibold hover:bg-primary-light transition-smooth disabled:opacity-60"
                    >
                        {loading ? "Sending..." : "Submit Order Inquiry"}
                    </button>
                </form>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 sticky top-24">
                        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

                        {cartItems.length > 0 ? (
                            <>
                                <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <span className="text-muted">
                                                {item.name} x {item.quantity}
                                            </span>
                                            <span className="font-semibold">AED {(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-accent/30 pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold">Total</span>
                                        <span className="text-2xl font-bold text-accent">AED {total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="mt-4 p-3 bg-background rounded text-xs text-muted">
                                    <p className="font-semibold mb-1">✓ Free delivery within UAE</p>
                                    <p className="font-semibold">✓ Authentic products guaranteed</p>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-muted">Your cart is empty</p>
                                <p className="text-xs text-muted-foreground mt-2">Add items to proceed with order</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
