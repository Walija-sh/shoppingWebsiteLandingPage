import { FaHeart } from "react-icons/fa";
import { PiShoppingBagOpenThin } from "react-icons/pi";
import { GoHeart } from "react-icons/go";

export default function ProductCard({
  image,
  title,
  price,
  originalPrice,
  isOnSale,
  isNew,
  rating,
}) {
  return (
    <div className="group">
      {/* Image */}
      <div className="relative aspect-[3/4] bg-white overflow-hidden mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isOnSale && (
            <span className="bg-red-600 text-white text-xs px-2 py-1 uppercase tracking-wide">
              Sale
            </span>
          )}
          {isNew && (
            <span className="bg-black text-white text-xs px-2 py-1 uppercase tracking-wide">
              New
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow cursor-pointer">
          <GoHeart className="text-xl" />
        </button>

        {/* Add to Cart */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/75 to-black/5 opacity-0 group-hover:opacity-100 transition">
          <button className="w-full bg-white text-black py-3 flex items-center justify-center gap-2 text-sm uppercase tracking-wide hover:bg-[#8B2C34] hover:text-white transition cursor-pointer">
            <PiShoppingBagOpenThin className="text-xl" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1">
        {/* Rating */}
        {rating && (
          <div className="flex gap-1 text-xs">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < rating ? "text-yellow-400" : "text-[#ccc]"}>
                ★
              </span>
            ))}
          </div>
        )}

        <h3 className="text-sm font-medium text-black line-clamp-2 group-hover:text-[#8B2C34] transition">
          {title}
        </h3>

        <div className="flex items-center gap-2">
          <span className={`font-medium ${isOnSale ? "text-[#8B2C34]" : ""}`}>
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-sm line-through text-[#777]">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
