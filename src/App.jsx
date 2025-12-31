import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import DealOfWeek from './components/DealOfWeek.jsx';
import Footer from './components/Footer.jsx';
import BannerGroupOne from './components/BannerGroupOne.jsx';
import BannerGroupTwo from './components/BannerGroupTwo.jsx';

const App = () => {
  return (
    <div className="relative">
      <Header />
      <Hero />
      <ProductGrid />
      <BannerGroupOne />
      <DealOfWeek />
      <BannerGroupTwo />
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

export default App;
