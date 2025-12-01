"use client"
import type { CartItem } from "@/app/types"

interface CartProps {
    items: CartItem[]
    onUpdateQuantity: (id: number, quantity: number) => void
    onRemoveItem: (id: number) => void
}

const Cart = ({ items, onUpdateQuantity, onRemoveItem }: CartProps) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    if (items.length === 0) {
        return (
            <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-muted text-lg">Your cart is empty</p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-primary text-background">
                        <tr>
                            <th className="px-6 py-4 text-left font-semibold">Product</th>
                            <th className="px-6 py-4 text-left font-semibold">Price</th>
                            <th className="px-6 py-4 text-left font-semibold">Quantity</th>
                            <th className="px-6 py-4 text-left font-semibold">Total</th>
                            <th className="px-6 py-4 text-left font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className="border-t border-border hover:bg-background transition-smooth">
                                <td className="px-6 py-4 font-medium">{item.name}</td>
                                <td className="px-6 py-4 text-accent font-semibold">AED {item.price}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                            className="px-2 py-1 bg-border rounded hover:bg-primary-light transition-smooth"
                                        >
                                            −
                                        </button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                            className="px-2 py-1 bg-border rounded hover:bg-primary-light transition-smooth"
                                        >
                                            +
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-semibold">AED {(item.price * item.quantity).toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => onRemoveItem(item.id)}
                                        className="text-error hover:text-red-700 transition-smooth font-semibold"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-background border-t border-border p-6 flex justify-end">
                <div className="text-right">
                    <p className="text-muted mb-2">Subtotal</p>
                    <p className="text-3xl font-bold text-accent">AED {total.toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}

export default Cart
