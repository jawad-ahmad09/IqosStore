"use client"

import type React from "react"
import { useState } from "react"
import type { CartItem, ContactFormData } from "@/app/types"

interface InquiryFormProps {
    cartItems: CartItem[]
    onSubmit: (data: ContactFormData) => void
}

const InquiryForm = ({ cartItems, onSubmit }: InquiryFormProps) => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        phone: "",
        message: "",
        selectedProducts: cartItems,
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Create WhatsApp message
            const productsList = cartItems.map((p) => `${p.name} (Qty: ${p.quantity}) - $${p.price}`).join("\n")

            const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

            const message = `*New Product Inquiry*

*Customer Details:*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

*Selected Products:*
${productsList}

*Total: $${total.toFixed(2)}*

${formData.message ? `*Message:*\n${formData.message}` : ""}`

            // Replace with your WhatsApp number (without + or spaces)
            const whatsappNumber = "1234567890"
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

            // Also send email notification (you can integrate with email service)
            console.log("Form submitted:", formData)

            // Open WhatsApp
            window.open(whatsappUrl, "_blank")

            // Reset form
            setFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
                selectedProducts: cartItems,
            })

            alert("Inquiry sent successfully! Opening WhatsApp...")
        } catch (error) {
            console.error("Error submitting form:", error)
            alert("Error submitting inquiry. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-8">Complete Your Inquiry</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                    <label className="block text-sm font-semibold mb-2">Full Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Your name"
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
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="your@email.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="+1 (555) 123-4567"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Total Amount</label>
                    <div className="w-full px-4 py-3 border border-border rounded-lg bg-background text-accent font-bold text-lg">
                        ${total.toFixed(2)}
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <label className="block text-sm font-semibold mb-2">Additional Message</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent h-32 resize-none"
                    placeholder="Any special requests or questions?"
                />
            </div>

            <div className="mb-8 bg-background p-6 rounded-lg">
                <h3 className="font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                            <span>
                                {item.name} × {item.quantity}
                            </span>
                            <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
                <div className="border-t border-border mt-4 pt-4 flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-accent">${total.toFixed(2)}</span>
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting || cartItems.length === 0}
                className="w-full bg-primary text-background py-4 rounded-lg font-semibold hover:bg-primary-light transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Sending..." : "Send Inquiry via WhatsApp"}
            </button>

            <p className="text-xs text-muted text-center mt-4">By submitting, you agree to our terms and conditions</p>
        </form>
    )
}

export default InquiryForm
