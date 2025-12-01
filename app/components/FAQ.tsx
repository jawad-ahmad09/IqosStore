"use client"

import { useState } from "react"

interface FAQItem {
    id: number
    question: string
    answer: string
}

const faqItems: FAQItem[] = [
    {
        id: 1,
        question: "🚚 How fast is delivery in UAE?",
        answer: "We offer express 2-hour delivery across UAE! Order before 8 PM for same-day delivery. Delivery is FREE for 2 or more items. Single item delivery: AED 10 in Dubai, AED 20 outside Dubai.",
    },
    {
        id: 2,
        question: "✅ Are your products 100% authentic?",
        answer: "Absolutely! All our Terea Heats and IQOS devices are sourced directly from verified authorized distributors. Every product comes with authenticity guarantee. We never sell counterfeits.",
    },
    {
        id: 3,
        question: "💰 What payment methods do you accept?",
        answer: "We accept Cash on Delivery (COD), bank transfers, and online payments. Payment is flexible and secure. No credit card? No problem - pay when you receive!",
    },
    {
        id: 4,
        question: "🎨 Which Terea flavor should I try first?",
        answer: "Popular choices: Purple Wave for fruity smooth taste, Yugen for mysterious blend, Turquoise for refreshing menthol, and Amber for rich classic flavor. Can't decide? Contact us for personalized recommendations!",
    },
    {
        id: 5,
        question: "📦 Is delivery free?",
        answer: "Delivery is FREE for orders with 2 or more items across all UAE! For single item orders: AED 10 in Dubai, AED 20 outside Dubai. Fast, safe shipping guaranteed!",
    },
    {
        id: 6,
        question: "💬 How can I contact support?",
        answer: "We're available 24/7 on WhatsApp! Click the green WhatsApp button on any page for instant help. You can also email us at jawadrathore30@gmail.com for detailed inquiries.",
    },
    {
        id: 7,
        question: "🔄 What's your return/exchange policy?",
        answer: "We offer hassle-free returns within 7 days for sealed, unopened products. If you receive a damaged item, we'll replace it immediately for free. Customer satisfaction is our priority!",
    },
    {
        id: 8,
        question: "🏆 Do you offer bulk/wholesale pricing?",
        answer: "Yes! We provide special discounts for bulk orders and regular customers. Contact us via WhatsApp or email for wholesale pricing and exclusive deals.",
    },
]

export default function FAQ() {
    const [openId, setOpenId] = useState<number | null>(null)

    return (
        <section id="faq" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 right-10 w-64 h-64 bg-accent rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-2 bg-accent/10 rounded-full mb-4">
                        <p className="text-accent font-semibold text-sm">Got Questions?</p>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                        Frequently Asked <span className="text-accent">Questions</span>
                    </h2>
                    <p className="text-lg text-muted max-w-2xl mx-auto">
                        Everything you need to know about IQOS Store UAE, products, and delivery
                    </p>
                </div>

                <div className="space-y-4">
                    {faqItems.map((item, index) => (
                        <div
                            key={item.id}
                            className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent/30 hover:shadow-xl"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <button
                                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                                className="w-full px-6 py-5 flex items-center justify-between hover:bg-accent/5 transition-colors group"
                            >
                                <span className="text-left font-semibold text-foreground text-lg group-hover:text-accent transition-colors">
                                    {item.question}
                                </span>
                                <div className={`w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center transition-all duration-300 ${openId === item.id ? "rotate-180 bg-accent" : "group-hover:bg-accent/20"}`}>
                                    <svg
                                        className={`w-5 h-5 transition-colors ${openId === item.id ? "text-white" : "text-accent"}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>

                            {openId === item.id && (
                                <div className="px-6 pb-5 bg-accent/5 border-t border-gray-100 animate-slide-down">
                                    <div className="pt-4">
                                        <p className="text-muted leading-relaxed text-base">{item.answer}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Still have questions CTA */}
                <div className="mt-12 text-center bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-8 text-white">
                    <h3 className="text-2xl font-bold mb-3">Still Have Questions?</h3>
                    <p className="text-gray-200 mb-6">We're here to help 24/7! Contact us via WhatsApp for instant support</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://wa.me/923491791107?text=Hello!%20I%20have%20a%20question%20about%20IQOS%20products"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            <span className="text-xl">💬</span>
                            WhatsApp Us
                        </a>
                        <a
                            href="mailto:jawadrathore30@gmail.com"
                            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all border-2 border-white/20 hover:border-white/40"
                        >
                            <span className="text-xl">📧</span>
                            Email Us
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
