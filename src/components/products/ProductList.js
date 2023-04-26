import React, { useState, useEffect } from "react";
import Product from "./Product";
import axios from "axios";

const ProductList = () => {
   const [products, setProducts] = useState([]);

   useEffect(() => {
      const fetchProducts = async () => {
         const response = await axios.get(
            "https://developers.cjdropshipping.com/api2.0/v1/product/list",
            {
               headers: {
                  "CJ-Access-Token": process.env.REACT_APP_CJ_ACCESS_TOKEN,
               },
            }
         );

         if (response.data.result) {
            setProducts(response.data.data.list);
         }
      };

      fetchProducts();
   }, []);

   return (
      <div>
         {products.map((product) => (
            <Product
               key={product.pid}
               id={product.pid}
               title={product.productNameEn}
               price={product.sellPrice}
               image={product.productImage}
            />
         ))}
      </div>
   );
};

export default ProductList;
