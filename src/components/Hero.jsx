import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  "https://images.unsplash.com/photo-1503602642458-232111445657",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
];

export default function Hero() {
  return (
    <section className="px-4 py-6 md:px-8 md:py-8 bg-white mt-[60px] ">
      <div className="max-w-7xl mx-auto overflow-hidden rounded-[28px] md:rounded-[40px] shadow-xl">
        <Swiper
          modules={[Pagination,Autoplay]}
          pagination={{ clickable: true }}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="hero-swiper"
        >
          {slides.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[260px] sm:h-[360px]  lg:h-[460px]">
                <img
                  src={img}
                  alt={`Hero slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Pagination styling */}
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
    </section>
  );
}
