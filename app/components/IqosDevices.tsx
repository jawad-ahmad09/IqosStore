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

    const iqosDevices = products.filter((p) => p.category === "IQOS Device")
    const ilumaPrimeDevices = iqosDevices.filter((p) => p.deviceType === "IQOS ILUMA PRIME KIT")
    const ilumaOneDevices = iqosDevices.filter((p) => p.deviceType === "IQOS ILUMA ONE")
    const ilumaStandardDevices = iqosDevices.filter((p) => p.deviceType === "IQOS ILUMA Standard Kit")

    const handleAdd = async (product: Product) => {
        setAddingId(product.id)
        await new Promise((r) => setTimeout(r, 400))
        addItem(product)
        setAddingId(null)
        show("Device added to cart")
    }

    const DeviceCard = ({ product }: { product: Product }) => (
        <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-border hover:border-accent">
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 h-36 md:h-64">
                <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="object-contain w-full h-full p-3 md:p-6 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-accent text-white px-1.5 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-semibold">
                    {product.deviceType}
                </div>
            </div>
            <div className="p-3 md:p-6 flex flex-col flex-grow">
                <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {product.name}
                </h3>
                <p className="hidden md:block text-muted text-sm mb-4 flex-grow line-clamp-3">{product.description}</p>

                {/* Specifications - hidden on mobile */}
                {product.specifications && product.specifications.length > 0 && (
                    <div className="hidden md:block mb-4 space-y-1">
                        {product.specifications.slice(0, 3).map((spec, idx) => (
                            <div key={idx} className="flex items-center text-xs text-muted">
                                <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                                {spec}
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-3 mt-auto pt-2 md:pt-4 border-t border-border">
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
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleAdd(product)}
                            disabled={addingId === product.id}
                            className="flex-1 md:flex-none px-2 md:px-4 py-2 bg-primary text-background rounded-lg text-xs md:text-sm font-semibold hover:bg-primary-light transition-smooth disabled:opacity-60"
                        >
                            {addingId === product.id ? "..." : "Add To Cart"}
                        </button>
                        <Link
                            href={`/products/${product.id}`}
                            className="text-primary font-semibold text-xs md:text-sm hover:underline"
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
                        Discover the perfect IQOS device for your lifestyle. From standard to premium, find your ideal heat-not-burn
                        experience.
                    </p>
                </div>

                {/* IQOS ILUMA PRIME KIT Section */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-2">
                                IQOS <span className="text-accent">ILUMA PRIME KIT</span>
                            </h3>
                            <p className="text-muted text-sm md:text-base">
                                Premium blade-free technology with auto-start and luxury design
                            </p>
                        </div>
                        <Link
                            href="/listings"
                            className="hidden md:flex text-accent font-semibold hover:underline items-center gap-2"
                        >
                            View All Devices →
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                        {ilumaPrimeDevices.map((device) => (
                            <DeviceCard key={device.id} product={device} />
                        ))}
                    </div>
                </div>

                {/* IQOS ILUMA ONE Section */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-2">
                                IQOS <span className="text-accent">ILUMA ONE</span>
                            </h3>
                            <p className="text-muted text-sm md:text-base">
                                Compact all-in-one device with blade-free technology
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                        {ilumaOneDevices.map((device) => (
                            <DeviceCard key={device.id} product={device} />
                        ))}
                    </div>
                </div>

                {/* IQOS ILUMA Standard Kit Section */}
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-2">
                                IQOS <span className="text-accent">ILUMA Standard Kit</span>
                            </h3>
                            <p className="text-muted text-sm md:text-base">Blade-free technology at great value with reliable performance</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                        {ilumaStandardDevices.map((device) => (
                            <DeviceCard key={device.id} product={device} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
