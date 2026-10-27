import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Contact Us — WhatsApp, Phone & Email",
    description: "Contact IQOS Store UAE on WhatsApp 24/7, by phone or by email. Questions about TEREA flavours, IQOS ILUMA devices, orders or bulk pricing.",
    alternates: { canonical: "/contact" },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children
}
