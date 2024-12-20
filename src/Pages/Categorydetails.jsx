import React from 'react'
import Navbar from '../components/Navbar'
import Backtoshopping from '../components/Backtoshopping'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'

const Categorydetails = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />

      {/* Back to shopping button */}
      <div className="text-green-600 absolute top-16 right-4 mt-16 mr-16 text-xl">
        <Backtoshopping />
      </div>
   
      <div className="mt-24 ml-10"> 
      <ProductCard />
      </div>

      <Footer />
    </div>
  )
}

export default Categorydetails;
