"use client"

import { useEffect, useState } from "react"

const Hero = () => {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    return (
        <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-background via-background to-accent-light pt-24 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 right-20 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
                <div
                    className="absolute bottom-20 left-20 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-float"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div
                    className="absolute top-1/2 left-1/3 w-96 h-96 bg-accent-light rounded-full mix-blend-multiply filter blur-3xl animate-float"
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
                    className={`flex flex-col sm:flex-row gap-3 justify-center transition-all duration-700 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <a
                        href="#products"
                        className="inline-block bg-primary text-background px-6 py-3 rounded-lg font-semibold hover:bg-primary-light transition-smooth transform hover:scale-105 animate-glow"
                    >
                        Shop Terea Heats
                    </a>
                    <a
                        href="/contact"
                        className="inline-block border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-background transition-smooth transform hover:scale-105"
                    >
                        Contact
                    </a>
                </div>

                <div
                    className={`mt-10 grid grid-cols-3 gap-6 max-w-xl mx-auto transition-all duration-700 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <div className="text-center">
                        <p className="text-2xl font-bold text-accent">20+</p>
                        <p className="text-sm text-muted">Flavors</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-accent">10K+</p>
                        <p className="text-sm text-muted">Happy Customers</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-accent">24/7</p>
                        <p className="text-sm text-muted">Support</p>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div
                className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            >
                <div className="flex flex-col items-center gap-1.5">
                    <p className="text-xs text-muted">Scroll to explore</p>
                    <div className="w-5 h-8 border-2 border-accent rounded-full flex items-start justify-center p-1.5">
                        <div className="w-1 h-2 bg-accent rounded-full animate-bounce"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
