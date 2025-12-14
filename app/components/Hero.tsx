"use client"

import { useEffect, useState } from "react"

const Hero = () => {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    return (
        <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/10 pt-24 overflow-hidden">
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

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left Side - Text Content */}
                    <div className="text-center lg:text-left">
                        <div
                            className={`inline-block mb-4 px-3 py-1.5 rounded-full bg-red-500 text-white border border-red-600 transition-all duration-700 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                        >
                            <p className="text-xs md:text-sm font-bold">🎉 NEW YEAR SALE - UP TO 41% OFF</p>
                        </div>

                        <h1
                            className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-balance leading-tight transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                        >
                            Premium <span className="text-accent animate-pulse-scale">Terea Heats</span>
                        </h1>

                        <p
                            className={`text-base md:text-xl text-muted mb-8 max-w-xl ${!isLoaded ? 'mx-auto' : 'lg:mx-0'} text-balance transition-all duration-700 delay-100 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                        >
                            Explore our curated range of authentic Terea Heats sticks. Fast delivery, great pricing, and responsive support.
                        </p>

                        <div
                            className={`flex flex-col sm:flex-row gap-4 ${!isLoaded ? 'justify-center' : 'lg:justify-start'} mb-8 transition-all duration-700 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                        >
                            <a
                                href="#products"
                                className="inline-block bg-primary text-background px-8 py-4 rounded-lg font-semibold hover:bg-primary-light transition-smooth transform hover:scale-105 animate-glow shadow-lg hover:shadow-xl text-center"
                            >
                                Shop Now →
                            </a>
                            <a
                                href="/listings"
                                className="inline-block border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-background transition-smooth transform hover:scale-105 shadow-md text-center"
                            >
                                View All Products
                            </a>
                        </div>

                        {/* Trust Badges */}
                        <div
                            className={`grid grid-cols-2 gap-4 max-w-md ${!isLoaded ? 'mx-auto' : 'lg:mx-0'} transition-all duration-700 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                        >
                            <div className="flex flex-col items-center lg:items-start gap-2 p-4 bg-white/50 backdrop-blur-sm rounded-lg hover:bg-white/80 transition-all">
                                <span className="text-2xl">✓</span>
                                <p className="text-xs md:text-sm font-semibold text-foreground">100% Authentic</p>
                            </div>
                            <div className="flex flex-col items-center lg:items-start gap-2 p-4 bg-white/50 backdrop-blur-sm rounded-lg hover:bg-white/80 transition-all">
                                <span className="text-2xl">🚚</span>
                                <p className="text-xs md:text-sm font-semibold text-foreground">Same/Next Day</p>
                                <p className="text-[10px] text-muted text-center lg:text-left">Before 12PM: Same Day</p>
                            </div>
                            <div className="flex flex-col items-center lg:items-start gap-2 p-4 bg-white/50 backdrop-blur-sm rounded-lg hover:bg-white/80 transition-all">
                                <span className="text-2xl">💰</span>
                                <p className="text-xs md:text-sm font-semibold text-foreground">Best Prices</p>
                            </div>
                            <div className="flex flex-col items-center lg:items-start gap-2 p-4 bg-white/50 backdrop-blur-sm rounded-lg hover:bg-white/80 transition-all">
                                <span className="text-2xl">🔒</span>
                                <p className="text-xs md:text-sm font-semibold text-foreground">Secure Payment</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Hero Image */}
                    <div
                        className={`relative transition-all duration-700 delay-400 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
                    >
                        <div className="relative">
                            <img
                                src="/HeroSection-Image.png"
                                alt="IQOS Terea Heats Collection"
                                className="w-full h-auto object-contain drop-shadow-2xl"
                            />
                            {/* Decorative elements around the image */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-pulse"></div>
                            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
