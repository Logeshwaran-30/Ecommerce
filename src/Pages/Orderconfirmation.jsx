import React from 'react';
import CheckoutPage from '../components/CheckoutPage';
import Ordersummary2 from '../components/Ordersummary2';

const Orderconfirmation = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-6 px-4 lg:px-10 py-8">
      {/* Left Section: Checkout Page */}
      <div className="w-full lg:w-2/3 mb-5">
        <CheckoutPage />
      </div>

      {/* Right Section: Order Summary */}
      <div className="w-full lg:w-1/3">
        <div className="sticky top-20">
          <Ordersummary2 />
        </div>
      </div>
    </div>
  );
};

export default Orderconfirmation;
