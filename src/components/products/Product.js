import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../cart/CartContext";
import { Link } from "react-router-dom";
import "../../styles/Product.css";

const Product = ({ id, title, price, image, tags }) => {
   const { addToCart } = useContext(CartContext);

   const handleAddToCart = () => {
      addToCart(
         {
            id,
            title,
            price,
            image: { src: image },
            product: {
               id,
               title,
               images: [{ src: image }],
               price: parseFloat(price).toFixed(2),
            },
         },
         1 // Pass a default quantity of 1
      );
   };

   const decodedId = id.replace("gid://shopify/Product/", "");

   return (
      <div className="product">
         <Link to={`/product/${decodedId}`}>
            <img src={image} alt={title} />
         </Link>
         <h2 className="product-title">{title}</h2>
         <p className="product-price">Price: ${parseFloat(price).toFixed(2)}</p>

         {/* Display the tags */}
         {tags && (
            <div className="product-tags">
               {tags.map((tag, index) => (
                  <span key={index} className="product-tag">
                     {tag}
                  </span>
               ))}
            </div>
         )}

         <button onClick={handleAddToCart}>
            <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
         </button>
      </div>
   );
};

export default Product;
