import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "./ProductCard";
import { dealProducts } from "../data/products.js";

import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

export default function DealOfWeek() {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
       
        <div className="bg-white rounded-[40px] py-6 md:py-12 relative overflow-hidden">

        
          
<div className="flex  justify-between sm:items-end gap-4 mb-12 relative z-10">
  
  <h2 className="text-3xl md:text-5xl font-bold w-fit text-gray-900 tracking-tight ">
    Best Seller
  </h2>

 
  <div className="flex items-center justify-between sm:justify-end gap-6">
   
    <Link to="#"
  className="group inline-flex items-center cursor-pointer gap-2 text-sm md:text-base font-semibold text-black "
>
  <span className="relative ">
    View All
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
  </span>

 
</Link>


  
    <div className="hidden lg:flex gap-4">
      <button className="deal-prev w-14 h-14 bg-white rounded-full flex items-center justify-center text-black shadow-sm hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-50 cursor-pointer">
        <FaChevronLeft className="text-lg" />
      </button>
      <button className="deal-next w-14 h-14 bg-white rounded-full flex items-center justify-center text-black shadow-sm hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-50 cursor-pointer">
        <FaChevronRight className="text-lg" />
      </button>
    </div>
  </div>
</div>


         
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
