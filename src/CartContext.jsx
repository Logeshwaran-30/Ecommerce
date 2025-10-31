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

  // ✅ Update total cart item count
  const updateCartCount = (cart) => {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(totalItems);
  };

  // ✅ Add product to cart
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

  // ✅ Remove a product from cart
  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

  // ✅ Update product quantity
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

  // ✅ Apply promo code
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

  // ✅ Remove promo code
  const removePromoCode = () => {
    setPromoCode(null);
    localStorage.removeItem('promoCode');
  };

  // ✅ NEW: Clear entire cart (used after order placed)
  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem('cart');
    setCartCount(0);
  }, []);

  // ✅ Update cart in localStorage whenever it changes
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
        clearCart, // ✅ Exported here
        imageUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
