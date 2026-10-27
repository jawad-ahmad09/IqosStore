import Hero from "./components/home/Hero"
import Collections from "./components/home/Collections"
import TereaShowcase from "./components/home/TereaShowcase"
import CategoryBand from "./components/home/CategoryBand"
import Delivery from "./components/home/Delivery"
import FlavourFinder from "./components/home/FlavourFinder"
import OriginCompare from "./components/home/OriginCompare"
import FAQ from "./components/FAQ"
import Reveal from "./components/Reveal"
import { faqItems } from "./data/faq"
import { priceRange, products } from "./data/products"
import { STORE } from "./data/store"

export default function Home() {
    const { min, max } = priceRange(products)

    // Structured data for local SEO. Only facts shown on the site — no ratings, since we don't collect reviews yet.
    const schemas = [
        {
            "@context": "https://schema.org",
            "@type": "Store",
            "@id": `${STORE.url}/#store`,
            name: STORE.name,
            alternateName: ["IQOS Dubai", "Terea Store Dubai", "IQOS UAE Store"],
            description:
                "IQOS store in Dubai, UAE. Authentic TEREA sticks from Indonesia, Kazakhstan, Uzbekistan and Japan, IQOS ILUMA devices and VGOD STIG pods. Same-day delivery in Dubai.",
            url: STORE.url,
            telephone: "+971561928359",
            email: STORE.email,
            image: `${STORE.url}/HeroSection-Image.png`,
            priceRange: `AED ${min} - AED ${max}`,
            currenciesAccepted: "AED",
            paymentAccepted: ["Cash", "Bank Transfer", "Cash on Delivery"],
            address: {
                "@type": "PostalAddress",
                addressCountry: "AE",
                addressRegion: "Dubai",
                addressLocality: "Dubai",
            },
            geo: { "@type": "GeoCoordinates", latitude: "25.2048", longitude: "55.2708" },
            areaServed: { "@type": "Country", name: "United Arab Emirates" },
            openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                opens: "00:00",
                closes: "23:59",
            },
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
        </>
    )
}
