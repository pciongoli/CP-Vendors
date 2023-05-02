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

   const addToCart = (variant) => {
      const productWithVariant = {
         id: variant.product.id,
         name: variant.product.name,
         image: variant.product.image,
         price: parseFloat(variant.product.price),
         variant: {
            id: variant.id,
            name: variant.title,
            image: variant.imageUrl,
            price: parseFloat(variant.price),
         },
      };
      setCart([...cart, productWithVariant]);
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
