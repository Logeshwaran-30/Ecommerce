import React, { useEffect, useState } from 'react';
import { SfButton } from '@storefront-ui/react';
import classNames from 'classnames';

export default function Banner2() {
  const [products, setProducts] = useState([]);

  // ✅ Fetch 3 random products
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        const randomThree = data.sort(() => 0.5 - Math.random()).slice(0, 3);
        setProducts(randomThree);
      })
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  // ✅ Loading state
  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-lg font-medium">
        Loading products...
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-6 max-w-[1540px]">
      {products.map((product, index) => (
        <div
          key={product.id}
          className={classNames(
            'relative flex md:max-w-[1536px] md:[&:not(:first-of-type)]:flex-1 md:first-of-type:w-full bg-white',
            {
              'bg-purple-200': index === 0,
              'bg-yellow-200': index === 1,
              'bg-blue-200': index === 2,
              'flex-row-reverse': index % 2 !== 0,
            }
          )}
        >
          {/* Clickable area */}
          <a
            className="absolute w-full h-full z-1 focus-visible:outline focus-visible:rounded-lg"
            aria-label={product.title}
            href={`/Productdetails/${product.id}`}
          />

          <div
            className={classNames('flex justify-between overflow-hidden grow', {
              'flex-row-reverse': index % 2 !== 0,
            })}
          >
            {/* Text Section */}
            <div className="flex flex-col justify-center items-start p-4 md:p-10 basis-2/4 items-center text-center">
              <p className="mb-2 uppercase text-sm text-neutral-900 font-headings font-bold tracking-widest">
                {product.category}
              </p>
              <h1 className="typography-heading-3 md:typograhy-headline-2 font-medium mb-4">
                {product.title}
              </h1>
              <p className="mb-6">
                {product.description.length > 100
                  ? product.description.slice(0, 100) + '...'
                  : product.description}
              </p>
              <SfButton className="!bg-black">Order now</SfButton>
            </div>

            {/* ✅ Image Section */}
            <div className="flex justify-center items-center basis-2/4">
              <img
                src={product.image}
                alt={product.title}
                className={classNames(
                  'object-contain transition-all duration-300',
                  {
                    // 🟢 Taller image for the first card
                    'w-[300px] h-[300px] md:w-[350px] md:h-[400px]': index === 0,
                    // ⚪ Normal size for others
                    'w-[280px] h-[280px] md:w-[300px] md:h-[300px]': index !== 0,
                  }
                )}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
