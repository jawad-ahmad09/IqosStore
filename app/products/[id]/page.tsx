import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BadgeCheck, Clock, Truck } from "lucide-react"
import Breadcrumbs from "@/app/components/collection/Breadcrumbs"
import ProductRail from "@/app/components/home/ProductRail"
import { getProductById, getRelatedProducts, products } from "@/app/data/products"
import { CATEGORIES, REGIONS, STORE, listingHref } from "@/app/data/store"
import { DELIVERY, formatAED } from "@/app/lib/pricing"
import { discountPercent, isLimited } from "@/app/lib/product"
import { productFaqs } from "@/app/lib/productFaqs"
import { FaqList } from "@/app/components/collection/CollectionView"
import { EMIRATE_PAGES } from "@/app/data/emirates"
import ProductGallery from "./ProductGallery"
import ProductActions from "./ProductActions"

type Params = { params: Promise<{ id: string }> }

export function generateStaticParams() {
    return products.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const product = getProductById((await params).id)
    if (!product) return {}
    const where = product.region ? ` ${product.region}` : ""
    const title = `${product.name}${where} Dubai — ${formatAED(product.price)} | ${STORE.name}`
    const description = `Buy ${product.name}${where} in Dubai & UAE for ${formatAED(product.price)}. ${product.description || product.notes} Same-day delivery in Dubai, free on ${DELIVERY.freeFromItems}+ items.`
    return {
        title: { absolute: title },
        description: description.length > 300 ? `${description.slice(0, 297)}…` : description,
        alternates: { canonical: `/products/${product.id}` },
        openGraph: { title, description, type: "website", url: `/products/${product.id}` },
        twitter: { card: "summary_large_image", title, description },
    }
}

