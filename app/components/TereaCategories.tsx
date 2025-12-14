"use client"

import Link from "next/link"
import { products } from "@/app/data/products"

const TereaCategories = () => {
    // Count products by region
    const kazakhstanCount = products.filter(p => p.region === "KAZAKHSTAN").length
    const indonesiaCount = products.filter(p => p.region === "Indonesia").length

    const categories = [
        {
            name: "Terea KAZAKHSTAN",
            description: "Authentic Terea flavors with Kazakhstan packaging",
            image: "/TereaGoldEdition.png",
            count: kazakhstanCount,
            region: "KAZAKHSTAN",
            gradient: "from-yellow-500 to-amber-600"
        },
        {
            name: "Terea Indonesia",
            description: "Premium Terea flavors with Indonesian packaging",
            image: "/Iqos-heets-Terea-Purple-Wave.png",
            count: indonesiaCount,
            region: "Indonesia",
            gradient: "from-purple-500 to-pink-600"
        }
    ]

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                        IQOS Dubai Products <span className="text-accent"> Categories Region</span>
                    </h2>
                    <p className="text-lg text-muted max-w-2xl mx-auto">
                        Browse our collection of Terea Heats organized by regional packaging
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {categories.map((category) => (
                        <Link
                            key={category.region}
                            href={`/listings?region=${category.region}`}
                            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Background Image with Overlay */}
                            <div className="relative h-80 overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90 group-hover:opacity-95 transition-opacity`} />
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-500"
                                />

                                {/* Content */}
                                <div className="relative h-full flex flex-col justify-end p-8 text-white">
                                    <div className="mb-3">
                                        <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                                            {category.count} Products
                                        </span>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-bold mb-2 group-hover:translate-x-2 transition-transform">
                                        {category.name}
                                    </h3>
                                    <p className="text-white/90 mb-4 group-hover:translate-x-2 transition-transform">
                                        {category.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-white font-semibold group-hover:translate-x-2 transition-transform">
                                        <span>Shop Now</span>
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
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

export default TereaCategories
