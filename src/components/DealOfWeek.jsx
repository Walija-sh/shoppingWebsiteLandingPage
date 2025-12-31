import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { LuTimer } from "react-icons/lu"; // Importing a clean timer icon
import ProductCard from "./ProductCard";
import { dealProducts } from "../data/products.js";

import "swiper/css";
import "swiper/css/navigation";


export default function DealOfWeek() {
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          days = 5;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pad = (n) => n.toString().padStart(2, "0");

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* The "Pod" Container - Gray background to separate from white page */}
        <div className="bg-[#F5F5F7] rounded-[40px] p-6 md:p-12 relative overflow-hidden">
          
          {/* Decorative Background Element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          {/* Header Row */}
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-12 relative z-10">
            
            {/* Title & Timer Group */}
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
              <div>
                <div className="flex items-center gap-2 mb-2 text-red-600 font-bold uppercase tracking-widest text-xs">
                  <LuTimer className="text-lg" />
                  <span>Limited Time Offer</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
                  Deal of the Week
                </h2>
              </div>

              {/* Modern Tile Countdown */}
              <div className="flex items-center gap-3 flex-wrap">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Mins", value: timeLeft.minutes },
                  { label: "Secs", value: timeLeft.seconds },
                ].map((item, index) => (
                  <div key={item.label} className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                      <span className="text-2xl md:text-3xl font-bold text-black font-mono">
                        {pad(item.value)}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 mt-2 tracking-wider">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Circular Navigation Buttons */}
            <div className="hidden  lg:flex gap-4">
              <button className="deal-prev w-14 h-14 bg-white rounded-full flex items-center justify-center text-black shadow-sm hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-50">
                <FaChevronLeft className="text-lg" />
              </button>
              <button className="deal-next w-14 h-14 bg-white rounded-full flex items-center justify-center text-black shadow-sm hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-50">
                <FaChevronRight className="text-lg" />
              </button>
            </div>
          </div>

          {/* Slider */}
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
            className="!overflow-visible" // Allows shadows to peek through
          >
            {dealProducts.map((product) => (
              <SwiperSlide key={product.title}>
                <ProductCard {...product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}