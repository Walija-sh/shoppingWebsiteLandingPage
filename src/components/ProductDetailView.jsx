import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HiOutlineShoppingBag,
  HiOutlineMinus,
  HiOutlinePlus,
} from "react-icons/hi2";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaFacebookF, FaWhatsapp, FaRegEnvelope } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { AppContext } from "../context/AppContext";
import ZoomableImage from "./ZoomableImage";

const ProductDetailView = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState("");

  const { addToCart, wishlist, addToWishlist, removeFromWishlist } = useContext(AppContext);

  const handleAddToCart = () => {
    if (sizes?.length && !selectedSize) {
      setSizeError("Please select a size before adding to cart.");
      return;
    }

    addToCart({
      productId: id,
      quantity,
      selectedSize,
    });
  };

  const {
    id,
    image,
    images,
    title,
    price,
    originalPrice,
    priceLBP,
    originalPriceLBP,
    category,
    description,
    sizes,
    isOnSale,
    isNew,
  } = product;
  
  const isInWishlist = wishlist.includes(id);
  const [mainImage, setMainImage] = useState(images?.[0] || image);

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <motion.div 
        className="max-w-7xl mx-auto px-6 py-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <nav className="flex text-xs font-bold uppercase tracking-widest text-gray-400 space-x-2">
          <Link to="/" className="hover:text-black transition">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-black transition">Shop</Link>
          <span>/</span>
          <span className="text-black">{title}</span>
        </nav>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 md:items-start gap-12 lg:gap-16">
          
          {/* Section 1 - Image Gallery */}
          <div className="grid">
            <motion.div 
              className="relative bg-[#F5F5F7] rounded-[40px] overflow-hidden flex items-center justify-center aspect-square"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mainImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <ZoomableImage src={mainImage} alt={title} />
                </motion.div>
              </AnimatePresence>

              {/* Badges */}
              <motion.div 
                className="absolute top-8 left-8 flex flex-col gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {isOnSale && (
                  <motion.span 
                    className="bg-red-500 text-white text-[10px] uppercase font-black px-4 py-1.5 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
                  >
                    Sale
                  </motion.span>
                )}
                {isNew && (
                  <motion.span 
                    className="bg-black text-white text-[10px] uppercase font-black px-4 py-1.5 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                  >
                    New
                  </motion.span>
                )}
              </motion.div>

              {/* Wishlist Button */}
              <motion.button
                onClick={() =>
                  isInWishlist ? removeFromWishlist(id) : addToWishlist(id)
                }
                className="absolute top-8 right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition cursor-pointer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isInWishlist ? (
                    <motion.div
                      key="filled"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <GoHeartFill className="text-xl text-[#E11D48]" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="outline"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <GoHeart className="text-xl text-black" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>

            {/* Thumbnail Gallery */}
            {images && images.length > 1 && (
              <motion.div 
                className="flex gap-3 mt-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {images.map((img, idx) => (
                  <motion.div
                    key={idx}
                    onClick={() => setMainImage(img)}
                    className="rounded-lg overflow-hidden cursor-pointer aspect-square transition-all"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={img}
                      alt={`${title} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-300"
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Section 2 - Product Info */}
          <div className="flex flex-col">
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.p 
                className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {category || 'Collection'}
              </motion.p>
              
              <motion.h1 
                className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {title}
              </motion.h1>

              <motion.div 
                className="flex flex-wrap items-baseline gap-6 border-y border-gray-100 py-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-black">${price.toFixed(2)}</span>
                  {originalPrice && (
                    <span className="text-sm line-through text-gray-400 font-medium">
                      ${originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="h-10 w-[1px] bg-gray-200 hidden sm:block"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-black">
                    {priceLBP?.toLocaleString()} <span className="text-sm">LBP</span>
                  </span>
                  {originalPriceLBP && (
                    <span className="text-sm line-through text-gray-400 font-medium">
                      {originalPriceLBP?.toLocaleString()} LBP
                    </span>
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* Selection Options */}
            <motion.div 
              className="space-y-8 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {sizes && (
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-black mb-4">
                    Select Size
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {sizes.map((size, idx) => (
                      <motion.button
                        key={size}
                        onClick={() => {
                          setSelectedSize(size);
                          setSizeError("");
                        }}
                        className={`px-6 py-3 rounded-full text-sm font-bold transition-all border cursor-pointer ${
                          selectedSize === size
                            ? "bg-black text-white border-black"
                            : "bg-[#F5F5F7] text-gray-500 border-transparent hover:bg-gray-200"
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.7 + idx * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                  <AnimatePresence>
                    {sizeError && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 text-sm text-red-500 font-medium"
                      >
                        {sizeError}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-black mb-4">
                  Quantity
                </label>
                <div className="inline-flex items-center p-1">
                  <motion.button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white transition hover:bg-gray-200 text-black cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <HiOutlineMinus />
                  </motion.button>
                  <motion.span 
                    className="w-12 text-center font-bold text-sm"
                    key={quantity}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                  >
                    {quantity}
                  </motion.span>
                  <motion.button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white transition text-black cursor-pointer hover:bg-gray-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <HiOutlinePlus />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <motion.button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white px-12 py-4 rounded-full flex items-center justify-center gap-3 text-sm font-bold transition shadow-sm cursor-pointer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <HiOutlineShoppingBag className="text-xl" />
                Add To Bag
              </motion.button>
              <motion.button
                className="flex-1 px-12 py-4 bg-[#F5F5F7] text-black rounded-full text-sm font-bold hover:bg-black hover:text-white transition shadow-sm cursor-pointer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Buy Now
              </motion.button>
            </motion.div>

            {/* Social & Share */}
            <motion.div 
              className="flex items-center justify-between pt-6 border-t border-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="flex gap-4 text-gray-400">
                {[FiLink, FaWhatsapp, FaFacebookF, FaRegEnvelope].map((Icon, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="cursor-pointer hover:text-black transition text-lg" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div 
              className="mt-12 pt-8 border-t border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <h3 className="text-xs font-black uppercase tracking-widest text-black mb-4">
                Description
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base font-medium">
                {description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;