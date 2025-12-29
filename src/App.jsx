import React from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import DealOfWeek from './components/DealOfWeek.jsx'
import Footer from './components/Footer.jsx'

const App = () => {
  return (
    <div>
      <Header/>
      <Hero/>
      <ProductGrid/>
      <DealOfWeek/>
      <Footer/>
    </div>
  )
}

export default App