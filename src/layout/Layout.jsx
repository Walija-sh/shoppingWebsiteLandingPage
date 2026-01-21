import { Outlet } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CartModal from "../components/CartModal.jsx";
import WishlistModal from "../components/WishlistModal.jsx";
import ClientInfoPopup from "../components/ClientInfoPopup.jsx";
import { motion } from "framer-motion";
const Layout = () => {
  return (
    <div className="relative">
      <Header />

      <Outlet />
      <CartModal />
      <WishlistModal />

      <ClientInfoPopup />


      <Footer />

      <motion.a
        href="https://wa.me/YOUR_PHONE_NUMBER" // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg z-50 transition-colors duration-300 cursor-pointer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: 1,
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
        whileHover={{
          scale: 1.1,
          rotate: [0, -10, 10, -10, 0],
          transition: { duration: 0.5 }
        }}
        whileTap={{ scale: 0.9 }}
      >
        <FaWhatsapp className="text-2xl" />

        {/* Ping animation */}
        <motion.span
          className="absolute inset-0 rounded-full bg-green-400"
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1
          }}
        />
      </motion.a>
    </div>
  );
};

export default Layout;
