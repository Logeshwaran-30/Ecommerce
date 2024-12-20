import React, { useState, useRef, useEffect } from 'react';
import { SfButton, SfIconCheckCircle, SfIconClose, SfInput } from '@storefront-ui/react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';

export default function Ordersummary() {
  const { cart, addToCart } = useCart(); 
  const [cartUpdatedAlert, setCartUpdatedAlert] = useState(false); 
  const errorTimer = useRef(0);
  const positiveTimer = useRef(0);
  const informationTimer = useRef(0);
  const cartUpdateTimer = useRef(0); 
  const [inputValue, setInputValue] = useState('');
  const [promoCode, setPromoCode] = useState(0);
  const [informationAlert, setInformationAlert] = useState(false);
  const [positiveAlert, setPositiveAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [promoCodeAlert, setPromoCodeAlert] = useState(false); 
  const [successPromoAlert, setSuccessPromoAlert] = useState(false); 

  useEffect(() => {
    clearTimeout(errorTimer.current);
    errorTimer.current = window.setTimeout(() => setErrorAlert(false), 2000);
    return () => {
      clearTimeout(errorTimer.current);
    };
  }, [errorAlert]);

  useEffect(() => {
    clearTimeout(positiveTimer.current);
    positiveTimer.current = window.setTimeout(() => setPositiveAlert(false), 2000);
    return () => {
      clearTimeout(positiveTimer.current);
    };
  }, [positiveAlert]);

  useEffect(() => {
    clearTimeout(informationTimer.current);
    informationTimer.current = window.setTimeout(() => setInformationAlert(false), 2000);
    return () => {
      clearTimeout(informationTimer.current);
    };
  }, [informationAlert]);

  useEffect(() => {
    // Trigger cart updated alert when the cart changes
    setCartUpdatedAlert(true);

    clearTimeout(cartUpdateTimer.current);
    cartUpdateTimer.current = window.setTimeout(() => setCartUpdatedAlert(false), 2000);

    return () => {
      clearTimeout(cartUpdateTimer.current);
    };
  }, [cart]); 

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

  const itemsSubtotal = () => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return subtotal;
  };


  const totalItemsCount = () => {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    return totalItems;
  };

  // Calculate tax (assuming a 10% tax rate for this example)
  const calculateTax = () => {
    const subtotal = itemsSubtotal();
    return subtotal * 0.10; 
  };

  const totalPrice = () => itemsSubtotal() + calculateTax() + promoCode;

  const checkPromoCode = (event) => {
    event.preventDefault();

    // Check if the total amount is greater than $100
    if (totalPrice() <= 200) {
      setPromoCodeAlert(true);
      setErrorAlert(false); 
      setSuccessPromoAlert(false); 
      return;
    }

    // Check if the promo code is valid
    if ((promoCode === -100 && inputValue.toUpperCase() === 'VSF2020') || !inputValue) return;
    if (inputValue.toUpperCase() === 'VSF2020') {
      setPromoCode(-100);
      setPositiveAlert(true);
      setPromoCodeAlert(false); 
      setSuccessPromoAlert(true); 
    } else {
      setErrorAlert(true);
    }
  };

  const removePromoCode = () => {
    setPromoCode(0);
    setInformationAlert(true);
    setSuccessPromoAlert(false); 
  };

  // Define the product you want to add to the cart
  const productToAdd = {
    id: 1,
    title: "Sample Product",
    price: 29.99,
    quantity: 1, 
    image: "https://via.placeholder.com/150"
  };

  // Handle adding item to the cart
  const handleAddToCart = () => {
    addToCart(productToAdd);
  };

  return (
    <div>
      {/* Cart update alert */}
      {cartUpdatedAlert && (
        <div
          role="alert"
          className="flex items-center justify-between shadow-md max-w-[600px] bg-positive-100 pr-2 pl-4 mb-2 ring-1 ring-positive-200 typography-text-sm md:typography-text-base py-1 rounded-md"
        >
          <SfIconCheckCircle className="mr-2 text-positive-700" />
          <p className="py-2 mr-2">Your cart has been updated!</p>
          <button
            type="button"
            className="p-1.5 ml-auto rounded-md text-positive-700 hover:bg-positive-200 active:bg-positive-300"
            aria-label="Close alert"
            onClick={() => setCartUpdatedAlert(false)}
          >
            <SfIconClose size="sm" />
          </button>
        </div>
      )}

      {/* Promo Code Alert */}
      {promoCodeAlert && (
        <div
          role="alert"
          className="flex items-center justify-between shadow-md max-w-[600px] bg-warning-100 pr-2 pl-4 mb-2 ring-1 ring-warning-200 typography-text-sm md:typography-text-base py-1 rounded-md"
        >
          <SfIconClose className="mr-2 text-warning-700" />
          <p className="py-2 mr-2">Coupon code only applicable for orders above $200!</p>
          <button
            type="button"
            className="p-1.5 ml-auto rounded-md text-warning-700 hover:bg-warning-200 active:bg-warning-300"
            aria-label="Close alert"
            onClick={() => setPromoCodeAlert(false)}
          >
            <SfIconClose size="sm" />
          </button>
        </div>
      )}

      {/* Success Promo Code Alert */}
      {successPromoAlert && (
        <div
          role="alert"
          className="flex items-center justify-between shadow-md max-w-[600px] bg-success-100 pr-2 pl-4 mb-2 ring-1 ring-success-200 typography-text-sm md:typography-text-base py-1 rounded-md"
        >
          <SfIconCheckCircle className="mr-2 text-success-700" />
          <p className="py-2 mr-2">Coupon code applied successfully!</p>
          <button
            type="button"
            className="p-1.5 ml-auto rounded-md text-success-700 hover:bg-success-200 active:bg-success-300"
            aria-label="Close alert"
            onClick={() => setSuccessPromoAlert(false)}
          >
            <SfIconClose size="sm" />
          </button>
        </div>
      )}

      <div className="md:shadow-lg md:rounded-md md:border md:border-neutral-100">
        <div className="flex justify-between items-end bg-neutral-100 md:bg-transparent py-2 px-4 md:px-6 md:pt-6 md:pb-4">
          <p className="typography-headline-4 font-bold md:typography-headline-3">Order Summary</p>
          <p className="typography-text-base font-medium">(Items: {totalItemsCount()})</p> {/* Updated items count */}
        </div>
        <div className="px-4 pb-4 mt-3 md:px-6 md:pb-6 md:mt-0">
          <div className="flex justify-between text-base font-medium sm:typography-text-lg">
            <p>Subtotal</p>
            <p className="text-right">{formatPrice(itemsSubtotal())}</p>
          </div>
          <div className="flex justify-between text-base font-medium sm:typography-text-lg mt-3">
            <p>Tax</p>
            <p className="text-right">{formatPrice(calculateTax())}</p>
          </div>
          <div className="flex justify-between text-base font-medium sm:typography-text-lg mt-3">
            <p>Coupon code</p>
            <div className="flex items-center text-right">
              <p>{formatPrice(promoCode)}</p>
              <button
                type="button"
                onClick={removePromoCode}
                className="ml-3 text-sm font-light text-neutral-600"
              >
                Remove
              </button>
            </div>
          </div>
          <div className="flex justify-between text-lg font-bold mt-6">
            <p>Total</p>
            <p>{formatPrice(totalPrice())}</p>
          </div>
        </div>
      </div>

      <form onSubmit={checkPromoCode} className="mt-6">
  <div className="flex items-center justify-between w-full">
    <SfInput
      label="Coupon Code"
      placeholder="Enter coupon code"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      wrapperClassName="w-4/5" // 80% width for the input
    />
   <SfButton type="submit" className="ml-2 w-1/5 py-1 px-3">
        Apply
   </SfButton>
  </div>
</form>


      {/* Add to Cart Button */}
      {/* Centered Add to Cart Button */}
      <div className="mt-6 flex justify-center items-center">
        <Link to="/orderconfirmation">
          <SfButton >Go to checkout</SfButton>
        </Link>
      </div>
    </div>
  );
}
