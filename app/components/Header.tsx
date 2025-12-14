"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCart } from "@/app/context/CartContext"
import { useUI } from "@/app/context/UIContext"

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isTereaDropdownOpen, setIsTereaDropdownOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [isMobileMenuOpen])

    const getLinkHref = (section: string) => {
        if (pathname === "/") {
            return section
        } else {
            return `/${section}`
        }
    }

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
                        <div className="relative group">
                            <button className="text-foreground hover:text-accent transition-smooth flex items-center gap-1">
                                Terea Categories
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div className="py-2">
                                    <Link href="/listings?region=KAZAKHSTAN" className="block px-4 py-3 text-foreground hover:bg-accent/10 hover:text-accent transition-smooth">
                                        <div className="font-semibold">Terea KAZAKHSTAN</div>
                                        <div className="text-xs text-muted">Kazakhstan packaging</div>
                                    </Link>
                                    <Link href="/listings?region=Indonesia" className="block px-4 py-3 text-foreground hover:bg-accent/10 hover:text-accent transition-smooth">
                                        <div className="font-semibold">Terea Indonesia</div>
                                        <div className="text-xs text-muted">Indonesian packaging</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Link href={getLinkHref("listings")} className="text-foreground hover:text-accent transition-smooth">
                            All Listings
                        </Link>
                        <Link href={getLinkHref("#about")} className="text-foreground hover:text-accent transition-smooth">
                            About
                        </Link>
                        <Link href={getLinkHref("#faq")} className="text-foreground hover:text-accent transition-smooth">
                            FAQ
                        </Link>
                        <Link href="/contact" className="text-foreground hover:text-accent transition-smooth">
                            Contact Us
                        </Link>
                        <CartButton />
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-2">
                        <span className="md:hidden">
                            <CartButton />
                        </span>
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
                </div>

                {/* Mobile Overlay */}
                <div
                    className={`md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Mobile Sidebar */}
                <div
                    className={`md:hidden fixed top-0 right-0 h-full w-[75%] max-w-sm bg-background z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <div className="flex flex-col h-full">
                        {/* Sidebar Header */}
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <Link href="/" className="text-xl font-bold text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                                IQOS<span className="text-accent"> Store</span>
                            </Link>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 text-muted hover:text-foreground hover:bg-gray-100 rounded-full transition-smooth"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex-1 p-6 space-y-2">
                            <Link
                                href="/"
                                className="flex items-center gap-3 px-4 py-3 text-foreground hover:text-accent hover:bg-accent/5 rounded-lg transition-smooth"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                                Home
                            </Link>

                            {/* Terea Categories Dropdown Mobile */}
                            <div>
                                <button
                                    onClick={() => setIsTereaDropdownOpen(!isTereaDropdownOpen)}
                                    className="flex items-center justify-between w-full px-4 py-3 text-foreground hover:text-accent hover:bg-accent/5 rounded-lg transition-smooth"
                                >
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                        Terea Categories
                                    </div>
                                    <svg className={`w-4 h-4 transition-transform ${isTereaDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {isTereaDropdownOpen && (
                                    <div className="ml-12 mt-2 space-y-1">
                                        <Link
                                            href="/listings?region=KAZAKHSTAN"
                                            className="block px-4 py-2 text-sm text-foreground hover:text-accent hover:bg-accent/5 rounded-lg transition-smooth"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Terea KAZAKHSTAN
                                        </Link>
                                        <Link
                                            href="/listings?region=Indonesia"
                                            className="block px-4 py-2 text-sm text-foreground hover:text-accent hover:bg-accent/5 rounded-lg transition-smooth"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Terea Indonesia
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <Link
                                href={getLinkHref("listings")}
                                className="flex items-center gap-3 px-4 py-3 text-foreground hover:text-accent hover:bg-accent/5 rounded-lg transition-smooth"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                    />
                                </svg>
                                All Listings
                            </Link>
                            <Link
                                href={getLinkHref("#about")}
                                className="flex items-center gap-3 px-4 py-3 text-foreground hover:text-accent hover:bg-accent/5 rounded-lg transition-smooth"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                About
                            </Link>
                            <Link
                                href={getLinkHref("#faq")}
                                className="flex items-center gap-3 px-4 py-3 text-foreground hover:text-accent hover:bg-accent/5 rounded-lg transition-smooth"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                FAQ
                            </Link>
                            <Link
                                href="/contact"
                                className="flex items-center gap-3 px-4 py-3 text-foreground hover:text-accent hover:bg-accent/5 rounded-lg transition-smooth"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                Contact Us
                            </Link>
                        </nav>

                        {/* Footer */}
                        <div className="p-6 border-t border-border">
                            <p className="text-sm text-muted text-center">© 2025 IQOS Store</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header

function CartButton() {
    const { items } = useCart()
    const { openCart } = useUI()
    const count = items.reduce((sum, i) => sum + i.quantity, 0)
    return (
        <button
            onClick={openCart}
            className="relative p-2 rounded hover:bg-border transition-smooth"
            aria-label="Open cart"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2 9m12-9l2 9M9 22a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
                />
            </svg>
            {count > 0 && (
                <span className="absolute -top-1 -right-1 text-xs bg-accent text-white rounded-full px-1.5 py-0.5">
                    {count}
                </span>
            )}
        </button>
    )
}
