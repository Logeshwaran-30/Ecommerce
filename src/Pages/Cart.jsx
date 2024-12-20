import React from 'react';
import Ordersummary from '../components/Ordersummary';
import Productcard2 from '../components/Productcard2';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Backtoshopping from '../components/Backtoshopping';
import { useCart } from '../CartContext'; // Import the useCart hook to access cart data
import ScrollToTopButton from '../components/ScrollToTopButon';


const Cart = () => {
  const { cart } = useCart(); // Get cart from context

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />

      {/* Back to shopping button */}
      <div className="text-green-600 absolute top-16 right-4 mt-16 mr-16 text-xl">
        <Backtoshopping />
      </div>
     
      {/* Title */}
      <div>
        <h1 className="font-bold text-5xl mt-10 ml-10">My Cart</h1>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row justify-between mt-10 px-4 lg:px-16">
        {/* Productcard2 Component on the left */}
        <div className="w-full lg:w-5/7 p-4 -mt-4">
          <Productcard2 />
        </div>

        {/* Order Summary on the top-right */}
        {cart.length > 0 && (  // Only display Ordersummary if cart is not empty
          <div className="lg:w-3/4 xl:w-2/3 p-6 mt-4 lg:mt-0 lg:ml-auto">
            <Ordersummary />
          </div>
        )}
      </div>
      <ScrollToTopButton />
      {/* Footer */}
      <Footer className="mt-10" />
    </div>
  );
};

export default Cart;

