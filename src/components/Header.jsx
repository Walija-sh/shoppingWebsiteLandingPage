import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  HiChevronDown,
  HiChevronUp,
  HiBars3,
  HiXMark,
} from "react-icons/hi2";
import { GoSearch, GoPerson, GoHeart, GoInbox } from "react-icons/go";
export const navConfig = [
  {
    label: "All Products",
    to: "#",
    mega: {
      categories: [
        { label: "Browse All", to: "#" },
        { label: "Best Sellers", to: "#" },
        { label: "New Arrivals", to: "#" },
        { label: "Deals & Offers", to: "#" },
      ],
      collections: [
        { label: "Featured Picks", to: "#" },
        { label: "Staff Favorites", to: "#" },
        { label: "Trending Now", to: "#" },
      ],
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    },
  },
  {
    label: "Categories",
    to: "#",
    mega: {
      categories: [
        { label: "Clothing & Apparel", to: "#" },
        { label: "Electronics", to: "#" },
        { label: "Fitness & Sports", to: "#" },
        { label: "Accessories", to: "#" },
      ],
      collections: [
        { label: "Everyday Essentials", to: "#" },
        { label: "Premium Selection", to: "#" },
        { label: "Limited Stock", to: "#" },
      ],
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600",
    },
  },
  {
    label: "Collections",
    to: "#",
    mega: {
      categories: [
        { label: "New Season", to: "#" },
        { label: "Minimal Series", to: "#" },
        { label: "Performance Line", to: "#" },
        { label: "Best Value", to: "#" },
      ],
      collections: [
        { label: "Editor’s Choice", to: "#" },
        { label: "Customer Favorites", to: "#" },
        { label: "Recently Added", to: "#" },
      ],
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?w=600",
    },
  },
  {
    label: "About",
    to: "#",
  },
  {
    label: "Support",
    to: "#",
  },
];

export default function Header() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenItem, setMobileOpenItem] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

 
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

    
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
        setMobileOpenItem(null);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileMenuOpen]);


  useEffect(() => {
    const handleClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg border-b border-gray-100 py-3"
          : "bg-white py-5"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-black tracking-tighter uppercase"
        >
          Brand.
        </Link>

        
        <nav className="hidden lg:flex items-center gap-10">
          {navConfig.map((item) => {
            const hasMega = !!item.mega;
            const isOpen = activeMenu === item.label;

           
            if (!hasMega) {
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-[13px] font-bold uppercase tracking-widest text-gray-900 hover:text-gray-500 transition"
                >
                  {item.label}
                </Link>
              );
            }

            
            return (
              <div key={item.label} className="relative">
                <button
                  onMouseEnter={() => setActiveMenu(item.label)}
                  className="flex items-center gap-1 text-[13px] font-bold uppercase tracking-widest text-gray-900 hover:text-gray-500 transition"
                >
                  {item.label}
                  <HiChevronDown
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    onMouseLeave={() => setActiveMenu(null)}
                    className="absolute top-[40px] -left-40 w-[720px] bg-white rounded-[32px] shadow-2xl border border-gray-100 p-8 grid grid-cols-3 gap-10"
                  >
                    
                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">
                        Categories
                      </h4>
                      <ul className="space-y-4">
                        {item.mega.categories.map((c) => (
                          <li key={c.label}>
                            <Link
                              to={c.to}
                              className="text-sm font-semibold text-gray-900 hover:text-gray-600"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    
                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">
                        Featured
                      </h4>
                      <ul className="space-y-4">
                        {item.mega.collections.map((c) => (
                          <li key={c.label}>
                            <Link
                              to={c.to}
                              className="text-sm font-semibold text-gray-900 hover:text-gray-600"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    
                    <div className="relative rounded-2xl overflow-hidden group">
                      <img
                        src={item.mega.image}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        alt=""
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-end p-4">
                        <Link
                          to={item.to}
                          className="w-full text-center bg-white py-3 rounded-xl text-xs font-black uppercase tracking-widest"
                        >
                          View All
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        
        <div className="flex items-center gap-5">
          <GoSearch className="text-xl" />
          <GoHeart className="hidden md:block text-xl" />
          <div className="relative text-xl">
            <GoInbox />
            <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </div>
          <GoPerson className="hidden md:block text-xl" />

          <button
            className="lg:hidden text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <HiXMark /> : <HiBars3 />}
          </button>
        </div>
      </div>

      
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[70px] bg-white z-[90] p-6 lg:hidden overflow-y-auto">
          <div className="space-y-6">
            {navConfig.map((item) => {
              const hasMega = !!item.mega;
              const isOpen = mobileOpenItem === item.label;

              return (
                <div key={item.label} className="border-b pb-4">
                  <div className="flex justify-between items-center">
                    {hasMega ? (
                      <button
                        onClick={() =>
                          setMobileOpenItem(isOpen ? null : item.label)
                        }
                        className="text-xl font-bold"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        to={item.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-xl font-bold"
                      >
                        {item.label}
                      </Link>
                    )}

                    {hasMega &&
                      (isOpen ? <HiChevronUp /> : <HiChevronDown />)}
                  </div>

                  {/* Mobile dropdown */}
                  {isOpen && hasMega && (
                    <div className="mt-4 ml-2 space-y-6">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                          Categories
                        </p>
                        {item.mega.categories.map((c) => (
                          <Link
                            key={c.label}
                            to={c.to}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-1 text-sm"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                          Featured
                        </p>
                        {item.mega.collections.map((c) => (
                          <Link
                            key={c.label}
                            to={c.to}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-1 text-sm"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
