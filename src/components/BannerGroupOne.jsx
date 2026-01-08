import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
import assets from "../assets/assets";

const promoBanners = [
  {
    image: assets.banner2,
    link: "/shop",
  },
  {
    image: assets.banner4,
    link: "/shop",
  }
];

export default function BannerGroupOne() {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 md:px-8">
      <div
        className={`grid gap-6 ${
          promoBanners.length === 1
            ? "grid-cols-1"
            : promoBanners.length === 2
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {promoBanners.map((banner, idx) => (
          <div
            key={idx}
            
            className="relative overflow-hidden rounded-[32px] md:rounded-[40px] flex items-end justify-end"
            style={{
              backgroundImage: `url(${banner.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "300px",
            }}
          >
            

            
            <div className="relative p-6 md:p-10 w-full flex justify-end">
              <Link to={banner.link} className="bg-white text-black px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-gray-200 transition-all duration-300 cursor-pointer">
                View More
                <GoArrowRight className="text-lg" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
