"use client"
import Link from "next/link"
import type { Product } from "@/app/types"
import { products } from "@/app/data/products"
import { useCart } from "@/app/context/CartContext"
import { useState } from "react"
import { useToast } from "@/app/components/Toast"

interface ProductsProps {
    limit?: number
    showViewAll?: boolean
}

const Products = ({ limit = 6, showViewAll = true }: ProductsProps) => {
    const { addItem } = useCart()
    const { show } = useToast()
    const [addingId, setAddingId] = useState<number | null>(null)

    const handleAdd = async (p: Product) => {
        setAddingId(p.id)
        await new Promise((r) => setTimeout(r, 400))
        addItem(p)
        setAddingId(null)
        show("Added to cart")
    }

    const visibleProducts = products.slice(0, limit)

    return (
        <section id="products" className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="h-[2px] w-8 md:w-12 bg-gradient-to-r from-transparent via-primary to-primary rounded-full"></div>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
                            <span className="relative text-xs md:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent px-4 py-1.5 border-2 border-primary/30 rounded-full backdrop-blur-sm">
                                🔥 BESTSELLERS
                            </span>
                        </div>
                        <div className="h-[2px] w-8 md:w-12 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance relative inline-block">
                        <span className="relative">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
                                Terea Heats
                            </span>{" "}
                            <span className="text-foreground">Collection</span>
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 md:w-40 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
                        </span>
                    </h2>
                    <p className="text-lg text-muted max-w-2xl mx-auto">
                        Explore authentic Terea Heats sticks in popular flavors and balanced profiles.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                    {visibleProducts.map((product) => (
                        <div
                            key={product.id}
                            className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-smooth h-full flex flex-col"
                        >
                            <div className="relative overflow-hidden bg-gray-100 h-32 md:h-56">
                                <img
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    className="object-cover w-full h-full group-hover:scale-110 transition-smooth"
                                />
                            </div>
                            <div className="p-3 md:p-6 flex flex-col flex-grow">
                                <h3 className="text-sm md:text-xl font-semibold mb-1 md:mb-2 group-hover:text-accent transition-smooth line-clamp-2">
                                    {product.name}
                                </h3>
                                <p className="hidden md:block text-muted text-sm mb-4 flex-grow">{product.description}</p>
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-3 mt-auto">
                                    <div className="flex flex-col gap-1">
                                        {product.originalPrice && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs md:text-sm text-muted line-through">AED {product.originalPrice}</span>
                                                <span className="text-[10px] md:text-xs bg-red-500 text-white px-1.5 md:px-2 py-0.5 rounded font-bold">
                                                    SALE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                                </span>
                                            </div>
                                        )}
                                        <span className="text-base md:text-2xl font-bold text-accent">AED {product.price}</span>
                                    </div>
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <button
                                            onClick={() => handleAdd(product)}
                                            disabled={addingId === product.id}
                                            className="flex-1 md:flex-none px-2 md:px-4 py-2 bg-primary text-background rounded-md text-xs md:text-base font-semibold hover:bg-primary-light transition-smooth disabled:opacity-60"
                                        >
                                            {addingId === product.id ? "..." : "Add To Cart"}
                                        </button>
                                        <Link href={`/products/${product.id}`} className="text-primary font-semibold text-xs md:text-sm">
                                            View →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {showViewAll && (
                    <div className="text-center mt-12">
                        <Link
                            href="/listings"
                            className="inline-block px-6 py-3 bg-accent text-background rounded-md font-semibold hover:bg-accent/90 transition-smooth"
                        >
                            View All Listings →
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Products
