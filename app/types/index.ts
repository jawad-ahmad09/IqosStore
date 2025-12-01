export interface Product {
    id: number
    name: string
    description: string
    TotalPuffs?: string
    Origin?: string
    price: number
    image: string
    flavor?: string
    device?: string
    stickType?: string
    intensity?: string
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
