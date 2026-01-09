import { useContext, useState } from "react";
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
        {/* Bread crumb */}
     <div className="max-w-7xl mx-auto px-6 py-6">
             <nav className="flex text-xs font-bold uppercase tracking-widest text-gray-400 space-x-2">
               <Link to="/" className="hover:text-black transition">Home</Link>
               <span>/</span>
               <Link to="/shop" className="hover:text-black transition">Shop</Link>
               <span>/</span>
               <span className="text-black">{title}</span>
             </nav>
           </div>
     
           <div className="max-w-7xl mx-auto px-6 pb-20">
             <div className="grid grid-cols-1 md:grid-cols-2 md:items-start gap-12 lg:gap-16">
               
               {/* Section 1 */}
               <div className=" grid   ">

               <div className="relative bg-[#F5F5F7] rounded-[40px] overflow-hidden flex items-center justify-center ">
                 <img
                   src={mainImage}
                   alt={title}
                   className="w-full h-full object-cover object-center  transition-transform duration-700 hover:scale-105"
                 />
                 
                 {/* Minimalist Badges */}
                 <div className="absolute top-8 left-8 flex flex-col gap-2">
                   {isOnSale && (
                     <span className="bg-red-500 text-white text-[10px] uppercase font-black px-4 py-1.5 rounded-full">
                       Sale
                     </span>
                   )}
                   {isNew && (
                     <span className="bg-black text-white text-[10px] uppercase font-black px-4 py-1.5 rounded-full">
                       New
                     </span>
                   )}
                 </div>
     
               
                         <button
  onClick={() =>
    isInWishlist ? removeFromWishlist(id) : addToWishlist(id)
  }
  className="absolute top-8 right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition cursor-pointer"
>
  {isInWishlist ? (
    <GoHeartFill className="text-xl text-[#E11D48]" />
  ) : (
    <GoHeart className="text-xl text-black" />
  )}
</button>
               </div>
               {images && images.length > 1 && (
  <div className="flex gap-3 mt-4 justify-center">
    {images.map((img, idx) => (
      <div
        key={idx}
        onClick={() => setMainImage(img)}
        className={` rounded-lg overflow-hidden cursor-pointer  transition-all `}
      >
        <img
          src={img}
          alt={`${title} thumbnail ${idx + 1}`}
          className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-300"
        />
      </div>
    ))}
  </div>
)}


               </div>
               
     
               {/* Section 2*/}
               <div className="flex flex-col">
                 <div className="mb-8">
                   <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
                     {category || 'Collection'}
                   </p>
                   <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-6">
                     {title}
                   </h1>
                   
                   <div className="flex flex-wrap items-baseline gap-6 border-y border-gray-100 py-8">
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
                   </div>
                 </div>
     
                 {/* Selection Options */}
                 <div className="space-y-8 mb-10">
                  {sizes && (
  <div>
    <label className="block text-xs font-black uppercase tracking-widest text-black mb-4">
      Select Size
    </label>

    <div className="flex flex-wrap gap-3">
      {sizes.map((size) => (
        <button
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
        >
          {size}
        </button>
      ))}
    </div>

    {sizeError && (
      <p className="mt-3 text-sm text-red-500 font-medium">
        {sizeError}
      </p>
    )}
  </div>
)}

     
                   <div>
                     <label className="block text-xs font-black uppercase tracking-widest text-black mb-4">
                       Quantity
                     </label>
                     <div className="inline-flex items-center p-1 ">
                       <button 
                         onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                         className="w-10 h-10 flex items-center justify-center rounded-full bg-white transition hover:bg-gray-200 text-black cursor-pointer"
                       >
                         <HiOutlineMinus />
                       </button>
                       <span className="w-12 text-center font-bold text-sm">{quantity}</span>
                       <button 
                         onClick={() => setQuantity(q => q + 1)} 
                         className="w-10 h-10 flex items-center justify-center rounded-full bg-white transition text-black cursor-pointer hover:bg-gray-200"
                       >
                         <HiOutlinePlus />
                       </button>
                     </div>
                   </div>
                 </div>
     
                
                 <div className="flex flex-col sm:flex-row gap-4 mb-8">
                   <button  onClick={handleAddToCart
} className="flex-1 bg-black text-white px-12 py-4 rounded-full flex items-center justify-center gap-3 text-sm font-bold  transition shadow-sm cursor-pointer">
                     <HiOutlineShoppingBag className="text-xl" />
                     Add To Bag
                   </button>
                   <button className="flex-1 px-12 py-4 bg-[#F5F5F7] text-black rounded-full text-sm font-bold hover:bg-black hover:text-white transition shadow-sm cursor-pointer">
                     Buy Now
                   </button>
                 </div>
     
                 {/* Social & Share */}
                 <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                   <div className="flex gap-4 text-gray-400">
                     <FiLink className="cursor-pointer hover:text-black transition text-lg" />
                     <FaWhatsapp className="cursor-pointer hover:text-black transition text-lg" />
                     <FaFacebookF className="cursor-pointer hover:text-black transition text-lg" />
                     <FaRegEnvelope className="cursor-pointer hover:text-black transition text-lg" />
                   </div>
                 </div>
     
                 {/* Minimalist Description */}
                 <div className="mt-12 pt-8 border-t border-gray-200">
                   <h3 className="text-xs font-black uppercase tracking-widest text-black mb-4">
                     Description
                   </h3>
                   <p className="text-gray-500 leading-relaxed text-sm md:text-base font-medium">
                     {description}
                   </p>
                 </div>
               </div>
             </div>
           </div>
    </div>
  );
};

export default ProductDetailView;
