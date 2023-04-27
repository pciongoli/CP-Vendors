import React, { useState, useEffect } from "react";
import { fetchShopifyProducts } from "../../api/shopifyApi";
import Product from "./Product";
import "../../styles/ProductList.css";

const ProductList = () => {
   const [products, setProducts] = useState([]);

   useEffect(() => {
      const fetchProducts = async () => {
         const fetchedProducts = await fetchShopifyProducts();
         setProducts(fetchedProducts);
      };

      fetchProducts();
   }, []);

   return (
      <div>
         {products.map((product) => (
            <Product
               key={product.id}
               id={product.id}
               title={product.title}
               price={product.price}
               image={product.image}
            />
         ))}
      </div>
   );
};

export default ProductList;
