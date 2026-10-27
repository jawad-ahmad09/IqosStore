"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { STORE, whatsappLink } from "@/app/data/store"
import { faqItems } from "@/app/data/faq"
import { WhatsAppIcon } from "./WhatsAppButton"

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(0)

    return (
        <section id="faq" className="py-14 md:py-20">
            <div className="container-x grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                <div>
                    <span className="eyebrow">FAQ</span>
                    <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">Questions, answered</h2>
                    <p className="mt-4 max-w-sm text-ink-soft">Can&apos;t find what you need? We&apos;re on WhatsApp around the clock.</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <a href={whatsappLink("Hello! I have a question about your products.")} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                            <WhatsAppIcon size={18} /> Ask on WhatsApp
                        </a>
                        <a href={`mailto:${STORE.email}`} className="btn btn-ghost">
                            Email us
                        </a>
                    </div>
                </div>

                <div className="divide-y divide-line overflow-hidden rounded-[1.5rem] border border-line bg-paper">
                    {faqItems.map((item, i) => {
                        const isOpen = open === i
                        return (
                            <div key={item.question}>
                                <button
                                    onClick={() => setOpen(isOpen ? null : i)}
                                    aria-expanded={isOpen}
                                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6"
                                >
                                    <span className="font-display text-base font-bold md:text-lg">{item.question}</span>
                                    <span
                                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                                            isOpen ? "rotate-45 bg-ember text-white" : "bg-sand"
                                        }`}
                                    >
                                        <Plus size={16} />
                                    </span>
                                </button>
                                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                                    <div className="overflow-hidden">
                                        <p className="px-5 pb-5 leading-relaxed text-ink-soft md:px-6">{item.answer}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
