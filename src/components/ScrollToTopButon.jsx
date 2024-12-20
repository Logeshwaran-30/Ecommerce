import React, { useState, useEffect } from 'react';
import { SfIconExpandLess } from '@storefront-ui/react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to handle scroll
  const handleScroll = () => {
    if (window.scrollY > 300) { // Show button after scrolling 300px
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-white text-green-600 border border-green-800 p-2 shadow-md hover:bg-green-100 transition rounded-lg flex justify-center items-center"
          aria-label="Scroll to top"
        >
          <SfIconExpandLess size="md" />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
