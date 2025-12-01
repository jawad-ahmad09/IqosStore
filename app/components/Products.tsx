"use client"
import Link from "next/link"
import type { Product } from "@/app/types"
import { products } from "@/app/data/products"
import { useCart } from "@/app/context/CartContext"
import { useState } from "react"
import { useToast } from "@/app/components/Toast"

interface ProductsProps {
    limit?: number // 👈 add this so we can control how many to show
    showViewAll?: boolean // 👈 toggle the "View All Listings" button
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

    // ✅ only show first `limit` products
    const visibleProducts = products.slice(0, limit)

    return (
        <section id="products" className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                        Terea Heats Collection
                    </h2>
                    <p className="text-lg text-muted max-w-2xl mx-auto">
                        Explore authentic Terea Heats sticks in popular flavors and balanced profiles.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {visibleProducts.map((product) => (
                        <div
                            key={product.id}
                            className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-smooth h-full flex flex-col"
                        >
                            <div className="relative overflow-hidden bg-gray-100 h-56">
                                <img
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    className="object-cover w-full h-full group-hover:scale-110 transition-smooth"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-smooth">
                                    {product.name}
                                </h3>
                                <p className="text-muted text-sm mb-4 flex-grow">
                                    {product.description}
                                </p>
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-2xl font-bold text-accent">AED {product.price}</span>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => handleAdd(product)}
                                            disabled={addingId === product.id}
                                            className="px-4 py-2 bg-primary text-background rounded-md font-semibold hover:bg-primary-light transition-smooth disabled:opacity-60"
                                        >
                                            {addingId === product.id ? "Adding..." : "Add to Cart"}
                                        </button>
                                        <Link
                                            href={`/products/${product.id}`}
                                            className="text-primary font-semibold text-sm"
                                        >
                                            View →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ✅ Show "View All Listings" only if enabled */}
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
