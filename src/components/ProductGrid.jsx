import { useContext, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const tabs = [
  { label: "Best Sellers", value: "bestseller" },
  { label: "New Arrivals", value: "new" },
  { label: "Sale", value: "sale" },
  { label: "Trending", value: "trending" },
];

export default function ProductGrid() {
  const { products } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("bestseller");

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.categories.includes(activeTab)
    );
  }, [activeTab]);

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 overflow-hidden">

        <motion.div 
          className="flex flex-col items-center text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            The Latest & Greatest
          </motion.h2>

          <motion.div 
            className="flex overflow-x-scroll no-scrollbar bg-[#F5F5F7] p-1.5 rounded-full mt-4 max-w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-6 py-2.5 text-sm font-bold cursor-pointer whitespace-nowrap rounded-full transition ${
                  activeTab === tab.value
                    ? "bg-white text-black shadow-md"
                    : "text-gray-500 hover:text-black"
                }`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Swiper
              loop={true}
              spaceBetween={24}
              slidesPerView={1.2}
              breakpoints={{
                480: {
                  slidesPerView: 2.2,
                },
                640: {
                  slidesPerView: 2.5,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
              className="product-swiper"
            >
              {filteredProducts.map((product, index) => (
                <SwiperSlide key={product.title} className="pb-4 overflow-visible">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    <ProductCard {...product} />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </AnimatePresence>

        <motion.div 
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to='/shop'>
            <motion.div
              className="px-12 py-4 bg-[#F5F5F7] text-black rounded-full text-sm font-bold hover:bg-black hover:text-white transition shadow-sm cursor-pointer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Collection
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}