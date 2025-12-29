import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

import { CiHeart, CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import { GoHeart } from "react-icons/go";
import { VscMenu } from "react-icons/vsc";
import { TfiClose } from "react-icons/tfi";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenItem, setMobileOpenItem] = useState(null);
  const headerRef = useRef(null);

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
      image:
        "https://images.unsplash.com/photo-1617790274211-cbe0e677b425?w=600",
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
      image:
        "https://images.unsplash.com/photo-1696489283182-0446be970e40?w=600",
    },
  },
  {
    label: "Men",
    to: "#",
    mega: {
      categories: [
        { label: "Shirts", to: "#" },
        { label: "Jackets", to: "#" },
        { label: "Jeans", to: "#" },
        { label: "T-Shirts", to: "#" },
      ],
      collections: [
        { label: "Formal", to: "#" },
        { label: "Sportswear", to: "#" },
        { label: "Weekend", to: "#" },
      ],
      image:
        "https://images.unsplash.com/photo-1622450180332-3da1126f10a4?w=600",
    },
  },
  {
    label: "Kids",
    to: "#",
  },
  {
    label: "Deals",
    to: "#",
  },
  {
    label: "Blog",
    to: "#",
  },
];


  // Close mega menu on outside click
  useEffect(() => {
    function handleOutsideClick(e) {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () =>
      document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-white shadow-sm"
    >
      {/* Top Bar */}
      <div className="bg-black text-white text-sm px-4 py-2">
        <div className="max-w-7xl mx-auto flex justify-between">
          <span>Free shipping worldwide on orders over $199</span>
          <div className="hidden md:flex items-center gap-2">

          <a href="mailto:support@fashion.com" className="">support@fashion.com</a>
          <span className="w-[1px] h-3 bg-white shrink-0 "></span>
          <a href="tel:+12345678900" className="">+1 (234) 567-8900</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="relative max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl md:text-3xl lg:text-4xl font-playfair ">FASHION</div>

        {/* Desktop Navigation */}
       <nav className="hidden lg:flex gap-8">
  {navConfig.map((item) => {
    const hasMega = !!item.mega;
    const isOpen = activeMenu === item.label;

    return (
      <div key={item.label}>
        <button
          onClick={() =>
            setActiveMenu(isOpen ? null : item.label)
          }
          className="flex items-center gap-1 cursor-pointer text-[#333] hover:opacity-70"
        >
          {item.label}
          {hasMega && (
            <HiChevronDown
              className={`transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          )}
        </button>

        {isOpen && hasMega && (
          <div className="absolute left-0 top-full w-screen bg-white shadow-xl">
            <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Categories */}
              <div>
                <h4 className=" font-bold uppercase text-[#444444] mb-4">
                  Categories
                </h4>
                <ul className="space-y-2">
                  {item.mega.categories.map((c) => (
                    <li key={c.label}>
                      <Link
                        to={c.to}
                        onClick={() => setActiveMenu(null)}
                        className="text-[#555555] hover:text-black"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Collections */}
              <div>
                <h4 className=" font-bold uppercase text-[#444444] mb-4">
                  Collections
                </h4>
                <ul className="space-y-2">
                  {item.mega.collections.map((c) => (
                    <li key={c.label}>
                      <Link
                        to={c.to}
                        onClick={() => setActiveMenu(null)}
                        className="text-[#555555] hover:text-black"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image */}
              <div className="relative h-56  overflow-hidden">
                <img
                  src={item.mega.image}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                  <Link
                    to={item.to}
                    onClick={() => setActiveMenu(null)}
                    className="text-black bg-white px-4 py-2 text-xl"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  })}
</nav>


        {/* Right Icons */}
        <div className="flex items-center gap-4 text-xl lg:text-2xl">
          <CiSearch className="cursor-pointer hover:text-[#8B2C34] transition-all duration-75 ease-linear" />
          <div className="relative">
            <CiShoppingCart className="cursor-pointer hover:text-[#8B2C34] transition-all duration-75 ease-linear" />
            <span className="absolute -top-2 -right-2 bg-[#8B2C34] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              0
            </span>
          </div>
          <Link to="#">
          <CiHeart className="cursor-pointer hover:text-[#8B2C34] transition-all duration-75 ease-linear" /></Link>
          <Link to="#">
           <CiUser className="cursor-pointer hover:text-[#8B2C34] transition-all duration-75 ease-linear" /></Link>
         
          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <TfiClose className="cursor-pointer" /> : <VscMenu className="cursor-pointer" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
{mobileMenuOpen && (
  <div className="lg:hidden border-t border-[#e5e5e5] px-4 py-6 space-y-4">
    {navConfig.map((item) => {
      const hasMega = !!item.mega;
      const isOpen = mobileOpenItem === item.label;

      return (
        <div key={item.label}>
          {/* Top-level item */}
          <div className="flex justify-between items-center">
            <Link
              to={item.to}
              className="text-[#333333] font-medium"
              onClick={() => {
                if (!hasMega) {
                  setMobileMenuOpen(false);
                  setMobileOpenItem(null);
                }
              }}
            >
              {item.label}
            </Link>

            {hasMega && (
              <button
                onClick={() =>
                  setMobileOpenItem(isOpen ? null : item.label)
                }
                className="ml-2"
              >
                {isOpen ? <HiChevronUp /> : <HiChevronDown />}
              </button>
            )}
          </div>

          {/* Expanded Mega Content */}
          {isOpen && hasMega && (
            <div className="mt-4 ml-3 space-y-5">
              {/* Categories */}
              <div>
                <h5 className="text-xs font-bold uppercase text-[#444444] mb-2">
                  Categories
                </h5>
                <ul className="space-y-2">
                  {item.mega.categories.map((c) => (
                    <li key={c.label}>
                      <Link
                        to={c.to}
                        className="text-sm text-[#555555]"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileOpenItem(null);
                        }}
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Collections */}
              <div>
                <h5 className="text-xs font-bold uppercase text-[#444444] mb-2">
                  Collections
                </h5>
                <ul className="space-y-2">
                  {item.mega.collections.map((c) => (
                    <li key={c.label}>
                      <Link
                        to={c.to}
                        className="text-sm text-[#555555]"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileOpenItem(null);
                        }}
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      );
    })}
  </div>
)}

    </header>
  );
}
