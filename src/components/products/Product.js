import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../cart/CartContext";
import "../../styles/Product.css";

const Product = ({ id, title, price, image }) => {
   const { addToCart } = useContext(CartContext);

   const handleAddToCart = () => {
      addToCart({ id, title, price, image });
   };

   return (
      <div className="product">
         <img src={image} alt={title} />
         <h2 className="product-title">{title}</h2>
         <p className="product-price">Price: ${price}</p>
         <button onClick={handleAddToCart}>
            <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
         </button>
      </div>
   );
};

export default Product;
