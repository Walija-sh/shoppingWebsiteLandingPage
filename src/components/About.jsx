import React from 'react';

export default function AboutSection() {
    return (
        <section className="pt-12 md:pt-20 max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="text-4xl md:text-5xl text-center font-bold tracking-tight text-black ">
                About Us
            </h2>

            <div className="max-w-7xl mx-auto mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12 items-center">
                    {/* Left Side - Image */}
                    <div className="relative">
                        <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=800&fit=crop"
                                alt="About Us"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="space-y-6">
                        <div>

                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-2 mb-4">
                                Our Story
                            </h2>
                        </div>

                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                Every great business begins with a vision. Ours started with a simple belief:
                                that quality products and exceptional service should go hand in hand. What began
                                as a small passion project has grown into a thriving community of customers who
                                trust us to deliver excellence every time.
                            </p>

                            <p>
                                We're more than just a store—we're a team dedicated to understanding your needs
                                and exceeding your expectations. From carefully curating our product selection to
                                ensuring every order arrives with care, we put our hearts into everything we do.
                            </p>

                            <p>
                                When you shop with us, you're not just making a purchase—you're joining a family.
                                We stand behind every product we sell and are committed to your complete satisfaction.
                            </p>
                        </div>


                    </div>
                </div>
            </div>
        </section>
    );
}