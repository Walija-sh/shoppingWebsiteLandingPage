import { useContext, useMemo, useState } from "react";
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
        
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-4">
            The Latest & Greatest
          </h2>

          
         <div className="flex overflow-x-scroll no-scrollbar bg-[#F5F5F7] p-1.5 rounded-full mt-4 max-w-full">
  {tabs.map((tab) => (
    <button
      key={tab.value}
      onClick={() => setActiveTab(tab.value)}
      className={`px-6 py-2.5 text-sm font-bold cursor-pointer whitespace-nowrap rounded-full transition ${
        activeTab === tab.value
          ? "bg-white text-black shadow-md"
          : "text-gray-500 hover:text-black"
      }`}
    >
      {tab.label}
    </button>
  ))}
</div>

        </div>

        
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
  {filteredProducts.map((product) => (
    <SwiperSlide key={product.title}>
      <ProductCard {...product} />
    </SwiperSlide>
  ))}
</Swiper>


       
        <div className="mt-16 flex justify-center">
          <Link to='/shop' className="px-12 py-4 bg-[#F5F5F7] text-black rounded-full text-sm font-bold hover:bg-black hover:text-white transition shadow-sm cursor-pointer">
            View All Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
