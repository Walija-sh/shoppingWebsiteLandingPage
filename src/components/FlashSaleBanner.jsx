import { GoArrowRight } from "react-icons/go";

const flashSaleData = {
  tag: "Limited Time Offer",
  title: "Up to",
  highlight: "80%",
  subtitle: "Off",
  description: "On selected premium items • Ends Dec 31",
  cta: "Shop Now",
  link: "#",
};

export default function FlashSaleBanner() {
  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* The "Shell" - High Contrast Dark Mode Card */}
      <div className="relative overflow-hidden bg-black rounded-[40px] md:rounded-[56px] px-8 py-16 md:px-20 md:py-24 text-center md:text-left isolate">
        
        {/* Modern Background Ambience (Glow effects instead of stripes) */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left Content Area */}
          <div className="max-w-xl">
            {/* Pill Tag */}
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full border border-white/20 bg-white/5 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              {flashSaleData.tag}
            </span>

            {/* Main Typography Stack */}
            <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[0.9]">
              {flashSaleData.title}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 font-black text-[80px] md:text-[160px] leading-[0.9]">
                {flashSaleData.highlight}
              </span>
              <span className="text-4xl md:text-6xl text-gray-400 font-medium ml-2">
                {flashSaleData.subtitle}
              </span>
            </h3>

            <p className="text-gray-400 text-lg md:text-xl mt-8 font-medium max-w-md">
              {flashSaleData.description}
            </p>
          </div>

          {/* Right Action Area */}
          <div className="flex-shrink-0">
            <a
              href={flashSaleData.link}
              className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-12 py-5 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              {flashSaleData.cta}
              <GoArrowRight className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}