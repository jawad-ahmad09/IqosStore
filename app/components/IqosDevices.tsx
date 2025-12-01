"use client"
import Link from "next/link"
import { useState } from "react"
import { products } from "@/app/data/products"
import { useCart } from "@/app/context/CartContext"
import { useToast } from "@/app/components/Toast"
import type { Product } from "@/app/types"

export default function IqosDevices() {
    const { addItem } = useCart()
    const { show } = useToast()
    const [addingId, setAddingId] = useState<number | null>(null)

    // Filter devices by type
    const iqosDevices = products.filter((p) => p.category === "IQOS Device")
    const standardDevices = iqosDevices.filter((p) => p.deviceType === "IQOS Standard")
    const premiumDevices = iqosDevices.filter((p) => p.deviceType === "IQOS Premium")
    const ilumaDevices = iqosDevices.filter((p) => p.deviceType === "IQOS Iluma")

    const handleAdd = async (product: Product) => {
        setAddingId(product.id)
        await new Promise((r) => setTimeout(r, 400))
        addItem(product)
        setAddingId(null)
        show("Device added to cart")
    }

    const DeviceCard = ({ product }: { product: Product }) => (
        <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-border hover:border-accent">
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 h-64">
                <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="object-contain w-full h-full p-6 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {product.deviceType}
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                    {product.name}
                </h3>
                <p className="text-muted text-sm mb-4 flex-grow line-clamp-3">
                    {product.description}
                </p>

                {/* Specifications */}
                {product.specifications && product.specifications.length > 0 && (
                    <div className="mb-4 space-y-1">
                        {product.specifications.slice(0, 3).map((spec, idx) => (
                            <div key={idx} className="flex items-center text-xs text-muted">
                                <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                                {spec}
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-border">
                    <span className="text-2xl font-bold text-accent">AED {product.price}</span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleAdd(product)}
                            disabled={addingId === product.id}
                            className="px-4 py-2 bg-primary text-background rounded-lg font-semibold hover:bg-primary-light transition-smooth disabled:opacity-60 text-sm"
                        >
                            {addingId === product.id ? "Adding..." : "Add to Cart"}
                        </button>
                        <Link
                            href={`/products/${product.id}`}
                            className="text-primary font-semibold text-sm hover:underline"
                        >
                            View →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <section id="iqos-devices" className="py-20 bg-gradient-to-b from-white to-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                        IQOS <span className="text-accent">Devices</span>
                    </h2>
                    <p className="text-lg text-muted max-w-2xl mx-auto">
                        Discover the perfect IQOS device for your lifestyle. From standard to premium, find your ideal heat-not-burn experience.
                    </p>
                </div>

                {/* IQOS Iluma Section */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-3xl font-bold mb-2">
                                IQOS <span className="text-accent">Iluma</span>
                            </h3>
                            <p className="text-muted">Blade-free induction technology - The future of heated tobacco</p>
                        </div>
                        <Link
                            href="/listings"
                            className="text-accent font-semibold hover:underline flex items-center gap-2"
                        >
                            View All Devices →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ilumaDevices.map((device) => (
                            <DeviceCard key={device.id} product={device} />
                        ))}
                    </div>
                </div>

                {/* IQOS Premium Section */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-3xl font-bold mb-2">
                                IQOS <span className="text-accent">Premium</span>
                            </h3>
                            <p className="text-muted">Exclusive designs and premium materials for the sophisticated user</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {premiumDevices.map((device) => (
                            <DeviceCard key={device.id} product={device} />
                        ))}
                    </div>
                </div>

                {/* IQOS Standard Section */}
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-3xl font-bold mb-2">
                                IQOS <span className="text-accent">Standard</span>
                            </h3>
                            <p className="text-muted">Reliable and trusted IQOS experience at great value</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {standardDevices.map((device) => (
                            <DeviceCard key={device.id} product={device} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
