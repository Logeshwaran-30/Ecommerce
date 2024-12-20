import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { SfButton, SfIconRemove, SfLink, SfIconAdd, SfIconDelete } from '@storefront-ui/react';
import { CartContext } from '../CartContext';

const Productcard2 = () => {
  const { id } = useParams();
  const { cart, addToCart, removeFromCart, updateQuantity } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product data');
        const data = await response.json();
        setProduct(data);
        localStorage.setItem(`product-${id}`, JSON.stringify(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) addToCart(product);
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  // Skeleton Loader for Product Card
  if (loading) {
    return (
      <div className="product-card-skeleton flex items-center space-x-4 my-4">
        <div className="relative overflow-hidden rounded-md w-[100px] sm:w-[176px] animate-pulse">
          <div className="bg-neutral-300 w-full h-[300px] rounded-md" />
        </div>
        <div className="flex flex-col flex-1 animate-pulse">
          <div className="bg-neutral-300 w-1/2 h-5 mb-2" />
          <div className="my-2 sm:mb-0">
            <div className="bg-neutral-300 w-3/4 h-4" />
          </div>
          <div className="flex justify-between items-center mt-auto">
            <div className="bg-neutral-300 w-1/3 h-4" />
            <div className="flex items-center justify-between mt-4 sm:mt-0">
              <div className="flex border border-neutral-300 rounded-md">
                <div className="bg-neutral-300 w-8 h-8" />
                <div className="bg-neutral-300 w-8 h-8" />
              </div>
              <div className="ml-4 bg-neutral-300 w-20 h-6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Display a message when the cart is empty */}
      {cart.length === 0 ? (
        <div className="flex flex-col justify-start items-center min-h-screen mt-10">
          <img
            className="w-[100px] h-[100px] sm:w-[300px] sm:h-[300px] border rounded-md border-neutral-200"
            width="300"
            height="300"
            src="../public/emptycart.svg" // Ensure this path is correct or adjust if needed
            alt="emptycart"
          />
          <div>
            <h1 className="font-bold text-3xl mt-6 sm:mt-8 text-center">Your Cart is Empty.</h1>
          </div>
        </div>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="product-card flex items-center space-x-4 my-4">
            <div className="relative overflow-hidden rounded-md w-[100px] sm:w-[176px]">
              <SfLink href="#">
                <img
                  className="w-full h-auto border rounded-md border-neutral-200"
                  src={item.image || 'https://via.placeholder.com/300'}
                  alt={item.title || 'Product Image'}
                  width="300"
                  height="300"
                />
              </SfLink>
            </div>
            <div className="flex flex-col flex-1">
              <SfLink href="#" variant="secondary" className="no-underline typography-text-sm sm:typography-text-lg">
                {item.title}
              </SfLink>
              <div className="my-2 sm:mb-0">
                <ul className="text-xs font-normal leading-5 sm:typography-text-sm text-neutral-700">
                  <li>
                    <span className="mr-1">Category:</span>
                    <span className="font-medium">{item.category}</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-between items-center mt-auto">
                <span className="font-bold sm:ml-auto sm:order-1 typography-text-sm sm:typography-text-lg">
                  ${item.price.toFixed(2)}
                </span>
                <div className="flex items-center justify-between mt-4 sm:mt-0">
                  <div className="flex border border-neutral-300 rounded-md">
                    <SfButton
                      variant="tertiary"
                      square
                      className="rounded-r-none"
                      disabled={item.quantity <= 1}
                      aria-label="Decrease value"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      <SfIconRemove />
                    </SfButton>
                    <input
                      type="number"
                      className="appearance-none mx-2 w-8 text-center bg-transparent font-medium"
                      value={item.quantity}
                      readOnly
                    />
                    <SfButton
                      variant="tertiary"
                      square
                      className="rounded-l-none"
                      disabled={item.quantity >= 100}
                      aria-label="Increase value"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <SfIconAdd />
                    </SfButton>
                  </div>
                  <SfButton
                    variant="tertiary"
                    square
                    className="ml-4"
                    aria-label="Remove from cart"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    <SfIconDelete />
                    <span className="hidden ml-1.5 sm:block">Remove</span>
                  </SfButton>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Productcard2;
