"use client"

import { useState, useEffect } from 'react';

const About = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const features = [
        {
            icon: "🏆",
            title: "Premium Quality",
            description: "100% authentic Terea Heats from verified suppliers",
            color: "from-amber-400 to-orange-500"
        },
        {
            icon: "🚀",
            title: "Express Delivery",
            description: "2-hour delivery - FREE on 2+ items",
            color: "from-blue-400 to-cyan-500"
        },
        {
            icon: "💎",
            title: "Best Prices",
            description: "Competitive pricing with exclusive deals",
            color: "from-purple-400 to-pink-500"
        },
        {
            icon: "🛡️",
            title: "Secure Shopping",
            description: "Safe payment & authenticity guaranteed",
            color: "from-green-400 to-emerald-500"
        },
        {
            icon: "💬",
            title: "24/7 Support",
            description: "Always here to help via WhatsApp",
            color: "from-red-400 to-rose-500"
        },
        {
            icon: "📦",
            title: "Free Delivery",
            description: "FREE on 2+ items across UAE",
            color: "from-indigo-400 to-violet-500"
        }
    ];

    return (
        <section id="about" className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-2 bg-accent/10 rounded-full mb-4">
                        <p className="text-accent font-semibold text-sm">About IQOS Store UAE</p>
                    </div>
                    <h2 className={`text-4xl md:text-5xl font-bold mb-6 text-balance transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        Why Choose <span className="text-accent">IQOS Store</span>
                    </h2>
                    <p className={`text-lg text-muted max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        Your trusted destination for authentic Terea Heats and IQOS devices in UAE.
                        We pride ourselves on quality, speed, and exceptional customer service.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-accent/30 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                <span className="text-3xl">{feature.icon}</span>
                            </div>
                            <h3 className="font-bold text-xl mb-2 group-hover:text-accent transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-muted leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Stats Section */}
                <div className={`bg-gradient-to-r from-primary to-primary/90 rounded-3xl p-12 text-white transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="group cursor-pointer">
                            <div className="text-4xl md:text-5xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform">
                                2000+
                            </div>
                            <p className="text-gray-300">Happy Customers</p>
                        </div>
                        <div className="group cursor-pointer">
                            <div className="text-4xl md:text-5xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform">
                                26
                            </div>
                            <p className="text-gray-300">Products Available</p>
                        </div>
                        <div className="group cursor-pointer">
                            <div className="text-4xl md:text-5xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform">
                                100%
                            </div>
                            <p className="text-gray-300">Authentic Products</p>
                        </div>
                        <div className="group cursor-pointer">
                            <div className="text-4xl md:text-5xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform">
                                2hr
                            </div>
                            <p className="text-gray-300">Fast Delivery</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
