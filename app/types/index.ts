export interface Product {
    id: number
    name: string
    description: string
    price: number
    image: string
}

export interface CartItem extends Product {
    quantity: number
}

export interface ContactFormData {
    name: string
    email: string
    phone: string
    message?: string
    selectedProducts: CartItem[]
}
