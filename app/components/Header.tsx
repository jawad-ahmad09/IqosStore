"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${isScrolled ? "bg-background shadow-lg" : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold text-primary">
                        IQOS<span className="text-accent"> Store</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-foreground hover:text-accent transition-smooth">
                            Home
                        </Link>
                        <Link href="#products" className="text-foreground hover:text-accent transition-smooth">
                            Products
                        </Link>
                        <Link href="#about" className="text-foreground hover:text-accent transition-smooth">
                            About
                        </Link>
                        <Link href="#faq" className="text-foreground hover:text-accent transition-smooth">
                            FAQ
                        </Link>
                        <Link href="/contact" className="text-foreground hover:text-accent transition-smooth">
                            Contact Us
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden pb-4">
                        <div className="space-y-2">
                            <Link
                                href="/"
                                className="block px-3 py-2 text-foreground hover:text-accent transition-smooth"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="#products"
                                className="block px-3 py-2 text-foreground hover:text-accent transition-smooth"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Products
                            </Link>
                            <Link
                                href="#about"
                                className="block px-3 py-2 text-foreground hover:text-accent transition-smooth"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                href="#faq"
                                className="block px-3 py-2 text-foreground hover:text-accent transition-smooth"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                FAQ
                            </Link>
                            <Link
                                href="/contact"
                                className="block px-3 py-2 text-foreground hover:text-accent transition-smooth"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
