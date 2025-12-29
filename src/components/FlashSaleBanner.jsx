const flashSaleData = {
  tag: "Flash Sale",
  title: "Up to",
  highlight: "80%",
  subtitle: "Off",
  description: "When you buy $100 E-Gift Cards • Ends Dec 31",
  cta: "Shop Now",
  link: "#",
};

export default function FlashSaleBanner() {
  return (
    <section className="py-8 max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
      <div className="container-custom">
        <div className="relative overflow-hidden bg-[#111111] text-white py-12 md:py-16 px-6 md:px-12">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.05]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 11px)",
              }}
            />
          </div>

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <span className="text-white/60 text-sm uppercase tracking-wider font-medium">
                {flashSaleData.tag}
              </span>

              <h3 className="font-playfair text-3xl md:text-4xl font-medium mt-2">
                {flashSaleData.title}{" "}
                <span className="text-[#8B2C34] font-playfair text-4xl md:text-5xl">{flashSaleData.highlight}</span>{" "}
                {flashSaleData.subtitle}
              </h3>

              <p className="text-white/70 mt-2">
                {flashSaleData.description}
              </p>
            </div>

            <a
              href={flashSaleData.link}
              className="bg-white text-black px-10 py-4 font-medium uppercase tracking-wider text-sm hover:bg-[#8B2C34] hover:text-white transition-colors"
            >
              {flashSaleData.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
