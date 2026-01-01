import React, { useState, useEffect, useRef, useCallback } from "react";
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
              { label: "Editor's Choice", to: "#" },
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
  { label: "Contact", to: "#" },
  { label: "Support", to: "#" },
];

export default function Header() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [openNested, setOpenNested] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenItem, setMobileOpenItem] = useState(null);
  const [mobileNestedOpen, setMobileNestedOpen] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  
  const [breakpoints, setBreakpoints] = useState({
    isSmallScreen: typeof window !== 'undefined' ? window.innerWidth < 640 : false,
    isMobileScreen: typeof window !== 'undefined' ? window.innerWidth < 1024 : false,
  });
  
  const headerRef = useRef(null);

  // Single resize handler
  const handleResize = useCallback(() => {
    setBreakpoints({
      isSmallScreen: window.innerWidth < 640,
      isMobileScreen: window.innerWidth < 1024,
    });
  }, []);

  // Single resize effect
  useEffect(() => {
    handleResize(); // Set initial values
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Click outside handler
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

  // Body overflow handler
  useEffect(() => {
    if (mobileMenuOpen && breakpoints.isMobileScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, breakpoints.isMobileScreen]);

  // Memoized render helper for nested items
  const renderNestedItems = (items, isMobile = false) => {
    return items.map((item) => {
      if (item.nested) {
        const key = `${item.label}-${item.nested.length}`;
        const isOpen = isMobile ? mobileNestedOpen === key : openNested === key;
        
        return (
          <li key={key} className="cursor-pointer">
            <button
              onClick={() => {
                if (isMobile) {
                  setMobileNestedOpen(isOpen ? null : key);
                } else {
                  setOpenNested(isOpen ? null : key);
                }
              }}
              className="w-full flex cursor-pointer justify-between text-sm font-medium"
            >
              {item.label}
              <HiChevronDown
                className={`transition ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isOpen && (
              <ul className={`${isMobile ? 'ml-4 mt-2 border-l border-[#eee] pl-4 space-y-1' : 'ml-4 mt-2 border-l border-[#eee] pl-4 space-y-1'}`}>
                {item.nested.map((nestedItem) => (
                  <li key={nestedItem.label}>
                    <Link
                      to={nestedItem.to}
                      className={`block ${isMobile ? 'text-sm py-1' : 'text-sm text-[#555]'}`}
                      onClick={() => isMobile && setMobileMenuOpen(false)}
                    >
                      {nestedItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      }

      return (
        <li key={item.label}>
          <Link
            to={item.to}
            className={`${isMobile ? 'block ml-3 text-sm py-1' : 'text-sm text-[#555]'}`}
            onClick={() => isMobile && setMobileMenuOpen(false)}
          >
            {item.label}
          </Link>
        </li>
      );
    });
  };

  // Render mega menu content
  const renderMegaMenu = (megaConfig, isMobile = false) => {
    return megaConfig.map((group) => (
      <div key={group.title}>
        {!isMobile && (
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#999] mb-4">
            {group.title}
          </p>
        )}
        <ul className={`${isMobile ? 'space-y-2' : 'space-y-4'}`}>
          {group.items.map((item) => (
            <li key={item.label}>
              {!isMobile ? (
                <>
                  <p className="font-semibold text-sm mb-2">{item.label}</p>
                  <ul className="ml-3 space-y-2">
                    {renderNestedItems(item.children, isMobile)}
                  </ul>
                </>
              ) : (
                <>
                  <p className="font-semibold">{item.label}</p>
                  <div className="ml-3 space-y-2">
                    {renderNestedItems(item.children, true)}
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  const { isSmallScreen, isMobileScreen } = breakpoints;
  const shouldHideLogo = isSmallScreen && searchOpen;

  return (
    <header
      ref={headerRef}
      className="fixed top-0 w-full z-[100] bg-white border-b border-[#eee] relative"
    >
      <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        {!shouldHideLogo && (
          <Link to="/" className="text-2xl font-black uppercase">
            Brand.
          </Link>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
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
                  onClick={() => setActiveMenu(isOpen ? null : item.label)}
                  className="flex cursor-pointer items-center gap-1 text-[13px] font-bold uppercase tracking-widest"
                >
                  {item.label}
                  <HiChevronDown
                    className={`transition ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="absolute top-[50px] left-0 right-0 w-full bg-white border border-[#eee] rounded-[24px] shadow-xl p-8 grid grid-cols-2 gap-12">
                    {renderMegaMenu(item.mega)}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right side icons */}
        <div className="flex items-center gap-5 grow lg:grow-0">
          {/* Search */}
          <div className="relative grow w-full flex items-center justify-end gap-2">
            <div
              className={`transition-all duration-300 ${
                searchOpen
                  ? "w-full sm:max-w-[220px] opacity-100"
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
            <button
              className="cursor-pointer"
              onClick={() => setSearchOpen((p) => !p)}
            >
              <GoSearch className="text-xl" />
            </button>
          </div>

          <GoHeart className="hidden md:block text-xl cursor-pointer shrink-0" />

          {!shouldHideLogo && (
            <div className="relative text-xl cursor-pointer">
              <GoInbox />
              <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </div>
          )}

          {/* Mobile toggle */}
          {!shouldHideLogo && (
            <button
              className="lg:hidden text-2xl cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <HiXMark /> : <HiBars3 />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && isMobileScreen && (
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
                  onClick={() => setMobileOpenItem(open ? null : item.label)}
                  className="flex justify-between w-full text-lg font-bold"
                >
                  {item.label}
                  {open ? <HiChevronUp /> : <HiChevronDown />}
                </button>

                {open && (
                  <div className="mt-4 ml-3 space-y-4">
                    {renderMegaMenu(item.mega, true)}
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