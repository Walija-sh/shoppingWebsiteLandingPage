import React from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import DealOfWeek from './components/DealOfWeek.jsx'
import Footer from './components/Footer.jsx'
import PromoBanner from './components/PromoBanner.jsx'
import FlashSaleBanner from './components/FlashSaleBanner.jsx'
import ValueProps from './components/ValueProps.jsx'

const App = () => {
  return (
    <div>
      <Header/>
      <Hero/>
      <ValueProps/>
      <ProductGrid/>
      <PromoBanner/>
      <DealOfWeek/>
      <FlashSaleBanner/>
      <Footer/>
    </div>
  )
}

export default App