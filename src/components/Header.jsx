import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { HiChevronDown, HiBars3, HiXMark } from "react-icons/hi2";
import { GoSearch, GoPerson, GoHeart, GoInbox } from "react-icons/go";

const navConfig = [
  {
    label: "Shop",
    to: "#",
    mega: {
      categories: [
        { label: "All Items", to: "#" },
        { label: "Best Sellers", to: "#" },
        { label: "New Arrivals", to: "#" },
        { label: "Sale Items", to: "#" },
      ],
      collections: [
        { label: "Fall Collection", to: "#" },
        { label: "Winter Collection", to: "#" },
        { label: "Vacation Wear", to: "#" },
      ],
      image: "https://images.unsplash.com/photo-1617790274211-cbe0e677b425?w=600",
    },
  },
  {
    label: "Women",
    to: "#",
    mega: {
      categories: [
        { label: "Dresses", to: "#" },
        { label: "Jackets", to: "#" },
        { label: "Jeans", to: "#" },
        { label: "Tops", to: "#" },
      ],
      collections: [
        { label: "Work Wear", to: "#" },
        { label: "Casual", to: "#" },
        { label: "Evening", to: "#" },
      ],
      image: "https://images.unsplash.com/photo-1696489283182-0446be970e40?w=600",
    },
  },
  { label: "Men", to: "#" },
  { label: "New Tech", to: "#" },
  { label: "Support", to: "#" },
];

export default function Header() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mega menu on outside click
  useEffect(() => {
    function handleOutsideClick(e) {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-lg border-b border-gray-100 py-3" : "bg-white py-5"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-black tracking-tighter uppercase leading-none">
          Brand.
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navConfig.map((item) => {
            const hasMega = !!item.mega;
            const isOpen = activeMenu === item.label;

            return (
              <div key={item.label} className="relative">
                <button
                  onMouseEnter={() => hasMega && setActiveMenu(item.label)}
                  className="flex items-center gap-1 text-[13px] font-bold uppercase tracking-widest text-gray-900 hover:text-gray-500 transition-colors"
                >
                  {item.label}
                  {hasMega && <HiChevronDown className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />}
                </button>

                {/* Desktop Mega Menu Dropdown */}
                {isOpen && hasMega && (
                  <div 
                    onMouseLeave={() => setActiveMenu(null)}
                    className="absolute top-[40px] -left-10 w-[700px] bg-white rounded-[32px] shadow-2xl border border-gray-100 p-8 grid grid-cols-3 gap-10 animate-in fade-in slide-in-from-top-2"
                  >
                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Categories</h4>
                      <ul className="space-y-4">
                        {item.mega.categories.map((c) => (
                          <li key={c.label}>
                            <Link to={c.to} className="text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors">{c.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Featured</h4>
                      <ul className="space-y-4">
                        {item.mega.collections.map((c) => (
                          <li key={c.label}>
                            <Link to={c.to} className="text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors">{c.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden group">
                      <img src={item.mega.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                      <div className="absolute inset-0 bg-black/20 flex items-end p-4">
                        <Link to={item.to} className="w-full text-center bg-white py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-colors">
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

        {/* Action Icons */}
        <div className="flex items-center gap-5 md:gap-7">
          <button className="text-xl hover:text-gray-400 transition-colors"><GoSearch /></button>
          <button className="text-xl hover:text-gray-400 transition-colors hidden md:block"><GoHeart /></button>
          
          <button className="relative text-xl hover:text-gray-400 transition-colors">
            <GoInbox />
            <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>
          
          <button className="text-xl hover:text-gray-400 transition-colors hidden md:block"><GoPerson /></button>

          <button
            className="lg:hidden text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <HiXMark /> : <HiBars3 />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[70px] bg-white z-[90] p-6 lg:hidden animate-in fade-in slide-in-from-right">
          <div className="space-y-8">
            {navConfig.map((item) => (
              <div key={item.label} className="border-b border-gray-50 pb-4">
                <Link 
                  to={item.to} 
                  className="text-2xl font-bold tracking-tight"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}