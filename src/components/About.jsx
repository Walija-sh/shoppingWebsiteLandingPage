import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
    return (
        <section className="pt-12 md:pt-20 max-w-7xl mx-auto px-4 md:px-8">
            <motion.h2 
                className="text-4xl md:text-5xl text-center font-bold tracking-tight text-black"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                About Us
            </motion.h2>

            <div className="max-w-7xl mx-auto mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12 items-center">
                    {/* Left Side - Image */}
                    <motion.div 
                        className="relative"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <motion.div 
                            className="aspect-square rounded-2xl overflow-hidden shadow-2xl"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=800&fit=crop"
                                alt="About Us"
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.5 }}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Content */}
                    <motion.div 
                        className="space-y-6"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        <div>
                            <motion.h2 
                                className="text-4xl lg:text-5xl font-bold text-gray-900 mt-2 mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                Our Story
                            </motion.h2>
                        </div>

                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                Every great business begins with a vision. Ours started with a simple belief:
                                that quality products and exceptional service should go hand in hand. What began
                                as a small passion project has grown into a thriving community of customers who
                                trust us to deliver excellence every time.
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                We're more than just a store—we're a team dedicated to understanding your needs
                                and exceeding your expectations. From carefully curating our product selection to
                                ensuring every order arrives with care, we put our hearts into everything we do.
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                            >
                                When you shop with us, you're not just making a purchase—you're joining a family.
                                We stand behind every product we sell and are committed to your complete satisfaction.
                            </motion.p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}