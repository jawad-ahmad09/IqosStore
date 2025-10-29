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
        question: "What is your delivery time?",
        answer: "We typically deliver within 5-7 business days. Express delivery options are available for urgent orders.",
    },
    {
        id: 2,
        question: "Do you offer international shipping?",
        answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.",
    },
    {
        id: 3,
        question: "What is your return policy?",
        answer: "We offer a 30-day money-back guarantee on all products. Items must be in original condition.",
    },
    {
        id: 4,
        question: "Are your products authentic?",
        answer: "100% authentic. All our products are sourced directly from manufacturers and come with warranty.",
    },
    {
        id: 5,
        question: "How can I track my order?",
        answer: "You'll receive a tracking number via email once your order ships. You can track it in real-time.",
    },
    {
        id: 6,
        question: "Do you offer bulk discounts?",
        answer: "Yes! Contact our sales team for bulk orders and special pricing on large quantities.",
    },
]

export default function FAQ() {
    const [openId, setOpenId] = useState<number | null>(null)

    return (
        <section id="faq" className="py-20 bg-background">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                        Frequently Asked <span className="text-accent">Questions</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Find answers to common questions about our products and services
                    </p>
                </div>

                <div className="space-y-4">
                    {faqItems.map((item, index) => (
                        <div
                            key={item.id}
                            className="animate-fade-in border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <button
                                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                                className="w-full px-6 py-4 flex items-center justify-between bg-card hover:bg-accent/5 transition-colors"
                            >
                                <span className="text-left font-semibold text-foreground">{item.question}</span>
                                <svg
                                    className={`w-5 h-5 text-accent transition-transform duration-300 ${openId === item.id ? "rotate-180" : ""}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </button>

                            {openId === item.id && (
                                <div className="px-6 py-4 bg-card/50 border-t border-border animate-slide-down">
                                    <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
