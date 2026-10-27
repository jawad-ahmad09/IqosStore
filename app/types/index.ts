export type Category = "terea" | "iluma" | "stig"

export type Region = "Indonesia" | "Kazakhstan" | "Uzbekistan" | "Japan"

export interface Product {
    id: string // URL slug
    name: string
    category: Category
    region?: Region // TEREA only
    line?: string // ILUMA / STIG model line, e.g. "ILUMA Prime", "STIG XL"
    family: string // Tobacco, Menthol, Capsule, Fruit, Device...
    notes: string
    intensity?: string
    description: string
    specs: string[]
    price: number
    compareAt?: number
    inStock: boolean
    images: string[]
}

export interface CartLine {
    id: string
    quantity: number
}

export interface CartItem extends CartLine {
    product: Product
}

export interface ContactFormData {
    name: string
    email: string
    phone: string
    address?: string
    emirate?: string
    message?: string
    items?: CartLine[]
}
