import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  SfButton,
  SfRating,
  SfIconShoppingCart,
  SfIconRemove,
  SfIconAdd,
  SfCounter,
  SfIconPackage,
  SfIconSell,
} from '@storefront-ui/react';
import { CartContext } from '../CartContext';
import { clamp } from '@storefront-ui/shared';

// Skeleton loader component
const SkeletonLoader = ({ width = '100%', height = '20px', borderRadius = '4px' }) => (
  <div
    style={{
      width,
      height,
      backgroundColor: '#e0e0e0',
      borderRadius,
      animation: 'pulse 1.5s infinite ease-in-out',
    }}
  ></div>
);

const Addtocart = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const inputId = `input-${id}`;
  const min = 1;
  const max = 100;
  const [value, setValue] = useState(min);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleOnChange = (event) => {
    const nextValue = parseFloat(event.target.value);
    setValue(Number(clamp(nextValue, min, max)));
  };

  if (loading) {
    return (
      <section className="md:max-w-[1280px] mx-auto py-8">
        <div className="inline-flex items-center justify-center text-sm font-medium text-white bg-secondary-600 py-1.5 px-3 mb-4">
          <SkeletonLoader width="20px" height="20px" borderRadius="50%" />
          <SkeletonLoader width="50px" height="16px" className="ml-2" />
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-8 flex justify-center">
            <SkeletonLoader width="100%" height="200px" borderRadius="8px" />
          </div>

          <div className="w-full md:w-1/2">
            <SkeletonLoader width="50%" height="24px" />
            <SkeletonLoader width="30%" height="20px" className="mt-4" />

            <div className="flex justify-between mt-4">
              <SkeletonLoader width="20%" height="12px" />
              <SkeletonLoader width="20%" height="12px" />
            </div>

            <SkeletonLoader width="80%" height="14px" className="mt-4" />
            <SkeletonLoader width="100%" height="12px" className="mt-4" />
            <SkeletonLoader width="80%" height="12px" className="mt-4" />
          </div>
        </div>
      </section>
    );
  }

  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <section className="md:max-w-[1280px] mx-auto py-8">
      <div className="inline-flex items-center justify-center text-sm font-medium text-white bg-secondary-600 py-1.5 px-3 mb-4">
        <SfIconSell size="sm" className="mr-1.5" />
        Sale
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-8 flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="object-cover max-w-xl h-72 rounded-md shadow-md"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="mb-1 font-bold text-xl md:text-2xl">{product.title}</h1>
          <strong className="block text-lg font-bold">${product.price.toFixed(2)}</strong>

          <div className="flex justify-between mt-4">
            <SfRating size="xs" value={product.rating.rate} max={5} />
            <SfCounter>{product.rating.count}</SfCounter>
          </div>

          <p className="mb-4 typography-text-sm">{product.description}</p>

          <div className="py-4 mb-4 border-gray-200 border-y">
            <div className="bg-primary-100 text-primary-700 flex justify-center gap-1.5 py-1.5 typography-text-sm items-center mb-4 rounded-md">
              <SfIconShoppingCart />
              {value} in cart
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex border border-neutral-300 rounded-md">
                <SfButton
                  variant="tertiary"
                  square
                  className="rounded-r-none p-3"
                  disabled={value <= min}
                  aria-controls={inputId}
                  aria-label="Decrease value"
                  onClick={() => setValue((prev) => Math.max(prev - 1, min))}
                >
                  <SfIconRemove />
                </SfButton>
                <input
                  id={inputId}
                  type="number"
                  role="spinbutton"
                  className="grow appearance-none mx-2 w-16 text-center bg-transparent font-medium"
                  min={min}
                  max={max}
                  value={value}
                  onChange={handleOnChange}
                />
                <SfButton
                  variant="tertiary"
                  square
                  className="rounded-l-none p-3"
                  disabled={value >= max}
                  aria-controls={inputId}
                  aria-label="Increase value"
                  onClick={() => setValue((prev) => Math.min(prev + 1, max))}
                >
                  <SfIconAdd />
                </SfButton>
              </div>

              <Link to={`/addtocart/${id}`}>
                <SfButton
                  size="lg"
                  className="w-full md:w-auto"
                  slotPrefix={<SfIconShoppingCart size="sm" />}
                  onClick={() => addToCart(product, value)}
                >
                  Add to Cart
                </SfButton>
              </Link>
            </div>
          </div>

          <div className="flex mt-4">
            <SfIconPackage size="sm" className="flex-shrink-0 mr-1 text-neutral-500" />
            <p className="text-sm">
              Free shipping, arrives by Thu, Apr 7. Want it faster?{' '}
              <Link to="/add-address" className="mx-1">
                Add an address
              </Link>
              to see options.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Addtocart;
