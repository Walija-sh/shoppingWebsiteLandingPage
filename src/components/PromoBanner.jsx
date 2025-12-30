import { GoArrowRight } from "react-icons/go";

const promoBanners = [
  {
    image: "/assets/product/prodImg1.jpg",
    alt: "Cozy sweaters collection",
    tag: "Winter Collection",
    title: "Up to 40% Off Sweaters",
    cta: "Shop Now",
    link: "#",
  },
  {
    image: "/assets/product/prodImg2.jpg",
    alt: "Elegant coats collection",
    tag: "Coats & Jackets",
    title: "The New Fashion Collection",
    cta: "Discover",
    link: "#",
  },
];

export default function PromoBanner() {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promoBanners.map((banner) => (
          <a
            key={banner.title}
            href={banner.link}
            className="group relative rounded-[32px] md:rounded-[40px] overflow-hidden bg-black text-white flex flex-col justify-end p-6 md:p-10"
            style={{
              backgroundImage: `url(${banner.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative flex flex-col gap-6">
              {/* Tag */}
              <span className="w-fit backdrop-blur-md bg-white/20 border border-white/30 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
                {banner.tag}
              </span>

              {/* Title */}
              <h3 className="text-3xl md:text-5xl font-bold leading-[1.1] tracking-tight max-w-xl">
                {banner.title}
              </h3>

              {/* CTA */}
              <button className="mt-2 w-fit bg-white text-black px-8 py-3.5 rounded-full text-sm font-bold flex items-center gap-3 transition-all duration-300 hover:bg-gray-200 hover:gap-4">
                {banner.cta}
                <GoArrowRight className="text-lg" />
              </button>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
