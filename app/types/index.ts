export interface Product {
    id: number
    name: string
    description: string
    TotalPuffs?: string
    Origin?: string
    price: number
    image: string
    images?: string[] // Multiple images support
    flavor?: string
    device?: string
    stickType?: string
    intensity?: string
    category?: "Terea Heats" | "IQOS Device"
    deviceType?: "IQOS ILUMA PRIME KIT" | "IQOS ILUMA ONE" | "IQOS ILUMA Standard Kit"
    specifications?: string[]
}

export interface CartItem extends Product {
    quantity: number
}

export interface ContactFormData {
    name: string
    email: string
    phone: string
    address?: string
    city?: string
    country?: string
    message?: string
    selectedProducts?: CartItem[]
}
