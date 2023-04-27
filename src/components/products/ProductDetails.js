import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchShopifyProductById } from "../../api/shopifyApi";
import "../../styles/ProductDetails.css";

const ProductDetails = () => {
   const [product, setProduct] = useState(null);
   const { id } = useParams();

   useEffect(() => {
      const fetchProductDetails = async () => {
         try {
            const fetchedProduct = await fetchShopifyProductById(id);
            setProduct(fetchedProduct);
         } catch (error) {
            console.error("Error fetching product details:", error);
         }
      };

      fetchProductDetails();
   }, [id]);

   return (
      <div>
         {product ? (
            <>
               <h1>{product.title}</h1>
               <img src={product.image} alt={product.title} />
               <p>{product.description}</p>
               <p>${product.price}</p>
            </>
         ) : (
            <p>Loading product...</p>
         )}
      </div>
   );
};

export default ProductDetails;
