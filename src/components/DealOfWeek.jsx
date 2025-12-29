import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "./ProductCard";

import "swiper/css";
import "swiper/css/navigation";

const dealProducts = [
  {
    image: "/assets/product/prodImg1.jpg",
    title: "Burgundy Wool Double-Breasted Coat",
    price: 289,
    originalPrice: 420,
    isOnSale: true,
    rating: 5,
    categories: ["bestseller", "sale", "trending"],
  },

  {
    image: "/assets/product/prodImg3.jpg",
    title: "Elegant Black Wrap Midi Dress",
    price: 199,
    originalPrice: 279,
    isOnSale: true,
    rating: 5,
    categories: ["sale", "bestseller"],
  },

  {
    image: "/assets/product/prodImg5.jpg",
    title: "Olive Green Premium Hoodie",
    price: 89,
     originalPrice: 99,
    isOnSale: true,
    rating: 4,
    categories: ["new"],
  },
  {
    image: "/assets/product/prodImg6.jpg",
    title: "Camel Belted Trench Coat",
    price: 349,
     originalPrice: 411,
    isOnSale: true,
    rating: 5,
    categories: ["bestseller", "trending"],
  },
  {
    image: "/assets/product/prodImg7.jpg",
    title: "Navy Double-Breasted Blazer",
    price: 259,
    originalPrice: 340,
    isOnSale: true,
    rating: 4,
    categories: ["sale"],
  },
 
];

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
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 ">
            <h2 className="text-3xl md:text-4xl font-playfair text-black">
              Deal Of The Week
            </h2>

            {/* Countdown */}
            <div className="flex  items-center gap-2 flex-wrap ">
              <span className="text-sm text-[#555] mr-2">
                Hurry up! Offer ends in:
              </span>

             <div className="flex items-center gap-2">
                 {[
                { label: "DAYS", value: timeLeft.days },
                { label: "HRS", value: timeLeft.hours },
                { label: "MIN", value: timeLeft.minutes },
                { label: "SEC", value: timeLeft.seconds },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-black text-white text-sm font-medium px-3 py-2 text-center min-w-[48px]"
                >
                  {pad(item.value)}
                  <span className="block text-[10px] text-white/60">
                    {item.label}
                  </span>
                </div>
              ))}
             </div>
            </div>
          </div>

          {/* Nav */}
           <div className="hidden md:flex gap-2 shrink-0">
              <button className="deal-prev w-10 h-10 border border-black flex items-center justify-center hover:bg-black hover:text-white transition cursor-pointer">
                <FaChevronLeft />
              </button>
              <button className="deal-next w-10 h-10 border border-black flex items-center justify-center hover:bg-black hover:text-white transition cursor-pointer">
                <FaChevronRight />
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
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {dealProducts.map((product) => (
            <SwiperSlide key={product.title}>
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
