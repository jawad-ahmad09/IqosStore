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
        <>
            {/* Header */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
                    }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        {/* Premium Logo */}
                        <Link href="/" className="group relative flex items-center gap-2 md:gap-3">
                            {/* Icon with Glow Effect */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-accent to-primary rounded-xl blur-md opacity-60 group-hover:opacity-80 transition-opacity"></div>
                                <div className="relative p-2 md:p-2.5 bg-gradient-to-br from-accent via-primary to-accent rounded-xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all">
                                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Text Logo */}
                            <div className="flex flex-col">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary group-hover:from-accent group-hover:via-primary group-hover:to-accent transition-all duration-500">
                                        IQOS
                                    </span>
                                    <span className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary group-hover:scale-110 transition-transform inline-block">
                                        Store
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 -mt-0.5">
                                    <div className="h-[2px] w-8 bg-gradient-to-r from-accent to-primary rounded-full group-hover:w-12 transition-all"></div>
                                    <span className="text-[9px] md:text-[10px] font-bold text-accent tracking-widest uppercase">Premium</span>
                                </div>
                            </div>

                            {/* Premium Badge */}
                            <div className="hidden md:block absolute -top-1 -right-1">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-yellow-400 rounded-full blur-sm animate-pulse"></div>
                                    <svg className="relative w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <Link href="/" className="text-foreground hover:text-accent transition-all hover:scale-105 relative group">
                                <span>Home</span>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                            </Link>
                            <div className="relative group">
                                <button className="text-foreground hover:text-accent transition-all hover:scale-105 flex items-center gap-1">
                                    Terea Categories
                                    <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 -translate-y-2 z-50 border border-accent/20">
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
                            <Link href={getLinkHref("listings")} className="text-foreground hover:text-accent transition-all hover:scale-105 relative group">
                                <span>All Listings</span>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                            </Link>
                            <Link href={getLinkHref("#about")} className="text-foreground hover:text-accent transition-all hover:scale-105 relative group">
                                <span>About</span>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                            </Link>
                            <Link href={getLinkHref("#faq")} className="text-foreground hover:text-accent transition-all hover:scale-105 relative group">
                                <span>FAQ</span>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                            </Link>
                            <Link href="/contact" className="text-foreground hover:text-accent transition-all hover:scale-105 relative group">
                                <span>Contact Us</span>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
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
                </div>
            </header>

            {/* Mobile Overlay */}
            <div
                className={`md:hidden fixed inset-0 bg-black/50 z-[55] transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Sidebar - EXTRAORDINARY DESIGN */}
            <div
                className={`md:hidden fixed top-0 right-0 h-full w-[85%] max-w-sm bg-gradient-to-br from-white via-gray-50 to-accent/5 z-[60] transform transition-all duration-500 ease-out ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                    }`}
                style={{
                    boxShadow: '-10px 0 50px rgba(0, 0, 0, 0.3), -5px 0 20px rgba(212, 165, 116, 0.2)'
                }}
            >
                {/* Decorative Left Border - Animated Gradient */}
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-accent via-primary to-accent animate-pulse-scale overflow-hidden">
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-white/50 to-transparent animate-shimmer"></div>
                </div>

                <div className="flex flex-col h-full relative overflow-hidden">
                    {/* Enhanced Animated Background Shapes */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl animate-float"></div>
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-primary/10 to-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
                        <div className="absolute top-1/2 right-10 w-32 h-32 bg-gradient-to-br from-yellow-200/10 to-orange-200/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
                    </div>

                    {/* Premium Sidebar Header */}
                    <div className="relative z-10 bg-gradient-to-br from-primary via-accent to-primary p-6 shadow-2xl overflow-hidden">
                        {/* Decorative Pattern Overlay */}
                        <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)',
                            backgroundSize: '24px 24px'
                        }}></div>

                        {/* Premium Badge */}
                        <div className="absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>

                        <div className="relative">
                            <div className="flex items-center justify-between mb-3">
                                <Link href="/" className="text-2xl font-bold text-white drop-shadow-2xl animate-fade-in-up flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                                    <span className="text-3xl animate-bounce">🛍️</span>
                                    <div>
                                        <div className="flex items-baseline gap-1">
                                            IQOS<span className="text-yellow-300"> Store</span>
                                        </div>
                                        <div className="text-[10px] font-normal text-white/80 -mt-1">Premium Collection</div>
                                    </div>
                                </Link>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2.5 text-white/90 hover:text-white hover:bg-white/20 rounded-xl transition-all hover:rotate-90 hover:scale-110 backdrop-blur-sm border border-white/20 shadow-lg"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Premium Features Badge */}
                            <div className="flex gap-2 mt-4 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/30 flex items-center gap-1">
                                    <span className="animate-pulse">✨</span> Authentic Products
                                </span>
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/30 flex items-center gap-1">
                                    <span className="animate-bounce">⚡</span> Fast Delivery
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Wave Divider */}
                    <div className="relative h-6 -mt-1">
                        <svg className="absolute bottom-0 w-full h-6" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M0,0 C150,60 350,0 600,50 C850,100 1050,40 1200,80 L1200,120 L0,120 Z" fill="url(#wave-gradient)" opacity="0.3"></path>
                            <path d="M0,20 C200,80 400,20 600,60 C800,100 1000,40 1200,70 L1200,120 L0,120 Z" fill="url(#wave-gradient)" opacity="0.2"></path>
                            <defs>
                                <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" style={{ stopColor: '#2c2c2c', stopOpacity: 1 }} />
                                    <stop offset="50%" style={{ stopColor: '#d4a574', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#2c2c2c', stopOpacity: 1 }} />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* Navigation Links - Premium Card Style */}
                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto relative z-10">
                        {/* Home Link with Premium Style */}
                        <Link
                            href="/"
                            className="group relative flex items-center gap-4 px-5 py-4 bg-white text-foreground rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] border-2 border-transparent hover:border-accent/30 animate-slide-in-right overflow-hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {/* Decorative Corner Elements */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            {/* Shine Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            </div>

                            <div className="relative p-2.5 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-all shadow-md">
                                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <span className="relative font-bold text-[15px] group-hover:text-accent transition-colors">Home</span>
                            <div className="relative ml-auto flex items-center gap-1">
                                <svg className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-all" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <svg className="w-5 h-5 text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Link>

                        {/* Terea Categories Dropdown - Advanced */}
                        <div className="animate-slide-in-right" style={{ animationDelay: '0.05s' }}>
                            <button
                                onClick={() => setIsTereaDropdownOpen(!isTereaDropdownOpen)}
                                className="group flex items-center justify-between w-full px-5 py-4 bg-white text-foreground rounded-2xl shadow-md hover:shadow-xl transition-all hover:scale-[1.02] hover:bg-gradient-to-r hover:from-accent/10 hover:to-primary/10 border border-transparent hover:border-accent/20"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl group-hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                    </div>
                                    <span className="font-semibold group-hover:text-accent transition-colors">Terea Categories</span>
                                </div>
                                <svg className={`w-5 h-5 text-muted group-hover:text-accent transition-all ${isTereaDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {isTereaDropdownOpen && (
                                <div className="mt-2 ml-4 space-y-2 animate-slide-down">
                                    <Link
                                        href="/listings?region=KAZAKHSTAN"
                                        className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-accent/5 to-primary/5 text-foreground rounded-xl hover:from-accent/15 hover:to-primary/15 transition-all hover:translate-x-1 border border-accent/10"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <span className="text-accent">🇰🇿</span>
                                        <div>
                                            <div className="font-semibold text-sm">Terea KAZAKHSTAN</div>
                                            <div className="text-xs text-muted">Kazakhstan packaging</div>
                                        </div>
                                    </Link>
                                    <Link
                                        href="/listings?region=Indonesia"
                                        className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-accent/5 to-primary/5 text-foreground rounded-xl hover:from-accent/15 hover:to-primary/15 transition-all hover:translate-x-1 border border-accent/10"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <span className="text-accent">🇮🇩</span>
                                        <div>
                                            <div className="font-semibold text-sm">Terea Indonesia</div>
                                            <div className="text-xs text-muted">Indonesian packaging</div>
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* All Listings Link */}
                        <Link
                            href={getLinkHref("listings")}
                            className="group relative flex items-center gap-4 px-5 py-4 bg-white text-foreground rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] border-2 border-transparent hover:border-accent/30 animate-slide-in-right overflow-hidden"
                            style={{ animationDelay: '0.1s' }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            </div>
                            <div className="relative p-2.5 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-all shadow-md">
                                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                            </div>
                            <span className="relative font-bold text-[15px] group-hover:text-accent transition-colors">All Listings</span>
                            <svg className="w-5 h-5 ml-auto text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>

                        {/* About Link */}
                        <Link
                            href={getLinkHref("#about")}
                            className="group relative flex items-center gap-4 px-5 py-4 bg-white text-foreground rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] border-2 border-transparent hover:border-accent/30 animate-slide-in-right overflow-hidden"
                            style={{ animationDelay: '0.15s' }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            </div>
                            <div className="relative p-2.5 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-all shadow-md">
                                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="relative font-bold text-[15px] group-hover:text-accent transition-colors">About</span>
                            <svg className="w-5 h-5 ml-auto text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>

                        {/* FAQ Link */}
                        <Link
                            href={getLinkHref("#faq")}
                            className="group relative flex items-center gap-4 px-5 py-4 bg-white text-foreground rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] border-2 border-transparent hover:border-accent/30 animate-slide-in-right overflow-hidden"
                            style={{ animationDelay: '0.2s' }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            </div>
                            <div className="relative p-2.5 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-all shadow-md">
                                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="relative font-bold text-[15px] group-hover:text-accent transition-colors">FAQ</span>
                            <svg className="w-5 h-5 ml-auto text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>

                        {/* Contact Us - Premium CTA Button */}
                        <Link
                            href="/contact"
                            className="group relative flex items-center gap-4 px-5 py-4 bg-gradient-to-r from-accent via-primary to-accent text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-[1.03] border-2 border-yellow-400/50 animate-slide-in-right overflow-hidden"
                            style={{
                                animationDelay: '0.25s',
                                boxShadow: '0 10px 40px -10px rgba(212, 165, 116, 0.6)'
                            }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {/* Animated Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 animate-shimmer"></div>

                            {/* Pulsing Glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-50 group-hover:opacity-70 blur-xl animate-pulse"></div>

                            <div className="relative p-2.5 bg-white/20 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all backdrop-blur-sm shadow-lg border border-white/30">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="relative font-bold text-[15px]">Contact Us</span>
                            <span className="relative text-xs bg-yellow-300 text-primary px-2 py-0.5 rounded-full font-bold animate-bounce">HOT</span>
                            <svg className="w-5 h-5 ml-auto group-hover:translate-x-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </nav>

                    {/* Premium Footer - Contact Info Card */}
                    <div className="relative z-10 p-4 bg-gradient-to-t from-white/90 to-transparent backdrop-blur-sm">
                        <div className="relative bg-gradient-to-br from-white via-gray-50 to-accent/5 rounded-2xl p-5 shadow-2xl border-2 border-accent/20 overflow-hidden">
                            {/* Decorative Elements */}
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-2xl"></div>

                            <div className="relative">
                                {/* Header with Icon */}
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="p-1.5 bg-gradient-to-br from-accent to-primary rounded-lg">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <p className="text-xs font-bold text-foreground tracking-wide uppercase">Quick Contact</p>
                                </div>

                                {/* Contact Links */}
                                <div className="space-y-2.5">
    
                                    <a href="https://wa.me/971561928359" className="group flex items-center gap-3 px-3 py-2.5 bg-gradient-to-r from-green-500 to-green-600 rounded-xl hover:from-green-600 hover:to-green-700 transition-all hover:scale-[1.02] shadow-md text-white">
                                        <div className="p-1.5 bg-white/20 rounded-lg group-hover:scale-110 transition-transform backdrop-blur-sm animate-pulse">
                                            <span className="text-sm">💬</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-xs text-white/80">Chat on</div>
                                            <div className="text-sm font-bold">WhatsApp - 24/7</div>
                                        </div>
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                </div>

                                {/* Copyright */}
                                <div className="mt-4 pt-3 border-t-2 border-accent/10 text-center">
                                    <p className="text-xs font-semibold text-muted">© 2026 IQOS Store UAE</p>
                                    <p className="text-[10px] text-muted/70 mt-0.5">Premium IQOS Products Supplier</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
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
            className="relative p-2 rounded-lg hover:bg-accent/10 transition-all hover:scale-110 group"
            aria-label="Open cart"
        >
            <svg className="w-6 h-6 group-hover:animate-wiggle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2 9m12-9l2 9M9 22a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
                />
            </svg>
            {count > 0 && (
                <span className="absolute -top-1 -right-1 text-xs bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full px-2 py-0.5 font-bold animate-bounce-in shadow-lg">
                    {count}
                </span>
            )}
        </button>
    )
}
