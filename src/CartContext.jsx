import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';

// Create the CartContext
export const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Initialize cart state from localStorage or as an empty array
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Initialize promo code state
  const [promoCode, setPromoCode] = useState(() => {
    const savedPromoCode = localStorage.getItem('promoCode');
    return savedPromoCode || null;
  });

  // Initialize cart count and cart limit
  const [cartCount, setCartCount] = useState(0);
  const cartLimit = 100; // Example limit for total quantity of items

  // State for storing the fetched image URL
  const [imageUrl, setImageUrl] = useState('');

  // Update cart count whenever the cart changes
  const updateCartCount = (cart) => {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(totalItems);
  };

  // Add product to the cart
  const addToCart = useCallback(
    (product, quantity = 1) => {
      if (cartCount + quantity > cartLimit) {
        alert('Cart limit reached. Cannot add more items.');
        return;
      }

      setCart((prevCart) => {
        const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);

        if (existingProductIndex !== -1) {
          return prevCart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
          );
        } else {
          return [...prevCart, { ...product, quantity }];
        }
      });
    },
    [cartCount, cartLimit]
  );

  // Remove product from cart
  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

  // Update product quantity in cart
  const updateQuantity = useCallback(
    (productId, quantity) => {
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          )
        );
      }
    },
    [removeFromCart]
  );

  // Apply promo code
  const applyPromoCode = (code) => {
    const validPromoCode = 'VSF2020'; // Example of a valid promo code
    if (promoCode) {
      alert('Promo code has already been applied!');
    } else if (code.toUpperCase() === validPromoCode) {
      setPromoCode(validPromoCode);
      localStorage.setItem('promoCode', validPromoCode);
    } else {
      alert('Invalid promo code!');
    }
  };

  // Remove promo code
  const removePromoCode = () => {
    setPromoCode(null);
    localStorage.removeItem('promoCode');
  };

  // Sync cart data and cart count with localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(cart);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        promoCode,
        applyPromoCode,
        removePromoCode,
        imageUrl, 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
