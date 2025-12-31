import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  HiChevronDown,
  HiChevronUp,
  HiBars3,
  HiXMark,
} from "react-icons/hi2";
import { GoSearch, GoHeart, GoInbox } from "react-icons/go";


export const navConfig = [
  { label: "Home", to: "/" },
  {
    label: "Collections",
    mega: [
      {
        title: "Shop",
        items: [
          {
            label: "All Products",
            children: [
              { label: "Best Sellers", to: "#" },
              { label: "New Arrivals", to: "#" },
              { label: "Deals & Offers", to: "#" },
            ],
          },
          {
            label: "Categories",
            children: [
              {
                label: "Clothing",
                nested: [
                  { label: "Men", to: "#" },
                  { label: "Women", to: "#" },
                  { label: "Kids", to: "#" },
                ],
              },
              {
                label: "Electronics",
                nested: [
                  { label: "Mobiles", to: "#" },
                  { label: "Laptops", to: "#" },
                  { label: "Accessories", to: "#" },
                ],
              },
              { label: "Accessories", to: "#" },
            ],
          },
        ],
      },
      {
        title: "Collections",
        items: [
          {
            label: "Featured",
            children: [
              {
                label: "Trending",
                nested: [
                  { label: "This Week", to: "#" },
                  { label: "This Month", to: "#" },
                ],
              },
              { label: "Editor’s Choice", to: "#" },
            ],
          },
          {
            label: "Special",
            children: [
              { label: "Limited Stock", to: "#" },
              { label: "Premium Selection", to: "#" },
            ],
          },
        ],
      },
    ],
  },
  { label: "About", to: "#" },
  { label: "Support", to: "#" },
];

