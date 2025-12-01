"use client"

import { useEffect, useState } from "react"

const Hero = () => {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    return (
        <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/10 pt-24 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 right-20 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
                <div
                    className="absolute bottom-20 left-20 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-float"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div
                    className="absolute top-1/2 left-1/3 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl animate-float"
                    style={{ animationDelay: "2s" }}
                ></div>
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "linear-gradient(0deg, transparent 24%, rgba(212, 165, 116, 0.05) 25%, rgba(212, 165, 116, 0.05) 26%, transparent 27%, transparent 74%, rgba(212, 165, 116, 0.05) 75%, rgba(212, 165, 116, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(212, 165, 116, 0.05) 25%, rgba(212, 165, 116, 0.05) 26%, transparent 27%, transparent 74%, rgba(212, 165, 116, 0.05) 75%, rgba(212, 165, 116, 0.05) 76%, transparent 77%, transparent)",
                        backgroundSize: "50px 50px",
                    }}
                ></div>
            </div>

            <div className="container mx-auto px-4 text-center relative z-10">
                <div
                    className={`inline-block mb-4 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 transition-all duration-700 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                >
                    <p className="text-xs md:text-sm font-medium text-accent">✨ Terea Heats Collection</p>
                </div>

                <h1
                    className={`text-4xl md:text-5xl font-bold mb-3 text-balance leading-tight transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    Premium <span className="text-accent animate-pulse-scale">Terea Heats</span>
                </h1>

                <p
                    className={`text-base md:text-lg text-muted mb-6 max-w-2xl mx-auto text-balance transition-all duration-700 delay-100 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    Explore our curated range of authentic Terea Heats sticks. Fast delivery, great pricing, and responsive support.
                </p>

                <div
                    className={`flex flex-col sm:flex-row gap-3 justify-center mb-8 transition-all duration-700 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <a
                        href="#products"
                        className="inline-block bg-primary text-background px-8 py-4 rounded-lg font-semibold hover:bg-primary-light transition-smooth transform hover:scale-105 animate-glow shadow-lg hover:shadow-xl"
                    >
                        Shop Now →
                    </a>
                    <a
                        href="/listings"
                        className="inline-block border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-background transition-smooth transform hover:scale-105 shadow-md"
                    >
                        View All Products
                    </a>
                </div>

                {/* Trust Badges */}
                <div
                    className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto transition-all duration-700 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <div className="flex flex-col items-center gap-2 p-4 bg-white/50 backdrop-blur-sm rounded-lg hover:bg-white/80 transition-all">
                        <span className="text-2xl">✓</span>
                        <p className="text-xs md:text-sm font-semibold text-foreground">100% Authentic</p>
                        <p className="text-xs text-muted">Verified Products</p>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-4 bg-white/50 backdrop-blur-sm rounded-lg hover:bg-white/80 transition-all">
                        <span className="text-2xl">🚚</span>
                        <p className="text-xs md:text-sm font-semibold text-foreground">Fast Delivery</p>
                        <p className="text-xs text-muted">Free on 2+ Items</p>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-4 bg-white/50 backdrop-blur-sm rounded-lg hover:bg-white/80 transition-all">
                        <span className="text-2xl">💰</span>
                        <p className="text-xs md:text-sm font-semibold text-foreground">Best Prices</p>
                        <p className="text-xs text-muted">Guaranteed</p>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-4 bg-white/50 backdrop-blur-sm rounded-lg hover:bg-white/80 transition-all">
                        <span className="text-2xl">🔒</span>
                        <p className="text-xs md:text-sm font-semibold text-foreground">Secure Payment</p>
                        <p className="text-xs text-muted">Safe & Easy</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
