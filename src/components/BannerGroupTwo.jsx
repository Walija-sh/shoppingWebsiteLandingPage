import { motion } from "framer-motion";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
import assets from "../assets/assets";

const promoBanners = [
  {
    image: assets.watch1,
    link: "/shop",
  },
  {
    image: assets.shoes1,
    link: "/shop",
  },
  {
    image: assets.perfume,
    link: "/shop",
  },
];

export default function BannerGroupTwo() {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 md:px-8">
      <motion.div
        className={`grid gap-6 ${
          promoBanners.length === 1
            ? "grid-cols-1"
            : promoBanners.length === 2
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {promoBanners.map((banner, idx) => (
          <motion.div
            key={idx}
            className="relative overflow-hidden rounded-[32px] md:rounded-[40px] flex items-end justify-end group"
            style={{
              backgroundImage: `url(${banner.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "300px",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              delay: idx * 0.15,
              ease: "easeOut"
            }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Hover overlay effect */}
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.1 }}
              transition={{ duration: 0.3 }}
            />

            <motion.div 
              className="relative p-6 md:p-10 w-full flex justify-end"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: idx * 0.15 + 0.3
              }}
            >
              <Link to={banner.link}>
                <motion.div
                  className="bg-white text-black px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-gray-200 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View More
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GoArrowRight className="text-lg" />
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}