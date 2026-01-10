import { createContext, useEffect, useState } from "react";
import { products as initialProducts } from "../data/products.js";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  /* ===================== PRODUCTS ===================== */
  const [products, setProducts] = useState(initialProducts);

  /* ===================== CART ===================== */
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  /* ===================== WISHLIST ===================== */
   const [wishlist, setWishlist] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  /* ===================== PRODUCT SELECTORS ===================== */
  const getDealProducts = () =>
    products.filter((product) => product.isOnSale);

  const getProductDetail = (id) =>
    products.find((product) => String(product.id) === String(id));

  const getSimilarProducts = ({ category, excludeId, limit = 4 }) =>
    products
      .filter(
        (p) =>
          p.category === category &&
          String(p.id) !== String(excludeId)
      )
      .slice(0, limit);

  /* ===================== CART ACTIONS ===================== */

  const addToCart = ({ productId, quantity = 1, selectedSize }) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) =>
          item.productId === productId &&
          item.selectedSize === selectedSize
      );

      if (existingItem) {
        return prev.map((item) =>
          item.productId === productId &&
          item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

     
      
      return [...prev, { productId, quantity, selectedSize }];
    });

    
  };

  const removeFromCart = ({ productId, selectedSize }) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.selectedSize === selectedSize
          )
      )
    );
  };

  const updateCartQuantity = ({ productId, selectedSize, quantity }) => {
    if (quantity < 1) return;

    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId &&
        item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  /* ===================== CART SELECTORS ===================== */

  const getCartItems = () =>
    cart.map((item) => {
      const product = getProductDetail(item.productId);
      return {
        ...product,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
      };
    });

  const getCartCount = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  const getCartTotal = () =>
    getCartItems().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

     // ===== Wishlist Functions =====
  const toggleWishlist = () => setIsWishlistOpen((prev) => !prev);
  const addToWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) return prev; // already in wishlist
      return [...prev, productId];
    });
    
  };
  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
  };
  const getWishlistItems = () =>
    wishlist.map((id) => getProductDetail(id));
const getWishlistCount = () => wishlist.length;
/* ===================== FILTER OPTIONS ===================== */
const getUniqueSizes = [...new Set(products.flatMap(p => p.sizes))].sort(); 

const getUniqueColors = [...new Set(products.flatMap(p => p.colors))]; 

const getUniqueTags = [...new Set(products.flatMap(p => p.tags))].sort(); 
  /* ===================== CONTEXT VALUE ===================== */
  const value = {
    // products
    products,
    setProducts,
    getDealProducts,
    getProductDetail,
    getSimilarProducts,

    // cart
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartItems,
    getCartCount,
    getCartTotal,
    isCartOpen,
  toggleCart,
  // Wishlist
    wishlist,
    setWishlist,
    isWishlistOpen,
    toggleWishlist,
    addToWishlist,
    removeFromWishlist,
    getWishlistItems,
    getWishlistCount,
    // filters
    getUniqueColors,
    getUniqueSizes,
    getUniqueTags
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
