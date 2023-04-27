import React from "react";
import "../../styles/Product.css";

const Product = ({ id, title, price, image }) => {
   return (
      <div>
         <img src={image} alt={title} />
         <h2>{title}</h2>
         <p>Price: ${price}</p>
      </div>
   );
};

export default Product;
