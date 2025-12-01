"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { products, getUniqueValues } from "@/app/data/products"
import type { Product } from "@/app/types"
import { useCart } from "@/app/context/CartContext"
import { useToast } from "@/app/components/Toast"
import { Search, X } from "lucide-react"

export default function AllListingsPage() {
    const { addItem } = useCart()
    const { show } = useToast()
    const [addingId, setAddingId] = useState<number | null>(null)
    const [searchQuery, setSearchQuery] = useState("")

    const maxPrice = products.reduce((m, p) => Math.max(m, p.price), 0)

    const [filters, setFilters] = useState({
        category: [] as string[],
        deviceType: [] as string[],
        flavor: [] as string[],
        priceRange: [0, Math.ceil(maxPrice)] as [number, number],
    })

    const [showFilters, setShowFilters] = useState(false)

    // ✅ Dynamic filters from actual products data
    const categories = useMemo(() => getUniqueValues("category"), [])
    const deviceTypes = useMemo(() => getUniqueValues("deviceType"), [])
    const flavors = useMemo(() => getUniqueValues("flavor"), [])

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            // Search query filter
            const searchMatch = searchQuery === "" ||
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.flavor?.toLowerCase().includes(searchQuery.toLowerCase())

            // Category filter
            const categoryMatch = filters.category.length === 0 ||
                (product.category && filters.category.includes(product.category))

            // Device Type filter (for IQOS devices)
            const deviceTypeMatch = filters.deviceType.length === 0 ||
                (product.deviceType && filters.deviceType.includes(product.deviceType))

            // Flavor filter (for Terea sticks)
            const flavorMatch = filters.flavor.length === 0 ||
                (product.flavor && filters.flavor.includes(product.flavor))

            // Price filter
            const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]

            return searchMatch && categoryMatch && deviceTypeMatch && flavorMatch && priceMatch
        })
    }, [filters, searchQuery])

    const handleFilterChange = (type: keyof typeof filters, value: string) => {
        setFilters((prev) => {
            const current = prev[type] as string[]
            if (current.includes(value)) {
                return {
                    ...prev,
                    [type]: current.filter((v) => v !== value),
                }
            } else {
                return {
                    ...prev,
                    [type]: [...current, value],
                }
            }
        })
    }

    const handleAdd = async (product: Product) => {
        setAddingId(product.id)
        await new Promise((r) => setTimeout(r, 400))
        addItem(product)
        setAddingId(null)
        show("Added to cart")
    }

    const clearFilters = () => {
        setFilters({
            category: [],
            deviceType: [],
            flavor: [],
            priceRange: [0, Math.ceil(maxPrice)],
        })
        setSearchQuery("")
    }

    const activeFilterCount = filters.category.length + filters.deviceType.length + filters.flavor.length

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-12">
                    <nav className="text-sm text-muted mb-6">
                        <Link href="/" className="hover:underline">
                            Home
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-foreground">All Listings</span>
                    </nav>

                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                            Terea Heats & IQOS <span className="text-accent">Collection</span>
                        </h1>
                        <p className="text-lg text-muted max-w-2xl mx-auto">
                            Explore our complete collection of authentic Terea Heats sticks and IQOS devices
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mb-8">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted" size={20} />
                            <input
                                type="text"
                                placeholder="Search products by name, flavor, or description..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-12 py-4 border-2 border-border rounded-xl bg-white focus:outline-none focus:border-accent transition-smooth text-lg"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted hover:text-accent transition-smooth"
                                >
                                    <X size={20} />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 mb-6">
                        <p className="text-muted">
                            Showing <span className="font-semibold text-accent">{filteredProducts.length}</span> of{" "}
                            <span className="font-semibold">{products.length}</span> products
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="lg:hidden px-4 py-2 bg-primary text-background rounded-lg font-semibold hover:bg-primary-light transition-smooth flex items-center gap-2"
                            >
                                Filters
                                {activeFilterCount > 0 && (
                                    <span className="bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {activeFilterCount}
                                    </span>
                                )}
                            </button>

                            {(activeFilterCount > 0 || searchQuery) && (
                                <button
                                    onClick={clearFilters}
                                    className="px-4 py-2 border border-border rounded-lg font-semibold hover:bg-background transition-smooth flex items-center gap-2"
                                >
                                    <X size={16} /> Clear All
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar - Always Open on Desktop */}
                    <div
                        className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"
                            } bg-white rounded-xl shadow-md p-6 h-fit sticky top-24 space-y-6`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Filters</h2>
                            <button
                                onClick={() => setShowFilters(false)}
                                className="lg:hidden text-muted hover:text-foreground"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Category Filter - Always Open */}
                        <div className="pb-6 border-b border-border">
                            <h3 className="font-semibold text-foreground mb-3">Category</h3>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <label key={category} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={filters.category.includes(category)}
                                            onChange={() => handleFilterChange("category", category)}
                                            className="w-4 h-4 rounded border-border text-accent focus:ring-accent cursor-pointer"
                                        />
                                        <span className="text-sm group-hover:text-accent transition-colors">{category}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Device Type Filter - Always Open */}
                        {deviceTypes.length > 0 && (
                            <div className="pb-6 border-b border-border">
                                <h3 className="font-semibold text-foreground mb-3">Device Type</h3>
                                <div className="space-y-2">
                                    {deviceTypes.map((deviceType) => (
                                        <label key={deviceType} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={filters.deviceType.includes(deviceType)}
                                                onChange={() => handleFilterChange("deviceType", deviceType)}
                                                className="w-4 h-4 rounded border-border text-accent focus:ring-accent cursor-pointer"
                                            />
                                            <span className="text-sm group-hover:text-accent transition-colors">{deviceType}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Flavor Filter - Always Open */}
                        <div className="pb-6 border-b border-border">
                            <h3 className="font-semibold text-foreground mb-3">Flavor ({flavors.length})</h3>
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                {flavors.map((flavor) => (
                                    <label key={flavor} className="flex items-center gap-3 cursor-pointer group py-1">
                                        <input
                                            type="checkbox"
                                            checked={filters.flavor.includes(flavor)}
                                            onChange={() => handleFilterChange("flavor", flavor)}
                                            className="w-4 h-4 rounded border-border text-accent focus:ring-accent cursor-pointer"
                                        />
                                        <span className="text-sm group-hover:text-accent transition-colors">{flavor}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range Filter - Always Open */}
                        <div>
                            <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        value={filters.priceRange[0]}
                                        onChange={(e) =>
                                            setFilters((prev) => ({
                                                ...prev,
                                                priceRange: [Number(e.target.value), prev.priceRange[1]],
                                            }))
                                        }
                                        className="w-full px-3 py-2 border border-border rounded text-sm focus:outline-none focus:border-accent"
                                        placeholder="Min"
                                        min="0"
                                    />
                                    <input
                                        type="number"
                                        value={filters.priceRange[1]}
                                        onChange={(e) =>
                                            setFilters((prev) => ({
                                                ...prev,
                                                priceRange: [prev.priceRange[0], Number(e.target.value)],
                                            }))
                                        }
                                        className="w-full px-3 py-2 border border-border rounded text-sm focus:outline-none focus:border-accent"
                                        placeholder="Max"
                                        min="0"
                                    />
                                </div>
                                <p className="text-sm text-muted">
                                    AED {filters.priceRange[0]} - AED {filters.priceRange[1]}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredProducts.map((product) => (
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
                                            {product.category && (
                                                <div className="absolute top-3 right-3 bg-accent text-white px-2 py-1 rounded text-xs font-semibold">
                                                    {product.category}
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            {/* Flavor and Intensity Badges */}
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {product.flavor && (
                                                    <span className="inline-block text-xs px-2 py-1 rounded bg-accent/10 text-accent border border-accent/30">
                                                        {product.flavor}
                                                    </span>
                                                )}
                                                {product.intensity && (
                                                    <span className="inline-block text-xs px-2 py-1 rounded bg-primary/10 text-primary border border-primary/30">
                                                        {product.intensity}
                                                    </span>
                                                )}
                                                {product.deviceType && (
                                                    <span className="inline-block text-xs px-2 py-1 rounded bg-accent/10 text-accent border border-accent/30">
                                                        {product.deviceType}
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-smooth">
                                                {product.name}
                                            </h3>
                                            <p className="text-muted text-sm mb-4 flex-grow line-clamp-2">
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
                                                        className="text-primary font-semibold text-sm hover:underline"
                                                    >
                                                        View →
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-white rounded-xl">
                                <p className="text-xl text-muted mb-4">No products found matching your criteria</p>
                                <div className="flex gap-3 justify-center">
                                    <button
                                        onClick={clearFilters}
                                        className="px-6 py-3 bg-primary text-background rounded-lg font-semibold hover:bg-primary-light transition-smooth"
                                    >
                                        Clear All Filters
                                    </button>
                                    <Link
                                        href="/"
                                        className="px-6 py-3 border border-border rounded-lg font-semibold hover:bg-background transition-smooth"
                                    >
                                        Go Home
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
