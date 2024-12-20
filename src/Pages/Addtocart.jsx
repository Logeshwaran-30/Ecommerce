import React from 'react'
import Emptycart from '../components/Emptycart'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Backtoshopping from '../components/Backtoshopping'

const Addtocart = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
       {/* Back to shopping button */}
       <div className="text-green-600 absolute top-16 right-4 mt-16 mr-16 text-xl">
        <Backtoshopping />
      </div>
      <div > <h1 className="font-bold text-5xl mt-10 ml-10">My Cart</h1></div>
        <Emptycart />
        <Footer />
    </div>
  )
}

export default Addtocart