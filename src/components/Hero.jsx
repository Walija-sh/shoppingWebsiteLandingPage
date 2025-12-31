import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    badge: "New Arrivals",
    heading: "Designed for Everyday Use",
    subheading:
      "Explore high-quality products built for comfort, performance, and daily reliability all in one place.",
    cta1: "Shop Now",
    cta2: "Browse Collection",
    img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    themeColor: "#000000",
  },
  {
    badge: "Trending",
    heading: "Quality That Fits Your Lifestyle",
    subheading:
      "From essentials to upgrades, discover products selected to match modern needs and active routines.",
    cta1: "Explore Products",
    cta2: "View Categories",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    themeColor: "#1F2937",
  },
  {
    badge: "Best Sellers",
    heading: "Built for Performance & Comfort",
    subheading:
      "Reliable designs, premium materials, and practical solutions made to support everyday tasks.",
    cta1: "See Best Sellers",
    cta2: "Learn More",
    img: "https://images.unsplash.com/photo-1503602642458-232111445657",
    themeColor: "#111827",
  },
];

export default function Hero() {
  return (
    <section className="px-4 py-6 md:px-8 md:py-8 bg-white">
      <div className="max-w-7xl mx-auto overflow-hidden rounded-[32px] md:rounded-[48px] bg-[#F5F5F7] shadow-sm">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          loop={true}
          className="hero-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative min-h-[600px] flex items-center px-8 md:px-16 lg:px-24">
                
                {/* Text Content */}
                <div className="relative z-20 w-full  flex flex-col items-start text-left">
                  <span
                    className="mb-6 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] bg-white shadow-sm"
                    style={{ color: slide.themeColor }}
                  >
                    {slide.badge}
                  </span>

                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 leading-[0.95] mb-6">
                    {slide.heading}
                  </h1>

                  <p className="max-w-md text-lg md:text-xl text-gray-500 font-medium leading-relaxed mb-10">
                    {slide.subheading}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="#"
                      className="px-10 py-4 w-full text-center md:w-fit bg-black text-white rounded-full text-sm font-semibold"
                    >
                      {slide.cta1}
                    </Link>

                    <Link
                      to="#"
                      className="px-10 py-4 w-full text-center md:w-fit bg-transparent border border-gray-300 text-black rounded-full text-sm font-semibold"
                    >
                      {slide.cta2}
                    </Link>
                  </div>
                </div>

                {/* Image */}
                <div className=" z-10 hidden  md:flex items-center justify-end pointer-events-none ">
                  <img
                    src={slide.img}
                    alt={slide.heading}
                    className=" h-auto max-h-[250px] lg:max-h-[400px] object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hero-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #000;
          opacity: 0.2;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 4px;
          opacity: 1;
        }
      `}} />
    </section>
  );
}
