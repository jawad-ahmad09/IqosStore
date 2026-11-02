import type { Metadata } from "next"
import { STORE } from "@/app/data/store"

export const metadata: Metadata = {
    title: "Contact Us — WhatsApp, Phone & Email",
    description: "Contact IQOS Store UAE on WhatsApp 24/7, by phone or by email. Questions about TEREA flavours, IQOS ILUMA devices, orders or bulk pricing.",
    alternates: { canonical: "/contact" },
}

const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${STORE.name}`,
    url: `${STORE.url}/contact`,
    mainEntity: { "@id": `${STORE.url}/#store` },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            {children}
        </>
    )
}
