import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [promoCode, setPromoCode] = useState(() => {
    const savedPromoCode = localStorage.getItem('promoCode');
    return savedPromoCode || null;
  });

  const [cartCount, setCartCount] = useState(0);
  const cartLimit = 100; 

  const [imageUrl, setImageUrl] = useState('');
  const updateCartCount = (cart) => {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(totalItems);
  };

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
  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

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


  const applyPromoCode = (code) => {
    const validPromoCode = 'VSF2020'; 
    if (promoCode) {
      alert('Promo code has already been applied!');
    } else if (code.toUpperCase() === validPromoCode) {
      setPromoCode(validPromoCode);
      localStorage.setItem('promoCode', validPromoCode);
    } else {
      alert('Invalid promo code!');
    }
  };


  const removePromoCode = () => {
    setPromoCode(null);
    localStorage.removeItem('promoCode');
  };


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
