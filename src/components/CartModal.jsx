import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi2";
import { AppContext } from "../context/AppContext";

const CartModal = () => {
  const {
    isCartOpen,
    toggleCart,
    getCartItems,
    getCartTotal,
    removeFromCart,
  } = useContext(AppContext);

  const cartItems = getCartItems();
  const totalUSD = getCartTotal();
  const totalLBP = totalUSD * 89000;

  return (
    <>
      {/* Background Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[999]"
          onClick={toggleCart}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full bg-white z-[1000] transform transition-transform duration-500 ease-in-out ${
          isCartOpen ? "translate-x-0 shadow-2xl " : "translate-x-full "
        } w-full sm:w-[440px] flex flex-col`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-lg text-black">Your Cart</h2>
          <button 
            onClick={toggleCart} 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors text-xl cursor-pointer"
          >
            <AiOutlineClose />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="p-6 flex flex-col gap-6 min-h-full">
            
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <HiOutlineTrash className="text-3xl text-gray-200 " />
                </div>
                <p className="text-gray-500 text-sm font-semibold">
                  Your cart is empty
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}`}
                  className="flex gap-4 items-start"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-sm text-black line-clamp-1 pr-2">
                        {item.title}
                      </h3>
                      <button
                        onClick={() =>
                          removeFromCart({ productId: item.id, selectedSize: item.selectedSize })
                        }
                        className="text-gray-400 cursor-pointer hover:text-red-500 transition-colors text-lg"
                      >
                        <HiOutlineTrash />
                      </button>
                    </div>

                    <div className="mt-1 space-y-0.5">
                      <p className="text-xs text-gray-500">
                        Size: <span className="text-black">{item.selectedSize || "N/A"}</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: <span className="text-black">{item.quantity}</span>
                      </p>
                    </div>

                    <p className="font-bold text-sm mt-2 text-black">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            )}

            {/* Bottom Summary */}
            {cartItems.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 font-semibold">Total (USD)</span>
                    <span className="font-bold text-black text-lg">${totalUSD.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 font-semibold">Total (LBP)</span>
                    <span className="font-bold text-black text-base">{totalLBP.toLocaleString()} LBP</span>
                  </div>
                </div>

                <button className="w-full bg-black text-white px-12 py-4 rounded-full flex items-center justify-center gap-3 text-sm font-bold  transition shadow-sm cursor-pointer">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

    
    </>
  );
};

export default CartModal;
