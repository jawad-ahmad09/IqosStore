import React from 'react';

const About = () => {
    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                            Why Choose <span className="text-accent">Us</span>
                        </h2>
                        <p className="text-lg text-muted mb-6 leading-relaxed">
                            We are dedicated to providing the finest quality products with exceptional service. Our commitment to
                            excellence ensures every customer receives premium items that exceed expectations.
                        </p>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent text-white">✓</div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Premium Quality</h3>
                                    <p className="text-muted">Only the finest products make it to our collection</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent text-white">✓</div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Fast Delivery</h3>
                                    <p className="text-muted">Quick and reliable door-to-door service</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent text-white">✓</div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">24/7 Support</h3>
                                    <p className="text-muted">Always here to help with your queries</p>
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
