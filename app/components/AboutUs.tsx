import React from 'react';

const About = () => {
    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                            Why Choose <span className="text-accent">Terea Heats</span>
                        </h2>
                        <p className="text-lg text-muted mb-6 leading-relaxed">
                            We focus exclusively on authentic Terea Heats sticks and accessories, providing verified quality and fast, reliable delivery.
                        </p>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent text-white">✓</div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Authentic Quality</h3>
                                    <p className="text-muted">Sourced from trusted suppliers — genuine Terea only</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent text-white">✓</div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Fast Delivery</h3>
                                    <p className="text-muted">Same-day/next-day options available in select areas</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent text-white">✓</div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">24/7 Support</h3>
                                    <p className="text-muted">Get help with flavor selection and orders anytime</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <img src="/ProductImage.png" alt="About us" className="rounded-lg shadow-lg" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
