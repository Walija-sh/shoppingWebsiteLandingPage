

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
    tag: "Coat & Jackets",
    title: "The New Fashion Collection",
    cta: "Shop Now",
    link: "#",
  },
];
export default function PromoBanner() {
  return (
    <section className="py-8 max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {promoBanners.map((banner) => (
            <a
              key={banner.title}
              href={banner.link}
              className="relative group overflow-hidden aspect-[4/3] md:aspect-[16/10]"
            >
              <img
                src={banner.image}
                alt={banner.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <span className="text-white/80 text-sm uppercase tracking-wider font-medium">
                  {banner.tag}
                </span>

                <h3 className="font-playfair text-2xl md:text-3xl text-white font-medium mt-1 mb-2">
                  {banner.title}
                </h3>

                <span className="inline-block mt-4 px-6 py-2 bg-white text-black text-sm font-medium hover:opacity-90 transition">
                  {banner.cta}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
