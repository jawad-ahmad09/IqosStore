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
    deviceType?: "IQOS Standard" | "IQOS Premium" | "IQOS Iluma"
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
