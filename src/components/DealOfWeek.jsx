import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "./ProductCard";

import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

export default function DealOfWeek() {
  const { getDealProducts } = useContext(AppContext);

  const dealProducts = getDealProducts();
  
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div 
          className="bg-white rounded-[40px] py-6 md:py-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-between sm:items-end gap-4 mb-12 relative z-10">
            <motion.h2 
              className="text-3xl md:text-5xl font-bold w-fit text-gray-900 tracking-tight"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Best Seller
            </motion.h2>

            <motion.div 
              className="flex items-center justify-between sm:justify-end gap-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link to="/shop">
                <motion.div
                  className="group inline-flex items-center cursor-pointer gap-2 text-sm md:text-base font-semibold text-black"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative">
                    View All
                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
                  </span>
                </motion.div>
              </Link>

              <motion.div 
                className="hidden lg:flex gap-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.button 
                  className="deal-prev w-14 h-14 bg-white rounded-full flex items-center justify-center text-black shadow-sm hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaChevronLeft className="text-lg" />
                </motion.button>
                <motion.button 
                  className="deal-next w-14 h-14 bg-white rounded-full flex items-center justify-center text-black shadow-sm hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaChevronRight className="text-lg" />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                prevEl: ".deal-prev",
                nextEl: ".deal-next",
              }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={true}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="!overflow-visible"
            >
              {dealProducts.map((product, index) => (
                <SwiperSlide key={product.title} className="pb-4 overflow-visible">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.6 + index * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    <ProductCard {...product} />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}