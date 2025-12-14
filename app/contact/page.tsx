"use client"

import type React from "react"
import { useState } from "react"

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                message: `${formData.subject ? `Subject: ${formData.subject}\n\n` : ""}${formData.message}`,
                selectedProducts: [],
            }
            const res = await fetch("/api/send-inquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })
            if (!res.ok) throw new Error("Failed to send")
            setSubmitStatus("success")
            setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
            setTimeout(() => setSubmitStatus("idle"), 5000)
        } catch (error) {
            setSubmitStatus("error")
            setTimeout(() => setSubmitStatus("idle"), 5000)
        } finally {
            setIsSubmitting(false)
        }
    }

    const contactInfo = [
        {
            icon: "📧",
            title: "Email Us",
            value: "jawadrathore30@gmail.com",
            description: "Send us an email anytime",
            link: "mailto:jawadrathore30@gmail.com",
            color: "from-blue-400 to-cyan-500",
        },
        {
            icon: "📱",
            title: "Call Us",
            value: "+971 56 192 8359",
            description: "Mon-Sat 9am to 8pm",
            link: "tel:+971561928359",
            color: "from-green-400 to-emerald-500",
        },
        {
            icon: "💬",
            title: "WhatsApp",
            value: "Chat with us 24/7",
            description: "Instant support available",
            link: "https://wa.me/971561928359?text=Hello!%20I%20have%20a%20question",
            color: "from-green-500 to-teal-500",
        },
        {
            icon: "📍",
            title: "Location",
            value: "Dubai, UAE",
            description: "We deliver across UAE",
            link: "#",
            color: "from-purple-400 to-pink-500",
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-2 bg-accent/10 rounded-full mb-4">
                        <p className="text-accent font-semibold text-sm">📞 Contact Us</p>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">
                        Get in <span className="text-accent">Touch</span>
                    </h1>
                    <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
                        Have questions about our products? Need help with your order? We're here to help 24/7!
                    </p>
                </div>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {contactInfo.map((item, index) => (
                        <a
                            key={index}
                            href={item.link}
                            target={item.link.startsWith("http") ? "_blank" : undefined}
                            rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-accent/30 transform hover:-translate-y-1"
                        >
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                <span className="text-3xl">{item.icon}</span>
                            </div>
                            <h3 className="text-lg font-bold mb-1 group-hover:text-accent transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-sm font-semibold text-foreground mb-1">{item.value}</p>
                            <p className="text-xs text-muted">{item.description}</p>
                        </a>
                    ))}
                </div>

                {/* Contact Form & Info Section */}
                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border-2 border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                                    <span className="text-2xl">✉️</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">Send us a Message</h2>
                                    <p className="text-sm text-muted">We'll respond within 24 hours</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-foreground">
                                            Full Name <span className="text-accent">*</span>
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">👤</span>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                                                placeholder="Your name"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-foreground">
                                            Email Address <span className="text-accent">*</span>
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">📧</span>
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

                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-foreground">
                                            Phone Number <span className="text-accent">*</span>
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">📱</span>
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
                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-foreground">
                                            Subject <span className="text-accent">*</span>
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">📝</span>
                                            <input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                                                placeholder="What is this about?"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-foreground">
                                        Your Message <span className="text-accent">*</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all resize-none"
                                        placeholder="Tell us how we can help you..."
                                    />
                                </div>

                                {submitStatus === "success" && (
                                    <div className="flex items-center gap-3 p-4 bg-green-50 border-2 border-green-200 rounded-xl animate-fade-in">
                                        <span className="text-2xl">✅</span>
                                        <div>
                                            <p className="font-semibold text-green-700">Message sent successfully!</p>
                                            <p className="text-sm text-green-600">We'll get back to you within 24 hours.</p>
                                        </div>
                                    </div>
                                )}

                                {submitStatus === "error" && (
                                    <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl animate-fade-in">
                                        <span className="text-2xl">❌</span>
                                        <div>
                                            <p className="font-semibold text-red-700">Failed to send message</p>
                                            <p className="text-sm text-red-600">Please try again or contact us via WhatsApp.</p>
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-8 py-4 bg-gradient-to-r from-primary to-primary/90 text-background rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 group"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
                                            Sending Message...
                                        </>
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Info Sidebar */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Quick Contact */}
                        <div className="bg-gradient-to-br from-primary to-primary/90 rounded-2xl p-8 text-white shadow-xl">
                            <h3 className="text-2xl font-bold mb-4">Need Quick Help?</h3>
                            <p className="text-gray-200 mb-6">
                                For instant support, reach us on WhatsApp! We're available 24/7 to answer your questions.
                            </p>
                            <a
                                href="https://wa.me/971561928359?text=Hello!%20I%20need%20help%20with%20IQOS%20products"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                <span className="text-2xl">💬</span>
                                Chat on WhatsApp
                            </a>
                        </div>

                        {/* Business Hours */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                    <span className="text-xl">🕒</span>
                                </div>
                                <h3 className="text-xl font-bold">Business Hours</h3>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted">Monday - Saturday</span>
                                    <span className="font-semibold">9:00 AM - 8:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted">Sunday</span>
                                    <span className="font-semibold">10:00 AM - 6:00 PM</span>
                                </div>
                                <div className="pt-3 border-t border-gray-200">
                                    <div className="flex items-center gap-2 text-green-600">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        <span className="font-semibold">WhatsApp: 24/7 Available</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Why Contact Us */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                    <span className="text-xl">💡</span>
                                </div>
                                <h3 className="text-xl font-bold">We Can Help With</h3>
                            </div>
                            <ul className="space-y-3">
                                {[
                                    "Product recommendations",
                                    "Order tracking & support",
                                    "Delivery inquiries",
                                    "Bulk order pricing",
                                    "Product authenticity",
                                    "Payment assistance",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <span className="text-accent text-lg">✓</span>
                                        <span className="text-sm text-muted">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
