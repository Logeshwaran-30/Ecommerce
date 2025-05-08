import React from 'react';
import { Link } from 'react-router-dom';  // Don't forget to import Link for navigation
import { SfIconArrowBack }from '@storefront-ui/react'; // Import SfIconArrowBack (make sure the path is correct)

const Backtoshopping = () => {
  return (
    <div>
      <Link to="/category">
        <SfIconArrowBack /> Back to shopping
      </Link>
    </div>
  );
}

export default Backtoshopping;
