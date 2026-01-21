import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const SimilarProducts = ({ products }) => {
  if (!products.length) return null;
  
  const MAX_SLIDES = 4;
  const shouldLoop = products.length > MAX_SLIDES;

  return (
    <motion.section 
      className="mt-24"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold tracking-tight text-black mb-10"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Similar Products
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Swiper
            loop={shouldLoop}
            spaceBetween={24}
            slidesPerView={1.2}
            breakpoints={{
              480: { slidesPerView: 2.2 },
              640: { slidesPerView: 2.5 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="product-swiper"
          >
            {products.map((product, index) => (
              <SwiperSlide key={product.title} className="overflow-visible pb-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.4 + index * 0.1,
                    ease: "easeOut"
                  }}
                >
                  <ProductCard {...product} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SimilarProducts;