export default async function ProductPage({ params }: Params) {
    const product = getProductById((await params).id)
    if (!product) notFound()

    const related = getRelatedProducts(product, 4)
    const group = product.region
        ? { label: `TEREA ${product.region}`, href: listingHref({ category: "terea", region: product.region }), color: REGIONS[product.region].color }
        : { label: CATEGORIES[product.category].short, href: listingHref({ category: product.category }), color: CATEGORIES[product.category].color }
    const discount = discountPercent(product)

    const faqs = productFaqs(product)
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
    }

    const structuredData = {
        "@context": "https://schema.org/",
        "@type": "Product",
        name: product.name,
        description: product.description || product.notes,
        image: product.images.map((src) => `${STORE.url}${src}`),
        sku: product.id,
        brand: { "@type": "Brand", name: product.category === "stig" ? "VGOD" : "IQOS" },
        offers: {
            "@type": "Offer",
            url: `${STORE.url}/products/${product.id}`,
            priceCurrency: "AED",
            price: product.price,
            availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            itemCondition: "https://schema.org/NewCondition",
            seller: { "@id": `${STORE.url}/#store` },
            shippingDetails: {
                "@type": "OfferShippingDetails",
                shippingRate: { "@type": "MonetaryAmount", value: DELIVERY.dubai, currency: "AED" },
                shippingDestination: { "@type": "DefinedRegion", addressCountry: "AE" },
                deliveryTime: {
                    "@type": "ShippingDeliveryTime",
                    handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" },
                    transitTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
                },
            },
            hasMerchantReturnPolicy: {
                "@type": "MerchantReturnPolicy",
                applicableCountry: "AE",
                returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
                merchantReturnDays: 7,
            },
        },
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <div className="container-x py-6 md:py-10">
                <div className="mb-6">
                    <Breadcrumbs
                        items={[
                            ...(product.region ? [{ name: "TEREA", href: listingHref({ category: "terea" }) }] : []),
                            { name: product.region ?? CATEGORIES[product.category].short, href: group.href },
                            { name: product.name, href: `/products/${product.id}` },
                        ]}
                    />
                </div>

                <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
                    <ProductGallery key={product.id} images={product.images} name={`${product.name}${product.region ? ` ${product.region}` : ""}`} soldOut={!product.inStock} tint={group.color} />

                    <div className="lg:py-4">
                        <Link
                            href={group.href}
                            className="inline-flex items-center gap-2 rounded-full bg-paper px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider"
                        >
                            <span className="h-2 w-2 rounded-full" style={{ background: group.color }} />
                            {product.region ? `${product.region} edition` : product.line}
                        </Link>

                        <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">{product.name}</h1>
                        {product.notes && <p className="mt-2 text-lg text-ink-soft">{product.notes}</p>}

                        <div className="mt-6 flex flex-wrap items-end gap-3">
                            <span className="font-display text-4xl font-extrabold">{formatAED(product.price)}</span>
                            {product.compareAt && (
                                <>
                                    <span className="pb-1 text-lg text-ink-faint line-through">{formatAED(product.compareAt)}</span>
                                    <span className="mb-1.5 rounded-full bg-ember px-2.5 py-1 text-xs font-extrabold text-white">Save {discount}%</span>
                                </>
                            )}
                        </div>
                        {product.category === "terea" && <p className="mt-1 text-sm text-ink-soft">Per carton · 10 packs × 20 sticks</p>}

                        <div className="mt-6 flex flex-wrap gap-2">
                            {isLimited(product) && (
                                <span className="rounded-full bg-gradient-to-r from-gold to-[#e9c987] px-3 py-1.5 text-xs font-extrabold text-ink">Limited edition</span>
                            )}
                            <span className="rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-bold">{product.family}</span>
                            {product.intensity && (
                                <span className="rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-bold">Intensity: {product.intensity}</span>
                            )}
                            <span
                                className={`rounded-full px-3 py-1.5 text-xs font-bold ${product.inStock ? "bg-success/10 text-success" : "bg-ink text-white"}`}
                            >
                                {product.inStock ? "● In stock" : "Sold out"}
                            </span>
                        </div>

                        <ProductActions key={product.id} product={product} />

                        <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                            {[
                                { icon: Clock, title: "Same day", text: "Dubai, before 12PM" },
                                { icon: Truck, title: `Free ${DELIVERY.freeFromItems}+ items`, text: `Else from ${formatAED(DELIVERY.dubai)}` },
                                { icon: BadgeCheck, title: "Authentic", text: "Sealed stock" },
                            ].map(({ icon: Icon, title, text }) => (
                                <div key={title} className="rounded-2xl bg-paper p-3">
                                    <Icon size={18} className="mx-auto text-ember" />
                                    <p className="mt-1.5 text-xs font-extrabold md:text-sm">{title}</p>
                                    <p className="text-[11px] text-ink-soft md:text-xs">{text}</p>
                                </div>
                            ))}
                        </div>

                        {product.description && (
                            <div className="mt-8">
                                <h2 className="text-lg font-extrabold">About this product</h2>
                                <p className="mt-2 leading-relaxed text-ink-soft">{product.description}</p>
                            </div>
                        )}

                        {product.specs.length > 0 && (
                            <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-paper">
                                <h2 className="border-b border-line px-4 py-3 text-sm font-extrabold uppercase tracking-wider">Details</h2>
                                <ul className="divide-y divide-line">
                                    {product.specs.map((spec) => (
                                        <li key={spec} className="px-4 py-3 text-sm">{spec}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-16 grid gap-10 md:mt-20 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
                    <section>
                        <h2 className="mb-4 text-2xl font-extrabold md:text-3xl">Questions about {product.name}</h2>
                        <FaqList faqs={faqs} />
                    </section>
                    <section>
                        <h2 className="text-2xl font-extrabold md:text-3xl">Delivery across the UAE</h2>
                        <p className="mt-3 text-ink-soft">
                            {product.name} ships to every emirate — same day in Dubai before 12PM, next day elsewhere.
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {EMIRATE_PAGES.map((e) => (
                                <Link key={e.slug} href={`/delivery/${e.slug}`} className="chip !py-1.5 !text-xs">
                                    {e.name}
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>

                {related.length > 0 && (
                    <section className="mt-16 md:mt-24">
                        <div className="mb-6 flex items-end justify-between">
                            <h2 className="text-2xl font-extrabold md:text-4xl">You may also like</h2>
                            <Link href={group.href} className="text-sm font-bold text-ember">View all</Link>
                        </div>
                        <ProductRail products={related} />
                    </section>
                )}
            </div>
        </>
    )
}
