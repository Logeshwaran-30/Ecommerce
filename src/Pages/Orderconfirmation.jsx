import React from 'react'
import Deliveryoption from '../components/Deliveryoption'
import Paymentmethods from '../components/Paymentmethods'
import Checkoutform from '../components/Checkoutform'
import Ordersummary2 from '../components/Ordersummary2'

const Orderconfirmation = () => {
  return (
    <div className="flex justify-between space-x-5"> {/* Flex container for two columns */}
      {/* Left Side: Checkoutform, Deliveryoption, Paymentmethods */}
      <div className="w-1/2 space-y-6 flex flex-col items-center mt-10"> {/* Use flex and items-center for centering */}
        <Checkoutform />
        <h1 className="font-bold">Delivery option</h1>
        <Deliveryoption />
        {/* Adjust width of Paymentmethods */}
        <div className="w-full md:w-3/4"> {/* Use custom width for Paymentmethods */}
          <Paymentmethods />
        </div>
      </div>

      {/* Right Side: OrderSummary */}
      <div className="flex justify-center mt-20 ml-5"> {/* Added mt-16 to move Ordersummary down */}
        <Ordersummary2 />
      </div>
    </div>
  )
}

export default Orderconfirmation
