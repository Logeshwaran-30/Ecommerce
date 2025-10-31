import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  SfButton,
  SfIconRemove,
  SfIconAdd,
  SfIconDelete,
  SfIconCheckCircle,
  SfIconClose,
  SfInput,
  SfLink,
} from '@storefront-ui/react';
import { CartContext } from '../CartContext';
import { useNavigate } from 'react-router-dom';


// Combined Component
const CartPage = () => {
  const { id } = useParams();
  const { cart, addToCart, removeFromCart, updateQuantity } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [promoCode, setPromoCode] = useState(0);
  const [informationAlert, setInformationAlert] = useState(false);
  const [positiveAlert, setPositiveAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const errorTimer = useRef(0);
  const positiveTimer = useRef(0);
  const informationTimer = useRef(0);
  const navigate = useNavigate();


  // Fetch single product (if opened from product page)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        localStorage.setItem(`product-${id}`, JSON.stringify(data));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  // Fetch all products for pricing reference
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // Promo code alerts cleanup
  useEffect(() => {
    clearTimeout(errorTimer.current);
    errorTimer.current = window.setTimeout(() => setErrorAlert(false), 5000);
    return () => clearTimeout(errorTimer.current);
  }, [errorAlert]);

  useEffect(() => {
    clearTimeout(positiveTimer.current);
    positiveTimer.current = window.setTimeout(() => setPositiveAlert(false), 5000);
    return () => clearTimeout(positiveTimer.current);
  }, [positiveAlert]);

  useEffect(() => {
    clearTimeout(informationTimer.current);
    informationTimer.current = window.setTimeout(() => setInformationAlert(false), 5000);
    return () => clearTimeout(informationTimer.current);
  }, [informationAlert]);

  const getProductDetails = (productId) => products.find((p) => p.id === productId);
  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

  const itemsSubtotal = () =>
    cart.reduce((acc, item) => {
      const prod = getProductDetails(item.id);
      return acc + (prod?.price || 0) * item.quantity;
    }, 0);

  const totalQuantity = () => cart.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = () => {
    const subtotal = itemsSubtotal();
    const tax = subtotal * 0.1;
    return subtotal + tax + promoCode;
  };

  const checkPromoCode = (e) => {
    e.preventDefault();
    const subtotal = itemsSubtotal();
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    if (total > 200) {
      if (inputValue.toUpperCase() === 'VSF2020') {
        setPromoCode(-100);
        setPositiveAlert(true);
      } else setErrorAlert(true);
    } else setErrorAlert(true);
  };

  const removePromoCode = () => {
    setPromoCode(0);
    setInformationAlert(true);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );

    const handlePlaceOrder = () => {
  navigate('/orderconfirmation');
};


  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* LEFT SIDE — CART ITEMS */}
        <div className="w-full lg:w-2/3 bg-white p-6 rounded-xl shadow">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">Your Cart</h1>

          {cart.length === 0 ? (
            <div className="flex flex-col justify-center items-center py-20">
              <img src="/emptycart.svg" alt="Empty Cart" className="w-52 mb-6" />
              <h1 className="font-bold text-2xl text-gray-700">Your Cart is Empty</h1>
              <p className="text-gray-500 mt-2">Looks like you haven’t added anything yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center sm:space-x-6 border-b pb-6"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-32 h-32 sm:w-40 sm:h-40 object-contain border rounded-lg"
                  />

                  <div className="flex flex-col flex-1 text-center sm:text-left mt-4 sm:mt-0">
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-500 capitalize mt-1">
                      Category: <span className="font-medium">{item.category}</span>
                    </p>

                    <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
                      <span className="text-lg font-bold text-gray-700">
                        ${item.price.toFixed(2)}
                      </span>

                      <div className="flex items-center mt-3 sm:mt-0">
                        <div className="flex border border-gray-300 rounded-md">
                          <SfButton
                            variant="tertiary"
                            square
                            disabled={item.quantity <= 1}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <SfIconRemove />
                          </SfButton>
                          <input
                            type="number"
                            className="mx-2 w-10 text-center bg-transparent font-medium"
                            value={item.quantity}
                            readOnly
                          />
                          <SfButton
                            variant="tertiary"
                            square
                            disabled={item.quantity >= 100}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <SfIconAdd />
                          </SfButton>
                        </div>
                        <SfButton
                          variant="tertiary"
                          square
                          className="ml-3 text-red-500 hover:text-red-700"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <SfIconDelete />
                          <span className="hidden sm:inline ml-1.5">Remove</span>
                        </SfButton>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDE — ORDER SUMMARY */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-md h-fit">
          <div className="flex justify-between items-end border-b pb-4">
            <p className="text-xl font-bold">Order Summary</p>
            <p className="text-sm">(Items: {totalQuantity()})</p>
          </div>

          <div className="mt-4 space-y-4">
            <div>
              {cart.map((item, i) => {
                const prod = getProductDetails(item.id);
                return (
                  <div key={i} className="flex justify-between text-sm mb-2">
                    <p>{prod?.title}</p>
                    <p>
                      {item.quantity} x {formatPrice(prod?.price || 0)}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-sm">
                <p>Items Subtotal</p>
                <p>{formatPrice(itemsSubtotal())}</p>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <p>Estimated Sales Tax</p>
                <p>{formatPrice(itemsSubtotal() * 0.1)}</p>
              </div>
            </div>

            {/* Promo Code */}
            {promoCode ? (
              <div className="flex items-center justify-between border-y py-3">
                <p>Coupon Code</p>
                <SfButton size="sm" variant="tertiary" onClick={removePromoCode}>
                  Remove
                </SfButton>
              </div>
            ) : (
              <form className="flex gap-2 border-y py-3" onSubmit={checkPromoCode}>
                <SfInput
                  value={inputValue}
                  placeholder="Enter promo code"
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <SfButton type="submit" variant="secondary">
                  Apply
                </SfButton>
              </form>
            )}

            <div className="flex justify-between font-bold text-lg border-t pt-4">
              <p>Total</p>
              <p>{formatPrice(totalPrice())}</p>
            </div>

           <SfButton
  size="lg"
  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
  onClick={handlePlaceOrder}
>
checkout</SfButton>

          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="fixed top-4 right-4 space-y-2">
        {positiveAlert && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
            ✅ Coupon applied successfully!
          </div>
        )}
        {errorAlert && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
            ❌ Invalid promo or total below $200!
          </div>
        )}
        {informationAlert && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 rounded">
            ℹ️ Coupon removed.
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
