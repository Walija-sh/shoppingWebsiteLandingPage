import { Outlet } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CartModal from "../components/CartModal.jsx";
import WishlistModal from "../components/WishlistModal.jsx";
import AboutSection from "../components/About.jsx";

const Layout = () => {
  return (
    <div className="relative">
      <Header />

      <Outlet />
      <CartModal/>
      <WishlistModal/>


      <Footer />

      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg z-50 transition-all duration-300"
      >
        <FaWhatsapp className="text-2xl" />
      </a>
    </div>
  );
};

export default Layout;
