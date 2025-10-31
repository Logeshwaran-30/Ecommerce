import React from 'react';
import Navbar from '../components/Navbar';
import Breadcrumbs2 from '../components/Breadcrumbs2';
import Footer from '../components/Footer';
import Addtocart from '../components/Addtocart';


const Productdetails = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-col mt-5 ml-7">
        <Breadcrumbs2 />
      </div>

      {/* Flex container for Productimage and Addtocart */}
      <div className="flex justify-between items-start mt-6 ml-7 mr-7">
       

        {/* Right side: Addtocart */}
        <div className="flex-1 ml-4">
          <Addtocart />
        </div>
      </div>
      {/* Footer with margin-top */}
      <Footer className="mt-12" />
    </div>
  );
};

export default Productdetails;
