import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    badge: "Holiday Deals 2025",
    heading: "Fall Collection For Modern Women",
    subheading: "Discover timeless styles crafted for comfort, confidence, and everyday elegance.",
    cta1: "Shop Now",
    cta2: "Explore Collection",
    img: "/assets/hero/heroImg1.png",
  },
  {
    badge: "Winter Specials 2025",
    heading: "Winter Wardrobe Essentials",
    subheading: "Stay warm and stylish with our curated winter collection.",
    cta1: "Shop Now",
    cta2: "Explore Collection",
    img: "/assets/hero/heroImg2.png",
  },
  {
    badge: "Spring Arrivals 2025",
    heading: "Fresh Spring Styles",
    subheading: "Brighten your wardrobe with colors and patterns for the season.",
    cta1: "Shop Now",
    cta2: "Explore Collection",
    img: "/assets/hero/heroImg3.png",
  },
];

export default function Hero() {
  return (
    <section className="relative bg-[#F2F2F2]">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="max-w-7xl mx-auto lg:max-h-[1000px] grid md:grid-cols-2 gap-3 overflow-hidden">
              {/* Content */}
              <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 md:px-6 lg:px-10 flex items-center">
                <div className="max-w-xl text-black">
                  <span className="inline-block bg-[#8B2C34] text-white text-xs font-semibold uppercase tracking-wider px-4 py-1 mb-4">
                    {slide.badge}
                  </span>

                  <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl leading-tight mb-4">
                    {slide.heading.split("For")[0]} <br className="hidden sm:block" />
                    {slide.heading.split("For")[1] && "For" + slide.heading.split("For")[1]}
                  </h1>

                  <p className="text-base md:text-lg text-[#555] mb-8">{slide.subheading}</p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="#"
                      className="inline-flex items-center justify-center bg-[#8B2C34] text-white px-8 py-4 text-sm md:text-xl font-light hover:opacity-90 transition"
                    >
                      {slide.cta1}
                    </Link>

                    <Link
                      to="#"
                      className="inline-flex items-center justify-center border border-black text-black px-8 py-4 text-sm md:text-xl font-light hover:bg-black hover:text-white transition"
                    >
                      {slide.cta2}
                    </Link>
                  </div>

                  <p className="text-sm text-[#333] mt-6">Free shipping on orders over $99</p>
                </div>
              </div>

              {/* Background Image */}
              <div className="w-full   flex justify-center items-end">
                <img
                  src={slide.img}
                  alt={slide.heading}
                  className="w-full h-full object-contain object-bottom max-h-[250px] md:max-h-[500px]"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
