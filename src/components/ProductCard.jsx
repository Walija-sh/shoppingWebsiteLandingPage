import { useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";

export default function ProductCard({
  image,
  title,
  price,
  originalPrice,
  isOnSale,
  isNew,
}) {
  const [isFav, setIsFav] = useState(false);

  return (
    <div className="group bg-white rounded-[32px] p-3 border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300">
      
      
      <div className="relative aspect-square rounded-[24px] bg-[#F5F5F7] overflow-hidden mb-4 flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
          {isOnSale && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Sale
            </span>
          )}
          {isNew && (
            <span className="bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              New
            </span>
          )}
        </div>

        
        <button
          onClick={() => setIsFav((prev) => !prev)}
          className="absolute top-3 right-3 z-30 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
        >
          {isFav ? (
            <GoHeartFill className="text-xl text-[#E11D48]" />
          ) : (
            <GoHeart className="text-xl text-black" />
          )}
        </button>

        
        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/5 backdrop-blur-[2px] transition-all duration-300 pointer-events-none">
          
          
          <button className="pointer-events-auto bg-white text-black px-6 py-3 rounded-full flex items-center gap-2 text-sm font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 cursor-pointer">
            <HiOutlineShoppingBag className="text-lg" />
            Add to Bag
          </button>
        </div>
      </div>

    
      <div className="px-2 pb-2">
        <h3 className="text-[15px] font-semibold text-gray-900 line-clamp-1 mb-1">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-black">
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-sm font-medium line-through text-gray-400">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
