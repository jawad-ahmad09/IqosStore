"use client"

import type React from "react"
import { useState } from "react"
import { CheckCircle2, Loader2, Mail, MapPin, Phone } from "lucide-react"
import { WhatsAppIcon } from "@/app/components/WhatsAppButton"
import { STORE, whatsappLink } from "@/app/data/store"

const EMPTY_FORM = { name: "", email: "", phone: "", subject: "", message: "", website: "" }

export default function ContactPage() {
    const [formData, setFormData] = useState(EMPTY_FORM)
    const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitStatus("sending")
        try {
            const res = await fetch("/api/send-inquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: `${formData.subject ? `Subject: ${formData.subject}\n\n` : ""}${formData.message}`,
                    website: formData.website,
                }),
            })
            if (!res.ok) throw new Error("Failed to send")
            setSubmitStatus("success")
            setFormData(EMPTY_FORM)
        } catch {
            setSubmitStatus("error")
        }
    }

    const channels = [
        { icon: WhatsAppIcon, title: "WhatsApp · 24/7", value: STORE.whatsappDisplay, href: whatsappLink("Hello! I have a question."), accent: "#25D366" },
        { icon: Phone, title: "Call us", value: STORE.phone, href: STORE.phoneHref, accent: "var(--color-ember)" },
        { icon: Mail, title: "Email", value: STORE.email, href: `mailto:${STORE.email}`, accent: "var(--color-iluma)" },
        { icon: MapPin, title: "Location", value: "Dubai — delivering UAE-wide", href: undefined, accent: "var(--color-gold)" },
    ]

    return (
        <div className="pb-16">
            <section className="grain relative overflow-hidden bg-night text-white">
                <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-ember/40 blur-[100px]" />
                <div className="container-x relative py-12 md:py-16">
                    <span className="eyebrow">Contact</span>
                    <h1 className="mt-3 text-4xl font-extrabold md:text-6xl">We&apos;re here to help</h1>
                    <p className="mt-3 max-w-xl text-white/65">
                        Questions about a flavour, an order or bulk pricing? WhatsApp is the fastest way to reach us.
                    </p>
                </div>
            </section>

            <div className="container-x -mt-6 grid gap-6 md:-mt-8 lg:grid-cols-[1fr_1.3fr] lg:gap-10">
                <div className="grid content-start gap-3">
                    {channels.map(({ icon: Icon, title, value, href, accent }) => {
                        const body = (
                            <>
                                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white" style={{ background: accent }}>
                                    <Icon size={22} />
                                </span>
                                <span className="min-w-0">
                                    <span className="block text-xs font-extrabold uppercase tracking-wider text-ink-faint">{title}</span>
                                    <span className="block truncate font-display text-lg font-bold">{value}</span>
                                </span>
                            </>
                        )
                        const className = "relative flex items-center gap-4 rounded-[1.5rem] border border-line bg-paper p-4 transition"
                        return href ? (
                            <a key={title} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={`${className} hover:-translate-y-0.5 hover:shadow-lg`}>
                                {body}
                            </a>
                        ) : (
                            <div key={title} className={className}>
                                {body}
                            </div>
                        )
                    })}
                </div>

                <div className="relative rounded-[1.75rem] border border-line bg-paper p-5 md:p-8">
                    {submitStatus === "success" ? (
                        <div className="py-12 text-center">
                            <CheckCircle2 size={56} className="mx-auto text-success" />
                            <h2 className="mt-4 text-2xl font-extrabold">Message sent</h2>
                            <p className="mt-2 text-ink-soft">Thanks! We&apos;ll get back to you shortly.</p>
                            <button onClick={() => setSubmitStatus("idle")} className="btn btn-ink mt-6">
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="relative space-y-4">
                        <input
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            tabIndex={-1}
                            autoComplete="off"
                            aria-hidden="true"
                            className="absolute -left-[9999px] h-0 w-0 opacity-0"
                        />
                            <h2 className="text-2xl font-extrabold">Send us a message</h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="block">
                                    <span className="mb-1.5 block text-sm font-bold">Name *</span>
                                    <input name="name" required value={formData.name} onChange={handleChange} className="field" autoComplete="name" />
                                </label>
                                <label className="block">
                                    <span className="mb-1.5 block text-sm font-bold">Phone *</span>
                                    <input name="phone" type="tel" required value={formData.phone} onChange={handleChange} className="field" autoComplete="tel" placeholder="+971 5X XXX XXXX" />
                                </label>
                            </div>
                            <label className="block">
                                <span className="mb-1.5 block text-sm font-bold">Email</span>
                                <input name="email" type="email" value={formData.email} onChange={handleChange} className="field" autoComplete="email" />
                            </label>
                            <label className="block">
                                <span className="mb-1.5 block text-sm font-bold">Subject</span>
                                <input name="subject" value={formData.subject} onChange={handleChange} className="field" />
                            </label>
                            <label className="block">
                                <span className="mb-1.5 block text-sm font-bold">Message *</span>
                                <textarea name="message" required rows={5} value={formData.message} onChange={handleChange} className="field resize-none" />
                            </label>
                            {submitStatus === "error" && (
                                <p className="rounded-2xl bg-danger/10 p-4 text-sm font-semibold text-danger">
                                    Something went wrong. Please try again or message us on WhatsApp.
                                </p>
                            )}
                            <button type="submit" disabled={submitStatus === "sending"} className="btn btn-ember w-full py-4 text-base disabled:opacity-70">
                                {submitStatus === "sending" && <Loader2 size={18} className="animate-spin" />}
                                {submitStatus === "sending" ? "Sending…" : "Send message"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
