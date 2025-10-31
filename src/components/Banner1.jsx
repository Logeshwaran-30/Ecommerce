import { SfButton } from '@storefront-ui/react';
import { Link } from 'react-router-dom';

export default function Banner1() {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        
        {/* Left Text Section */}
        <div className="text-center md:text-left md:w-1/2 space-y-6">
          <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
            New Arrivals
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Sneaker Collection
          </h1>

          <p className="text-base md:text-lg text-gray-700 max-w-lg mx-auto md:mx-0">
            Experience the pinnacle of comfort and style with AirMax Supreme. 
            Designed for performance and crafted for the streets.
          </p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4">
            <Link to="/category">
              <SfButton
                size="lg"
                className="!bg-black !text-white hover:!bg-gray-800 transition-all duration-300"
              >
                Order now
              </SfButton>
            </Link>
            <Link to="/category">
              <SfButton
                size="lg"
                variant="secondary"
                className="!bg-white !text-black border border-gray-300 hover:!bg-gray-100 transition-all duration-300"
              >
                Show more
              </SfButton>
            </Link>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="flex justify-center md:justify-end w-full md:w-1/2">
          <img
            src="/shoe.png"
            alt="Sneaker"
            className="w-4/5 md:w-[85%] lg:w-[75%] object-contain drop-shadow-xl rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