export default function Header() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [openNested, setOpenNested] = useState(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenItem, setMobileOpenItem] = useState(null);
  const [mobileNestedOpen, setMobileNestedOpen] = useState(null);

  const [isSmallScreen, setIsSmallScreen] = useState(
  window.innerWidth < 500
);


  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef(null);

  
  useEffect(() => {
    const handler = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveMenu(null);
        setOpenNested(null);
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

 
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobileMenuOpen]);

  useEffect(() => {
  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 500);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  return (
    <header
      ref={headerRef}
      className="fixed top-0 w-full z-[100] bg-white border-b border-[#eee]"
    >
      <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
        
        <Link to="/" className="text-2xl font-black uppercase">
          Brand.
        </Link>

        
        <nav className="hidden lg:flex items-center gap-10 relative">
          {navConfig.map((item) => {
            if (!item.mega) {
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-[13px] font-bold uppercase tracking-widest"
                >
                  {item.label}
                </Link>
              );
            }

            const isOpen = activeMenu === item.label;

            return (
              <div key={item.label} className="">
                <button
                  onClick={() =>
                    setActiveMenu(isOpen ? null : item.label)
                  }
                  className="flex cursor-pointer items-center gap-1 text-[13px] font-bold uppercase tracking-widest"
                >
                  {item.label}
                  <HiChevronDown
                    className={`transition ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="absolute top-[40px] left-0 bg-white border border-[#eee] rounded-[24px] shadow-xl p-8 grid grid-cols-2 gap-12">
                    {item.mega.map((group) => (
                      <div key={group.title}>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-[#999] mb-4">
                          {group.title}
                        </p>

                        <ul className="space-y-4">
                          {group.items.map((i) => (
                            <li key={i.label}>
                              <p className="font-semibold text-sm mb-2">
                                {i.label}
                              </p>

                              <ul className="ml-3 space-y-2">
                                {i.children.map((c) => {
                                  const key = `${i.label}-${c.label}`;
                                  const isNestedOpen =
                                    openNested === key;

                                  if (c.nested) {
                                    return (
                                      <li key={c.label}>
                                        <button
                                          onClick={() =>
                                            setOpenNested(
                                              isNestedOpen ? null : key
                                            )
                                          }
                                          className="w-full flex justify-between text-sm font-medium"
                                        >
                                          {c.label}
                                          <HiChevronDown
                                            className={`transition ${
                                              isNestedOpen
                                                ? "rotate-180"
                                                : ""
                                            }`}
                                          />
                                        </button>

                                        {isNestedOpen && (
                                          <ul className="ml-4 mt-2 border-l border-[#eee] pl-4 space-y-1">
                                            {c.nested.map((n) => (
                                              <li key={n.label}>
                                                <Link
                                                  to={n.to}
                                                  className="block text-sm text-[#555]"
                                                >
                                                  {n.label}
                                                </Link>
                                              </li>
                                            ))}
                                          </ul>
                                        )}
                                      </li>
                                    );
                                  }

                                  return (
                                    <li key={c.label}>
                                      <Link
                                        to={c.to}
                                        className="text-sm text-[#555]"
                                      >
                                        {c.label}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        
        <div className="flex items-center gap-5">
          {/* Search */}
          <div className="relative flex items-center gap-2">
            <div
              className={`transition-all duration-300 ${
                searchOpen
                  ? " w-full max-w-[220px] opacity-100"
                  : "w-0 opacity-0 pointer-events-none"
              }`}
            >
              <input
                autoFocus={searchOpen}
                type="text"
                placeholder="Search..."
                className="w-full border border-[#ddd] rounded-full px-4 py-1.5 text-sm"
              />
            </div>
            <button className="cursor-pointer" onClick={() => setSearchOpen((p) => !p)}>
              <GoSearch className="text-xl" />
            </button>
          </div>

          <GoHeart className="hidden md:block text-xl cursor-pointer" />

         {!(isSmallScreen && searchOpen) && (
  <div className="relative text-xl cursor-pointer">
    <GoInbox />
    <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
      0
    </span>
  </div>
)}


          {/* Mobile toggle */}
        {!(isSmallScreen && searchOpen) && (
  <button
    className="lg:hidden text-2xl cursor-pointer"
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  >
    {mobileMenuOpen ? <HiXMark /> : <HiBars3 />}
  </button>
)}

        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-[60px] left-0 right-0 bottom-0 z-[1000] bg-white overflow-y-auto border-t p-6 space-y-6">
          {navConfig.map((item) => {
            if (!item.mega) {
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className="block text-lg font-bold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            }

            const open = mobileOpenItem === item.label;

            return (
              <div key={item.label}>
                <button
                  onClick={() =>
                    setMobileOpenItem(open ? null : item.label)
                  }
                  className="flex justify-between w-full text-lg font-bold"
                >
                  {item.label}
                  {open ? <HiChevronUp /> : <HiChevronDown />}
                </button>

                {open && (
                  <div className="mt-4 ml-3 space-y-4">
                    {item.mega.map((group) =>
                      group.items.map((i) => (
                        <div key={i.label} className="space-y-2">
                          <p className="font-semibold">{i.label}</p>

                          {i.children.map((c) => {
                            const key = `${i.label}-${c.label}`;
                            const nestedOpen =
                              mobileNestedOpen === key;

                            if (c.nested) {
                              return (
                                <div key={c.label} className="ml-3">
                                  <button
                                    onClick={() =>
                                      setMobileNestedOpen(
                                        nestedOpen ? null : key
                                      )
                                    }
                                    className="w-full flex justify-between text-sm font-medium"
                                  >
                                    {c.label}
                                    <HiChevronDown
                                      className={`transition ${
                                        nestedOpen
                                          ? "rotate-180"
                                          : ""
                                      }`}
                                    />
                                  </button>

                                  {nestedOpen && (
                                    <div className="ml-4 mt-2 border-l border-[#eee] pl-4 space-y-1">
                                      {c.nested.map((n) => (
                                        <Link
                                          key={n.label}
                                          to={n.to}
                                          className="block text-sm py-1"
                                          onClick={() =>
                                            setMobileMenuOpen(false)
                                          }
                                        >
                                          {n.label}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            }

                            return (
                              <Link
                                key={c.label}
                                to={c.to}
                                className="block ml-3 text-sm py-1"
                                onClick={() =>
                                  setMobileMenuOpen(false)
                                }
                              >
                                {c.label}
                              </Link>
                            );
                          })}
                        </div>
                      ))
                    )}
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
