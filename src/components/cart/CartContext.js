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
         name: variant.product.title,
         image: variant.product.images[0].src,
         price: parseFloat(variant.price).toFixed(2),
         variant: {
            id: variant.id,
            name: variant.title,
            image: variant.image.src,
            price: parseFloat(variant.price).toFixed(2),
         },
      };
      setCart([...cart, productWithVariant]);
   };

   const removeFromCart = (variantId) => {
      setCart(cart.filter((product) => product.variant.id !== variantId));
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
