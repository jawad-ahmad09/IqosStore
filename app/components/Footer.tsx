import Link from "next/link"

const Footer = () => {
    return (
        <footer className="bg-primary text-background py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Premium<span className="text-accent">Store</span>
                        </h3>
                        <p className="text-muted text-sm">
                            Discover our curated collection of premium products delivered to your doorstep.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="text-muted hover:text-accent transition-smooth">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/#products" className="text-muted hover:text-accent transition-smooth">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/#about" className="text-muted hover:text-accent transition-smooth">
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/contact" className="text-muted hover:text-accent transition-smooth">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/#faq" className="text-muted hover:text-accent transition-smooth">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-muted hover:text-accent transition-smooth">
                                    Shipping Info
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Contact</h4>
                        <p className="text-muted text-sm">
                            Email: info@premiumstore.com
                            <br />
                            Phone: +1 (555) 123-4567
                        </p>
                    </div>
                </div>
                <div className="border-t border-primary-light pt-8 text-center text-muted text-sm">
                    <p>© {new Date().getFullYear()} PremiumStore. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
