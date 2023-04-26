import React, { useContext } from "react";
import { CartContext } from "./CartContext";

const ShoppingCart = () => {
   const { cart, removeFromCart } = useContext(CartContext);

   const handleRemoveFromCart = (productId) => {
      removeFromCart(productId);
   };

   return (
      <div>
         <h2>Shopping Cart</h2>
         <ul>
            {cart.map((product) => (
               <li key={product.id}>
                  {product.name} - ${product.price}
                  <button onClick={() => handleRemoveFromCart(product.id)}>
                     Remove
                  </button>
               </li>
            ))}
         </ul>
         <h3>
            Total: ${cart.reduce((total, product) => total + product.price, 0)}
         </h3>
      </div>
   );
};

export default ShoppingCart;
