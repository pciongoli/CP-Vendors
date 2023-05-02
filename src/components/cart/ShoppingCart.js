import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import "../../styles/ShoppingCart.css";

const ShoppingCart = () => {
   const { cart, removeFromCart } = useContext(CartContext);

   const handleRemoveFromCart = (productId) => {
      removeFromCart(productId);
   };

   return (
      <div className="main-content">
         <div className="shopping-cart">
            <h2 className="shopping-cart__title">Shopping Cart</h2>
            <ul className="shopping-cart__list">
               {cart.map((product) => (
                  <li className="shopping-cart__item" key={product.variant.id}>
                     <img src={product.variant.image} alt={product.name} />
                     <div className="shopping-cart__item-info">
                        <h3 className="shopping-cart__item-name">
                           {product.name}
                        </h3>
                        <p className="shopping-cart__item-variant">
                           Variant: {product.variant.name}
                        </p>
                        <p className="shopping-cart__item-price">
                           Price: ${product.variant.price}
                        </p>
                     </div>
                     <button
                        className="shopping-cart__item-remove"
                        onClick={() => handleRemoveFromCart(product.variant.id)}
                     >
                        Remove
                     </button>
                  </li>
               ))}
            </ul>
            <h3 className="shopping-cart__total">
               Total: $
               {cart.reduce(
                  (total, product) => total + (product.variant?.price || 0),
                  0
               )}
            </h3>
            {cart.length > 0 && (
               <Link to="/checkout" className="shopping-cart__checkout-button">
                  Proceed to Checkout
               </Link>
            )}
         </div>
      </div>
   );
};

export default ShoppingCart;
