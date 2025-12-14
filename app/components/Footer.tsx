import Link from "next/link"

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-primary to-primary/90 text-background py-16">
            <div className="container mx-auto px-4">
                {/* Trust Section */}
                <div className="mb-12 pb-8 border-b border-white/10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-3">
                                <span className="text-accent text-2xl">✓</span>
                            </div>
                            <p className="font-semibold text-sm">100% Authentic</p>
                            <p className="text-xs text-gray-400 mt-1">Verified Products</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-3">
                                <span className="text-accent text-2xl">🚚</span>
                            </div>
                            <p className="font-semibold text-sm">Fast Delivery</p>
                            <p className="text-xs text-gray-400 mt-1">Before 12PM: Same Day</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-3">
                                <span className="text-accent text-2xl">🔒</span>
                            </div>
                            <p className="font-semibold text-sm">Secure Payment</p>
                            <p className="text-xs text-gray-400 mt-1">Safe & Easy</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-3">
                                <span className="text-accent text-2xl">💬</span>
                            </div>
                            <p className="font-semibold text-sm">24/7 Support</p>
                            <p className="text-xs text-gray-400 mt-1">Always Available</p>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">
                            IQOS<span className="text-accent"> Store</span>
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">
                            Your trusted source for authentic Terea Heats and IQOS devices in UAE. Premium quality, fast delivery, best prices.
                        </p>
                        <div className="flex gap-3">
                            <a href="tel:+971561928359" className="w-8 h-8 bg-white/10 hover:bg-accent rounded-full flex items-center justify-center transition-all" title="Call Us">
                                <span className="text-sm">📱</span>
                            </a>
                            <a href="mailto:jawadrathore30@gmail.com" className="w-8 h-8 bg-white/10 hover:bg-accent rounded-full flex items-center justify-center transition-all" title="Email Us">
                                <span className="text-sm">📧</span>
                            </a>
                            <a href="https://wa.me/971561928359?text=Hello!%20I'm%20interested%20in%20IQOS%20products" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/10 hover:bg-accent rounded-full flex items-center justify-center transition-all" title="WhatsApp">
                                <span className="text-sm">💬</span>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-white">Shop</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/listings" className="text-gray-300 hover:text-accent transition-smooth flex items-center gap-2">
                                    <span className="text-accent">→</span> All Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/#products" className="text-gray-300 hover:text-accent transition-smooth flex items-center gap-2">
                                    <span className="text-accent">→</span> Terea Heats
                                </Link>
                            </li>
                            <li>
                                <Link href="/#iqos-devices" className="text-gray-300 hover:text-accent transition-smooth flex items-center gap-2">
                                    <span className="text-accent">→</span> IQOS Devices
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-300 hover:text-accent transition-smooth flex items-center gap-2">
                                    <span className="text-accent">→</span> Order Now
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-white">Information</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/#about" className="text-gray-300 hover:text-accent transition-smooth flex items-center gap-2">
                                    <span className="text-accent">→</span> About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/#faq" className="text-gray-300 hover:text-accent transition-smooth flex items-center gap-2">
                                    <span className="text-accent">→</span> Delivery Info
                                </Link>
                            </li>
                            <li>
                                <Link href="/#about" className="text-gray-300 hover:text-accent transition-smooth flex items-center gap-2">
                                    <span className="text-accent">→</span> Authenticity Guarantee
                                </Link>
                            </li>
                            <li>
                                <Link href="/#faq" className="text-gray-300 hover:text-accent transition-smooth flex items-center gap-2">
                                    <span className="text-accent">→</span> FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-white">Contact Us</h4>
                        <div className="space-y-3 text-sm text-gray-300">
                            <div className="flex items-start gap-2">
                                <span className="text-accent mt-1">📍</span>
                                <p>Dubai, United Arab Emirates</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-accent mt-1">📧</span>
                                <a href="mailto:jawadrathore30@gmail.com" className="hover:text-accent transition-smooth">
                                    jawadrathore30@gmail.com
                                </a>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-accent mt-1">📱</span>
                                <a href="tel:+971561928359" className="hover:text-accent transition-smooth">
                                    +971 56 192 8359
                                </a>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-accent mt-1">💬</span>
                                <p>WhatsApp: Available 24/7</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                        <p>© {new Date().getFullYear()} IQOS Store UAE. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href="#privacy" className="hover:text-accent transition-smooth">Privacy Policy</a>
                            <a href="#terms" className="hover:text-accent transition-smooth">Terms & Conditions</a>
                            <a href="#returns" className="hover:text-accent transition-smooth">Return Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
