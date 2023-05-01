import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import "../../styles/ShoppingCart.css";

const ShoppingCart = () => {
   const { cart, removeFromCart } = useContext(CartContext);

   const handleRemoveFromCart = (productId) => {
      removeFromCart(productId);
   };

   return (
      <div className="shopping-cart">
         <h2 className="shopping-cart__title">Shopping Cart</h2>
         <ul className="shopping-cart__list">
            {cart.map((product) => (
               <li className="shopping-cart__item" key={product.id}>
                  <div className="shopping-cart__item-info">
                     <h3 className="shopping-cart__item-name">
                        {product.name}
                     </h3>
                     <p className="shopping-cart__item-price">
                        ${product.price}
                     </p>
                  </div>
                  <button
                     className="shopping-cart__item-remove"
                     onClick={() => handleRemoveFromCart(product.id)}
                  >
                     Remove
                  </button>
               </li>
            ))}
         </ul>
         <h3 className="shopping-cart__total">
            Total: ${cart.reduce((total, product) => total + product.price, 0)}
         </h3>
      </div>
   );
};

export default ShoppingCart;
