import React from 'react';

const Services = () => {
    return (
        <section id="services" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Door-to-Door Delivery</h3>
                        <p className="text-gray-600">
                            We ensure safe and timely delivery of your products right to your doorstep.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Product Installation</h3>
                        <p className="text-gray-600">
                            Professional installation service for eligible products by our expert team.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">After-Sales Support</h3>
                        <p className="text-gray-600">
                            Dedicated customer support team to assist you with any queries or concerns.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Quality Guarantee</h3>
                        <p className="text-gray-600">
                            All our products come with a quality guarantee for your peace of mind.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Express Shipping</h3>
                        <p className="text-gray-600">
                            Fast shipping options available for urgent deliveries.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Easy Returns</h3>
                        <p className="text-gray-600">
                            Hassle-free return process if you're not satisfied with your purchase.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;