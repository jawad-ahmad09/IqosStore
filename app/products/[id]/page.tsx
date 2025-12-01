"use client"

import { useParams, useRouter } from "next/navigation"
import { getProductById } from "@/app/data/products"
import { useCart } from "@/app/context/CartContext"
import { useToast } from "@/app/components/Toast"
import { useState, useEffect } from "react"

export default function ProductDetailPage() {
    const params = useParams<{ id: string }>()
    const router = useRouter()
    const { addItem } = useCart()
    const { show } = useToast()
    const [adding, setAdding] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [selectedImage, setSelectedImage] = useState(0)

    const id = Number(params.id)
    const product = getProductById(id)

    // Handle multiple images - if product has images array, use it; otherwise use single image
    const productImages = product?.images || (product?.image ? [product.image] : [])

    // Update page title and meta tags dynamically
    useEffect(() => {
        if (product) {
            const isTerea = product.category === "Terea Heats"
            const title = `${product.name} | ${isTerea ? 'Terea Heats' : 'IQOS Device'} | IQOS Store UAE`
            const description = `Buy ${product.name} in UAE. ${product.description} Price: AED ${product.price}. Free delivery in Dubai & UAE. 100% Authentic. Order now!`

            document.title = title

            // Update meta description
            let metaDesc = document.querySelector('meta[name="description"]')
            if (!metaDesc) {
                metaDesc = document.createElement('meta')
                metaDesc.setAttribute('name', 'description')
                document.head.appendChild(metaDesc)
            }
            metaDesc.setAttribute('content', description)

            // Update OG tags
            let ogTitle = document.querySelector('meta[property="og:title"]')
            if (!ogTitle) {
                ogTitle = document.createElement('meta')
                ogTitle.setAttribute('property', 'og:title')
                document.head.appendChild(ogTitle)
            }
            ogTitle.setAttribute('content', title)

            let ogDesc = document.querySelector('meta[property="og:description"]')
            if (!ogDesc) {
                ogDesc = document.createElement('meta')
                ogDesc.setAttribute('property', 'og:description')
                document.head.appendChild(ogDesc)
            }
            ogDesc.setAttribute('content', description)

            let ogImage = document.querySelector('meta[property="og:image"]')
            if (!ogImage) {
                ogImage = document.createElement('meta')
                ogImage.setAttribute('property', 'og:image')
                document.head.appendChild(ogImage)
            }
            ogImage.setAttribute('content', productImages[0])
        }
    }, [product, productImages])

    if (!product) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-20">
                <div className="container mx-auto px-4">
                    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg text-center max-w-md mx-auto">
                        <span className="text-5xl mb-3 block">❌</span>
                        <p className="text-xl font-bold mb-2">Product not found</p>
                        <p className="text-sm text-muted mb-4">The product you're looking for doesn't exist.</p>
                        <button
                            onClick={() => router.push("/")}
                            className="px-5 py-2.5 bg-primary text-background rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
                        >
                            ← Go back home
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const isTerea = product.category === "Terea Heats"
    const isDevice = product.category === "IQOS Device"

    // Structured Data for SEO (JSON-LD)
    const structuredData = product ? {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": productImages,
        "brand": {
            "@type": "Brand",
            "name": "IQOS"
        },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "AED",
            "price": product.price,
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": "IQOS Store UAE"
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "150"
        }
    } : null

    return (
        <>
            {/* Structured Data for Google Rich Results */}
            {structuredData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            )}

            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-20 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
                </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-muted mb-8">
                    <button onClick={() => router.push("/")} className="hover:text-accent transition-colors">Home</button>
                    <span>→</span>
                    <button onClick={() => router.push("/#products")} className="hover:text-accent transition-colors">Products</button>
                    <span>→</span>
                    <span className="text-foreground font-semibold">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Product Image Gallery */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
                            <div className="aspect-square flex items-center justify-center p-6 bg-gray-50">
                                <img
                                    src={productImages[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>

                        {/* Thumbnail Images */}
                        {productImages.length > 1 && (
                            <div className="grid grid-cols-4 gap-3">
                                {productImages.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                                            selectedImage === index
                                                ? 'border-accent shadow-md'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-contain bg-gray-50 p-2"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="space-y-4">
                        {/* Category Badge & Title */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                            <div className="mb-3">
                                <span className={`inline-block text-xs px-3 py-1.5 rounded-full font-semibold ${
                                    isTerea
                                        ? 'bg-accent/10 text-accent border border-accent/30'
                                        : 'bg-primary/10 text-primary border border-primary/30'
                                }`}>
                                    {product.category}
                                </span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold mb-3">{product.name}</h1>
                            <p className="text-muted leading-relaxed text-sm">{product.description}</p>
                        </div>

                        {/* Specifications - Different for Terea vs Devices */}
                        {isTerea ? (
                            // Terea Heats Specifications
                            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                                        <span className="text-base">📋</span>
                                    </div>
                                    <h2 className="text-lg font-bold">Specifications</h2>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-accent/5 border border-accent/20 rounded-lg p-3">
                                        <p className="text-xs text-muted mb-1">Total Puffs</p>
                                        <p className="font-bold text-sm">{product.TotalPuffs}</p>
                                    </div>
                                    <div className="bg-accent/5 border border-accent/20 rounded-lg p-3">
                                        <p className="text-xs text-muted mb-1">Origin</p>
                                        <p className="font-bold text-sm">{product.Origin}</p>
                                    </div>
                                    <div className="bg-accent/5 border border-accent/20 rounded-lg p-3">
                                        <p className="text-xs text-muted mb-1">Flavor</p>
                                        <p className="font-bold text-sm">{product.flavor}</p>
                                    </div>
                                    <div className="bg-accent/5 border border-accent/20 rounded-lg p-3">
                                        <p className="text-xs text-muted mb-1">Intensity</p>
                                        <p className="font-bold text-sm">{product.intensity}</p>
                                    </div>
                                    <div className="bg-accent/5 border border-accent/20 rounded-lg p-3 col-span-2">
                                        <p className="text-xs text-muted mb-1">Pack Size</p>
                                        <p className="font-semibold text-xs">1 carton, 200 sticks (10 packs)</p>
                                    </div>
                                    <div className="bg-accent/5 border border-accent/20 rounded-lg p-3 col-span-2">
                                        <p className="text-xs text-muted mb-1">Compatible Devices</p>
                                        <p className="font-semibold text-xs">IQOS Iluma One, IQOS Iluma Prime, IQOS Iluma Standard, IQOS Iluma Lambda i8</p>
                                    </div>
                                </div>
                            </div>
                        ) : isDevice ? (
                            // IQOS Device Specifications
                            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="text-base">⚙️</span>
                                    </div>
                                    <h2 className="text-lg font-bold">Device Specifications</h2>
                                </div>

                                <div className="space-y-3">
                                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                                        <p className="text-xs text-muted mb-1">Device Type</p>
                                        <p className="font-bold text-sm">{product.deviceType}</p>
                                    </div>

                                    {product.specifications && product.specifications.length > 0 && (
                                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                                            <p className="text-xs font-bold text-foreground mb-2">Key Features:</p>
                                            <ul className="space-y-1.5">
                                                {product.specifications.map((spec, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <span className="text-primary text-sm mt-0.5">✓</span>
                                                        <span className="text-xs text-muted">{spec}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Device Benefits */}
                                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                                        <p className="text-xs font-bold text-foreground mb-2">What's Included:</p>
                                        <ul className="space-y-1.5">
                                            <li className="flex items-center gap-2">
                                                <span className="text-green-500 text-sm">📦</span>
                                                <span className="text-xs text-muted">IQOS Device (Holder + Charger)</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="text-green-500 text-sm">🔌</span>
                                                <span className="text-xs text-muted">USB Power Adapter & Cable</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="text-green-500 text-sm">🧹</span>
                                                <span className="text-xs text-muted">Cleaning Tools & Accessories</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="text-green-500 text-sm">📖</span>
                                                <span className="text-xs text-muted">User Manual & Warranty Card</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ) : null}

                        {/* Price & Add to Cart */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-xs text-muted mb-1">Price</p>
                                    <span className="text-3xl font-bold text-accent">AED {product.price}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1.5">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-8 h-8 flex items-center justify-center bg-white rounded-md font-bold text-sm hover:bg-accent hover:text-white transition-all"
                                    >
                                        −
                                    </button>
                                    <span className="w-10 text-center font-bold text-base">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-8 h-8 flex items-center justify-center bg-white rounded-md font-bold text-sm hover:bg-accent hover:text-white transition-all"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2">
                                <button
                                    onClick={async () => {
                                        setAdding(true)
                                        await new Promise((r) => setTimeout(r, 400))
                                        addItem(product, quantity)
                                        setAdding(false)
                                        show("Added to cart")
                                    }}
                                    disabled={adding}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-primary/90 text-background rounded-lg font-bold text-sm hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {adding ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
                                            Adding...
                                        </>
                                    ) : (
                                        <>
                                            <span>🛒</span>
                                            <span>Add to Cart</span>
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={() => router.push("/#products")}
                                    className="px-5 py-3 bg-gray-100 text-foreground rounded-lg font-semibold text-sm hover:bg-gray-200 transition-all"
                                >
                                    ← Back
                                </button>
                            </div>
                        </div>

                        {/* Product Info Footer */}
                        <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/30 rounded-xl p-4">
                            <div className="flex items-start gap-2">
                                <span className="text-lg">ℹ️</span>
                                <div>
                                    <p className="font-semibold text-foreground text-sm mb-1">Product Guarantee</p>
                                    <p className="text-xs text-muted leading-relaxed">
                                        {isTerea
                                            ? "All Terea Heats are 100% genuine and sourced directly from authorized distributors. Compatible with IQOS Iluma devices only. Store in a cool, dry place away from direct sunlight."
                                            : "All IQOS devices come with official warranty and are 100% authentic. Includes full accessories package and user manual. Technical support available 24/7."
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
