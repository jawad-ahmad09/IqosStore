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
        question: "How fast do you deliver Terea Heats?",
        answer: "Most orders arrive within 1-3 days. Same-day/next-day delivery may be available in select areas.",
    },
    {
        id: 2,
        question: "Are your Terea products authentic?",
        answer: "Yes. We only sell genuine Terea Heats, sourced from trusted suppliers.",
    },
    {
        id: 3,
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for sealed, unopened packs. Contact support to arrange a return.",
    },
    {
        id: 4,
        question: "Which Terea flavor should I choose?",
        answer: "Yellow for smooth balance, Turquoise for menthol, Amber for richer notes, Bronze for intensity.",
    },
    {
        id: 5,
        question: "How can I track my order?",
        answer: "You’ll receive a tracking link by email/SMS once your order ships for real-time updates.",
    },
    {
        id: 6,
        question: "Do you offer bulk pricing for Terea?",
        answer: "Yes. Reach out for wholesale or multi-pack discounts.",
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
