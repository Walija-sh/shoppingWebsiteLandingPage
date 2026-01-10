import { useContext } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function ProductCard({
  id,
  image,
  title,
  price,
  originalPrice,
  isOnSale,
  isNew,
  list = false, 
}) {
  const {  wishlist, addToWishlist, removeFromWishlist } = useContext(AppContext);

  const isInWishlist = wishlist.includes(id);

  // Card layout classes based on list mode
  const containerClass = list
    ? "group flex bg-white rounded-[32px] p-4 border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300 gap-4"
    : "group bg-white rounded-[32px] p-3 border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300";

  const imageContainerClass = list
    ? "relative w-32 aspect-square rounded-[24px] bg-[#F5F5F7] overflow-hidden flex items-center justify-center"
    : "relative aspect-square rounded-[24px] bg-[#F5F5F7] overflow-hidden mb-4 flex items-center justify-center";

  const contentWrapperClass = list ? "flex-1 flex flex-col justify-between" : "px-2 pb-2";

  return (
    <div className={`${containerClass} mb-4`}>
      <div className={imageContainerClass}>
        <Link to={`/product/${id}`} className="w-full h-full">

        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        </Link>

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

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
    e.stopPropagation();
    e.preventDefault();
    isInWishlist ? removeFromWishlist(id) : addToWishlist(id);
  }}
          className="absolute top-3 right-3 z-30 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm transition-all duration-300 cursor-pointer"
        >
          {isInWishlist ? (
            <GoHeartFill className="text-xl text-[#E11D48]" />
          ) : (
            <GoHeart className="text-xl text-black" />
          )}
        </button>

        
      </div>

      {/* Content */}
      <div className={contentWrapperClass}>
        <Link to={`/product/${id}`}>
          <h3 className="text-[15px] font-semibold text-gray-900 line-clamp-1 mb-1">
            {title}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-black">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-sm font-medium line-through text-gray-400">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Bag button for list layout */}
        {list && (
          <Link
  to={`/product/${id}`}
  className="mt-3 bg-black text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold shadow-lg w-fit"
>
  View Product
</Link>

        )}
      </div>
    </div>
  );
}
