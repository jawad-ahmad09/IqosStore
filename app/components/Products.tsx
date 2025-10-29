"use client"
import Link from "next/link"
import type { Product } from "@/app/types"

const products: Product[] = [
    {
        id: 1,
        name: "JAWADDDDDD Bag",
        description: "Handcrafted leather bag with premium finishing",
        price: 199.99,
        image: "/ProductImage.png",
    },
    {
        id: 2,
        name: "Luxury Watch",
        description: "Swiss-made luxury timepiece with elegant design",
        price: 499.99,
        image: "/ProductImage.png",

    },
    {
        id: 3,
        name: "Designer Sunglasses",
        description: "UV-protected designer sunglasses with style",
        price: 299.99,
        image: "/ProductImage.png",

    },
    {
        id: 4,
        name: "Silk Scarf",
        description: "100% pure silk scarf with vibrant patterns",
        price: 149.99,
        image: "/ProductImage.png",

    },
    {
        id: 5,
        name: "Premium Perfume",
        description: "Exotic fragrance with long-lasting aroma",
        price: 179.99,
        image: "/ProductImage.png",

    },
    {
        id: 6,
        name: "Cashmere Sweater",
        description: "Soft cashmere sweater in classic colors",
        price: 349.99,
        image: "/ProductImage.png",

    },
]

const Products = () => {
    return (
        <section id="products" className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Our Collection</h2>
                    <p className="text-lg text-muted max-w-2xl mx-auto">
                        Handpicked premium products selected for quality and elegance
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <Link key={product.id} href={`/products/${product.id}`}>
                            <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-smooth cursor-pointer h-full flex flex-col">
                                <div className="relative overflow-hidden bg-gray-100 h-64">
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
                                    <p className="text-muted text-sm mb-4 flex-grow">{product.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold text-accent">${product.price}</span>
                                        <span className="text-primary font-semibold text-sm">View Details →</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Products
