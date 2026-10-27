import type { Metadata } from "next"
import Hero from "./components/home/Hero"
import { languageAlternates } from "./lib/seo"
import Collections from "./components/home/Collections"
import TereaShowcase from "./components/home/TereaShowcase"
import CategoryBand from "./components/home/CategoryBand"
import Delivery from "./components/home/Delivery"
import FlavourFinder from "./components/home/FlavourFinder"
import OriginCompare from "./components/home/OriginCompare"
import SeoContent from "./components/home/SeoContent"
import FAQ from "./components/FAQ"
import Reveal from "./components/Reveal"
import { faqItems } from "./data/faq"
import { priceRange, products } from "./data/products"
import { ORIGIN_LIST, STORE } from "./data/store"
import { EMIRATE_PAGES } from "./data/emirates"

export const metadata: Metadata = {
    alternates: { canonical: "/", languages: languageAlternates("/") },
}

export default function Home() {
    const { min, max } = priceRange(products)

    // Structured data for local SEO. Only facts shown on the site — no ratings, since we don't collect reviews yet.
    const schemas = [
        {
            // Online-only store that delivers UAE-wide — no physical shop, so no street address or map pin.
            "@context": "https://schema.org",
            "@type": "OnlineStore",
            "@id": `${STORE.url}/#store`,
            name: STORE.name,
            alternateName: ["IQOS Store Dubai", "IQOS UAE", "TEREA Dubai"],
            description:
                `Online IQOS store delivering across the UAE. Authentic TEREA sticks from ${ORIGIN_LIST}, IQOS ILUMA devices and VGOD STIG pods. Same-day delivery in Dubai.`,
            url: STORE.url,
            logo: `${STORE.url}/icon`,
            image: `${STORE.url}/opengraph-image`,
            email: STORE.email,
            telephone: "+971561928359",
            priceRange: `AED ${min} - AED ${max}`,
            currenciesAccepted: "AED",
            paymentAccepted: ["Cash", "Bank Transfer", "Cash on Delivery"],
            areaServed: [
                { "@type": "Country", name: "United Arab Emirates" },
                ...EMIRATE_PAGES.map((e) => ({ "@type": "City", name: e.name })),
            ],
            contactPoint: [
                {
                    "@type": "ContactPoint",
                    contactType: "customer service",
                    telephone: `+${STORE.whatsapp}`,
                    areaServed: "AE",
                    availableLanguage: ["English", "Arabic"],
                    hoursAvailable: {
                        "@type": "OpeningHoursSpecification",
                        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                        opens: "00:00",
                        closes: "23:59",
                    },
                },
            ],
            sameAs: [`https://wa.me/${STORE.whatsapp}`],
        },
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${STORE.url}/#website`,
            url: STORE.url,
            name: STORE.name,
            potentialAction: {
                "@type": "SearchAction",
                target: `${STORE.url}/listings?q={search_term_string}`,
                "query-input": "required name=search_term_string",
            },
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
        },
    ]

    return (
        <>
            {schemas.map((schema, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            ))}
            <Hero />
            <Reveal>
                <Collections />
            </Reveal>
            <Reveal>
                <TereaShowcase />
            </Reveal>
            <Reveal>
                <FlavourFinder />
            </Reveal>
            <OriginCompare />
            <Reveal>
                <CategoryBand category="iluma" dark />
            </Reveal>
            <Reveal>
                <CategoryBand category="stig" />
            </Reveal>
            <Reveal>
                <Delivery />
            </Reveal>
            <Reveal>
                <FAQ />
            </Reveal>
            <SeoContent />
        </>
    )
}
