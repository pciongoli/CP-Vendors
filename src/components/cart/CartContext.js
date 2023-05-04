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

   const addToCart = (variant, quantity) => {
      if (!variant || !variant.product) {
         console.error("Invalid variant data:", variant);
         return;
      }

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
         quantity,
      };

      const existingProductIndex = cart.findIndex(
         (product) => product.variant.id === variant.id
      );

      if (existingProductIndex !== -1) {
         const newCart = [...cart];
         newCart[existingProductIndex].quantity += quantity; // Increment by the quantity parameter
         setCart(newCart);
      } else {
         setCart([...cart, productWithVariant]);
      }
   };

   const removeFromCart = (variantId) => {
      const index = cart.findIndex(
         (product) => product.variant.id === variantId
      );
      if (index !== -1) {
         const newCart = [...cart];
         newCart.splice(index, 1);
         setCart(newCart);
      }
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
