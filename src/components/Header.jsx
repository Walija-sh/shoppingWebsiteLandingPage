import React, { useState, useEffect, useRef, useCallback, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HiChevronDown,
  HiChevronUp,
  HiBars3,
  HiXMark,
} from "react-icons/hi2";
import { GoHeart, GoInbox } from "react-icons/go";
import { AppContext } from "../context/AppContext";
import Search from "./Search";
import assets from "../assets/assets";

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
  const { getCartCount, toggleCart, toggleWishlist, getWishlistCount } = useContext(AppContext);
  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();

  const [breakpoints, setBreakpoints] = useState({
    isSmallScreen: typeof window !== 'undefined' ? window.innerWidth < 640 : false,
    isMobileScreen: typeof window !== 'undefined' ? window.innerWidth < 1024 : false,
  });

  const headerRef = useRef(null);

  const handleResize = useCallback(() => {
    setBreakpoints({
      isSmallScreen: window.innerWidth < 640,
      isMobileScreen: window.innerWidth < 1024,
    });
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

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
    if (mobileMenuOpen && breakpoints.isMobileScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, breakpoints.isMobileScreen]);

  const renderNestedItems = (items, isMobile = false) => {
    return items.map((item) => {
      if (item.nested) {
        const key = `${item.label}-${item.nested.length}`;
        const isOpen = isMobile ? mobileNestedOpen === key : openNested === key;

        return (
          <motion.li 
            key={key} 
            className="cursor-pointer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
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
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <HiChevronDown />
              </motion.div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`${isMobile ? 'ml-4 mt-2 border-l border-[#eee] pl-4 space-y-1' : 'ml-4 mt-2 border-l border-[#eee] pl-4 space-y-1'}`}
                >
                  {item.nested.map((nestedItem, idx) => (
                    <motion.li
                      key={nestedItem.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                    >
                      <Link
                        to={nestedItem.to}
                        className={`block ${isMobile ? 'text-sm py-1' : 'text-sm text-[#555]'}`}
                        onClick={() => isMobile && setMobileMenuOpen(false)}
                      >
                        {nestedItem.label}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.li>
        );
      }

      return (
        <motion.li
          key={item.label}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to={item.to}
            className={`${isMobile ? 'block ml-3 text-sm py-1' : 'text-sm text-[#555]'}`}
            onClick={() => isMobile && setMobileMenuOpen(false)}
          >
            {item.label}
          </Link>
        </motion.li>
      );
    });
  };

  const renderMegaMenu = (megaConfig, isMobile = false) => {
    return megaConfig.map((group, groupIdx) => (
      <motion.div
        key={group.title}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: groupIdx * 0.1 }}
      >
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
      </motion.div>
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
        <AnimatePresence>
          {!shouldHideLogo && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Link to="/" className="text-2xl font-black uppercase flex items-center gap-2">
                <img src={assets.logo} className="w-full max-w-[150px]" alt="" />
                <p>Brand.</p>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navConfig.map((item, idx) => {
            if (!item.mega) {
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <Link
                    to={item.to}
                    className="text-[13px] font-bold uppercase tracking-widest"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            }

            const isOpen = activeMenu === item.label;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <button
                  onClick={() => setActiveMenu(isOpen ? null : item.label)}
                  className="flex cursor-pointer items-center gap-1 text-[13px] font-bold uppercase tracking-widest"
                >
                  {item.label}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <HiChevronDown />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-[50px] left-0 right-0 w-full bg-white border border-[#eee] rounded-[24px] shadow-xl p-8 grid grid-cols-2 gap-12"
                    >
                      {renderMegaMenu(item.mega)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </nav>

        {/* Right side icons */}
        <div className="flex items-center gap-5 grow lg:grow-0">
          <Search searchOpen={searchOpen} setSearchOpen={setSearchOpen} />

          <AnimatePresence>
            {!shouldHideLogo && (
              <motion.div
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                onClick={toggleWishlist}
                className="relative text-xl cursor-pointer shrink-0"
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <GoHeart />
                </motion.div>

                <AnimatePresence>
                  {wishlistCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!shouldHideLogo && (
              <motion.div
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                onClick={toggleCart}
                className="relative text-xl cursor-pointer"
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <GoInbox />
                </motion.div>

                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!shouldHideLogo && (
              <motion.button
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="lg:hidden text-2xl cursor-pointer"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <HiXMark /> : <HiBars3 />}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && isMobileScreen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed top-[60px] left-0 right-0 bottom-0 z-[1000] bg-white overflow-y-auto border-t p-6 space-y-6"
          >
            {navConfig.map((item, idx) => {
              if (!item.mega) {
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <Link
                      to={item.to}
                      className="block text-lg font-bold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              }

              const open = mobileOpenItem === item.label;

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <button
                    onClick={() => setMobileOpenItem(open ? null : item.label)}
                    className="flex justify-between w-full text-lg font-bold"
                  >
                    {item.label}
                    <motion.div
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {open ? <HiChevronUp /> : <HiChevronDown />}
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 ml-3 space-y-4"
                      >
                        {renderMegaMenu(item.mega, true)}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}