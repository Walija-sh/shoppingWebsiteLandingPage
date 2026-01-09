import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const SimilarProducts = ({ products }) => {
  if (!products.length) return null;
  const MAX_SLIDES = 4;
const shouldLoop = products.length > MAX_SLIDES;


  return (
    <section className="mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black mb-10">
          Similar Products
        </h2>

       
        <Swiper
          loop={shouldLoop}
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
          className="product-swiper "
        >
          {products.map((product) => (
            <SwiperSlide key={product.title} className="overflow-visible pb-4">
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SimilarProducts;
