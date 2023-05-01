import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
   const [cart, setCart] = useState(() => {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
   });

   useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
   }, [cart]);

   const addToCart = (product) => {
      setCart([...cart, product]);
   };

   const removeFromCart = (productId) => {
      setCart(cart.filter((product) => product.id !== productId));
   };

   const clearCart = () => {
      setCart([]);
   };

   return (
      <CartContext.Provider
         value={{ cart, addToCart, removeFromCart, clearCart }}
      >
         {children}
      </CartContext.Provider>
   );
};
