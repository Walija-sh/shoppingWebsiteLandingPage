import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import assets from "../assets/assets";

const slides = [
  assets.banner1,
  assets.banner2,
  assets.banner3,
  assets.banner4,
  assets.banner5
];

export default function Hero() {
  return (
    <motion.section
      className="px-4 py-6 md:px-8 md:py-8 bg-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto overflow-hidden rounded-[28px] md:rounded-[40px] shadow-xl">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="hero-swiper"
        >
          {slides.map((img, index) => (
            <SwiperSlide key={index}>
              <Link
                to="/shop"
                className="relative block h-[260px] sm:h-[360px] lg:h-[460px]"
              >
                <img
                  src={img}
                  alt={`Hero slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .hero-swiper .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            background: #000;
            opacity: 0.25;
          }
          .hero-swiper .swiper-pagination-bullet-active {
            width: 22px;
            border-radius: 6px;
            opacity: 1;
          }
        `,
        }}
      />
    </motion.section>
  );
}
