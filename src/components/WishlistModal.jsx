import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AppContext } from "../context/AppContext";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link } from "react-router-dom";

const WishlistModal = () => {
  const {
    isWishlistOpen,
    toggleWishlist,
    getWishlistItems,
  } = useContext(AppContext);

  const items = getWishlistItems();

  return (
    <>
      {isWishlistOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[999]"
          onClick={toggleWishlist}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full bg-white  z-[1000] transform transition-transform duration-500 ease-in-out ${
          isWishlistOpen ? "translate-x-0 shadow-2xl " : "translate-x-full"
        } w-full sm:w-[440px] flex flex-col`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-lg text-black">Your Wishlist</h2>
          <button
            onClick={toggleWishlist}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors text-xl cursor-pointer"
          >
            <AiOutlineClose />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 flex flex-col gap-6">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center font-semibold mt-20">
              Your wishlist is empty
            </p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-semibold text-sm line-clamp-1 mb-1 hover:underline">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="font-bold text-sm text-black mb-2">
                    ${item.price.toFixed(2)}
                  </p>
                  <Link to={`/product/${item.id}`}
                    
                    className="bg-black text-white px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      
    </>
  );
};

export default WishlistModal;
