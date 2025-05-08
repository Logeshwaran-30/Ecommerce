import { useState, useRef, useEffect } from 'react';
import { SfButton, SfIconCheckCircle, SfIconClose, SfInput, SfLink } from '@storefront-ui/react';
import { useCart } from '../CartContext'; // Assuming you're using CartContext

export default function Ordersummary2() {
  const { cart } = useCart(); // Accessing cart from context
  const [products, setProducts] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [promoCode, setPromoCode] = useState(0); // Stores the discount value, like -100 for VSF2020
  const [informationAlert, setInformationAlert] = useState(false);
  const [positiveAlert, setPositiveAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const errorTimer = useRef(0);
  const positiveTimer = useRef(0);
  const informationTimer = useRef(0);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data); // Save products to state
    };

    fetchProducts();
  }, []);

  // Helper function to find the product details in the products list
  const getProductDetails = (productId) => {
    return products.find((product) => product.id === productId);
  };

  useEffect(() => {
    clearTimeout(errorTimer.current);
    errorTimer.current = window.setTimeout(() => setErrorAlert(false), 5000);
    return () => {
      clearTimeout(errorTimer.current);
    };
  }, [errorAlert]);

  useEffect(() => {
    clearTimeout(positiveTimer.current);
    positiveTimer.current = window.setTimeout(() => setPositiveAlert(false), 5000);
    return () => {
      clearTimeout(positiveTimer.current);
    };
  }, [positiveAlert]);

  useEffect(() => {
    clearTimeout(informationTimer.current);
    informationTimer.current = window.setTimeout(() => setInformationAlert(false), 5000);
    return () => {
      clearTimeout(informationTimer.current);
    };
  }, [informationAlert]);

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

  // Calculate the subtotal dynamically from cart
  const itemsSubtotal = () => {
    return cart.reduce((acc, item) => {
      const product = getProductDetails(item.id); // Get product details using product ID
      return acc + (product?.price || 0) * item.quantity;
    }, 0);
  };

  // Include the estimated sales tax in the total
  const totalPrice = () => {
    const subtotal = itemsSubtotal();
    const tax = subtotal * 0.10; // Assuming a 10% tax rate
    return subtotal + tax + promoCode; // Add the tax to the subtotal and subtract promo code
  };

  const totalQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);  // Sum up the quantity of all items in the cart
  };

  // Promo code validation with condition that the total must exceed $200
  const checkPromoCode = (event) => {
    event.preventDefault();

    // Calculate the total price before applying the promo code
    const subtotal = itemsSubtotal();
    const tax = subtotal * 0.10; // 10% tax
    const totalBeforeDiscount = subtotal + tax; // Total price without the promo code

    // Check if the total price exceeds $200
    if (totalBeforeDiscount > 200) {
      if (inputValue.toUpperCase() === 'VSF2020') {
        setPromoCode(-100); // Apply $100 discount
        setPositiveAlert(true);
      } else {
        setErrorAlert(true); // Show error alert if promo code is invalid
      }
    } else {
      setErrorAlert(true); // Show error if the total price is less than $200
    }
  };

  const removePromoCode = () => {
    setPromoCode(0); // Remove the discount
    setInformationAlert(true); // Show information alert when promo code is removed
  };

  return (
    <div>
      <div className="md:shadow-lg md:rounded-md md:border md:border-neutral-100">
        <div className="flex justify-between items-end bg-neutral-100 md:bg-transparent py-2 px-4 md:px-6 md:pt-6 md:pb-4">
          <p className="typography-headline-4 font-bold md:typography-headline-3">Order Summary</p>
          <p className="typography-text-base font-medium">(Items: {totalQuantity()})</p>
        </div>
        <div className="px-4 pb-4 mt-3 md:px-6 md:pb-6 md:mt-0">
          {/* Displaying the list of items in the cart */}
          <div className="pb-4">
            <p className="typography-headline-5 font-bold">Items:</p>
            {cart.map((item, index) => {
              const product = getProductDetails(item.id); // Get the product details from the API data
              return (
                <div key={index} className="flex justify-between items-center">
                  <p>{product?.title}</p> {/* Display product name */}
                  <p>{item.quantity} x {formatPrice(product?.price || 0)}</p> {/* Display quantity and price */}
                </div>
              );
            })}
          </div>

          {/* Subtotal, Delivery, Sales Tax */}
          <div className="flex justify-between typography-text-base pb-4">
            <div className="flex flex-col grow pr-2">
              <p>Items Subtotal</p>
              <p className="my-2">Delivery</p>
              <p>Estimated Sales Tax</p>
            </div>
            <div className="flex flex-col text-right">
              <p>{formatPrice(itemsSubtotal())}</p>
              <p className="my-2">{formatPrice(0.00)}</p> {/* Assuming delivery is 0 */}
              <p>{formatPrice(itemsSubtotal() * 0.10)}</p> {/* Showing sales tax */}
            </div>
          </div>

          {/* Promo code section */}
          {promoCode ? (
            <div className="flex items-center mb-5 py-5 border-y border-neutral-200">
              <p>Coupon Code</p>
              <SfButton size="sm" variant="tertiary" className="ml-auto mr-2" onClick={removePromoCode}>
                Remove
              </SfButton>
              <p>{formatPrice(promoCode)}</p>
            </div>
          ) : (
            <form className="flex gap-x-2 py-4 border-y border-neutral-200 mb-4" onSubmit={checkPromoCode}>
              <SfInput
                value={inputValue}
                placeholder="Enter promo code"
                wrapperClassName="grow"
                onChange={(event) => setInputValue(event.target.value)}
              />
              <SfButton type="submit" variant="secondary">
                Apply
              </SfButton>
            </form>
          )}

          {/* Total Section */}
          <div className="flex justify-between typography-headline-4 md:typography-headline-3 font-bold pb-4 mb-4 border-b border-neutral-200">
            <p>Total</p>
            <p>{formatPrice(totalPrice())}</p> {/* Total now includes tax and promo code */}
          </div>

          {/* Place Order Button */}
          <SfButton size="lg" className="w-full">
            Place Order And Pay
          </SfButton>

          {/* Terms and Privacy Links */}
          <div className="typography-text-sm mt-4 text-center">
            By placing my order, you agree to our <SfLink href="#">Terms and Conditions</SfLink> and our{' '}
            <SfLink href="#">Privacy Policy.</SfLink>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="absolute top-0 right-0 mx-2 mt-2 sm:mr-6">
        {positiveAlert && (
          <div
            role="alert"
            className="flex items-start md:items-center shadow-md max-w-[600px] bg-positive-100 pr-2 pl-4 mb-2 ring-1 ring-positive-200 typography-text-sm md:typography-text-base py-1 rounded-md"
          >
            <SfIconCheckCircle className="mr-2 my-2 text-positive-700" />
            <p className="py-2 mr-2">Your coupon code has been added.</p>
            <button
              type="button"
              className="p-1.5 md:p-2 ml-auto rounded-md text-positive-700 hover:bg-positive-200 active:bg-positive-300 hover:text-positive-800 active:text-positive-900"
              aria-label="Close positive alert"
              onClick={() => setPositiveAlert(false)}
            >
              <SfIconClose className="hidden sm:block" />
            </button>
          </div>
        )}

        {errorAlert && (
          <div
            role="alert"
            className="flex items-start md:items-center shadow-md max-w-[600px] bg-negative-100 pr-2 pl-4 mb-2 ring-1 ring-negative-200 typography-text-sm md:typography-text-base py-1 rounded-md"
          >
            <SfIconCheckCircle className="mr-2 my-2 text-negative-700" />
            <p className="py-2 mr-2">Invalid promo code or your total is below $200!</p>
            <button
              type="button"
              className="p-1.5 md:p-2 ml-auto rounded-md text-negative-700 hover:bg-negative-200 active:bg-negative-300 hover:text-negative-800 active:text-negative-900"
              aria-label="Close error alert"
              onClick={() => setErrorAlert(false)}
            >
              <SfIconClose className="hidden sm:block" />
            </button>
          </div>
        )}

        {informationAlert && (
          <div
            role="alert"
            className="flex items-start md:items-center shadow-md max-w-[600px] bg-info-100 pr-2 pl-4 mb-2 ring-1 ring-info-200 typography-text-sm md:typography-text-base py-1 rounded-md"
          >
            <SfIconCheckCircle className="mr-2 my-2 text-info-700" />
            <p className="py-2 mr-2">Coupon code has been removed.</p>
            <button
              type="button"
              className="p-1.5 md:p-2 ml-auto rounded-md text-info-700 hover:bg-info-200 active:bg-info-300 hover:text-info-800 active:text-info-900"
              aria-label="Close information alert"
              onClick={() => setInformationAlert(false)}
            >
              <SfIconClose className="hidden sm:block" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
