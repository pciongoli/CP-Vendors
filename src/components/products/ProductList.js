//ProductList.js

import React, { useState, useEffect } from "react";
import { fetchShopifyProducts } from "../../api/shopifyApi";
import Product from "./Product";
import "../../styles/ProductList.css";

const ProductList = () => {
   const [products, setProducts] = useState([]);

   useEffect(() => {
      const fetchProducts = async () => {
         const fetchedProducts = await fetchShopifyProducts();
         console.log("Fetched products:", fetchedProducts);
         setProducts(fetchedProducts);
      };

      fetchProducts();
   }, []);

   return (
      <div className="products-container">
         {products.map((product) => (
            <div className="product-item" key={product.id}>
               <Product
                  id={product.id}
                  title={product.title}
                  price={parseFloat(product.price / 100).toFixed(2)}
                  image={product.image}
               />
            </div>
         ))}
      </div>
   );
};

export default ProductList;
