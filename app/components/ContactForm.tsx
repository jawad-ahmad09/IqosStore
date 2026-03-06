"use client";

import React, { useState } from 'react';
import { Product, ContactFormData, CartItem } from '../types';

interface ContactFormProps {
    selectedProducts: Product[];
}

const ContactForm = ({ selectedProducts }: ContactFormProps) => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        message: '',
        selectedProducts: [],
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const cartItems: CartItem[] = selectedProducts.map(p => ({ ...p, quantity: 1 }))
        const payload: ContactFormData = {
            ...formData,
            selectedProducts: cartItems,
        }
        const res = await fetch('/api/send-inquiry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
        if (!res.ok) {
            alert('Failed to send. Please try again.')
            return
        }
        alert('Inquiry sent successfully!')
        setFormData({ name: '', email: '', phone: '', message: '', selectedProducts: [] })
    };

    return (
        <section id="contact" className="py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="h-[2px] w-8 md:w-12 bg-gradient-to-r from-transparent via-accent to-accent rounded-full"></div>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-lg blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
                            <span className="relative text-xs md:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary px-4 py-1.5 border-2 border-accent/30 rounded-full backdrop-blur-sm">
                                💬 GET IN TOUCH
                            </span>
                        </div>
                        <div className="h-[2px] w-8 md:w-12 bg-gradient-to-r from-accent to-transparent rounded-full"></div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-balance">
                        <span className="relative inline-block">
                            <span className="relative">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent animate-pulse-scale">
                                    Contact Us
                                </span>
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 md:w-40 h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full"></div>
                            </span>
                        </span>
                    </h2>
                </div>
                <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="phone">
                                Phone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                id="message"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                                required
                            />
                        </div>

                        {selectedProducts.length > 0 && (
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Selected Products:</h3>
                                <ul className="space-y-2">
                                    {selectedProducts.map((product) => (
                                        <li key={product.id} className="flex justify-between">
                                            <span>{product.name}</span>
                                            <span>AED {product.price}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Submit Inquiry
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;