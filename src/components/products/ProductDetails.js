import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
   const [product, setProduct] = useState(null);
   const { id } = useParams();

   useEffect(() => {
      const fetchProductDetails = async () => {
         try {
            // Replace "API_ENDPOINT" with the actual API endpoint for fetching product details
            const response = await axios.get(
               `https://developers.cjdropshipping.com/api2.0/${id}`,
               {
                  headers: {
                     "CJ-Access-Token": process.env.REACT_APP_CJ_ACCESS_TOKEN,
                     "Content-Type": "application/json",
                  },
               }
            );

            setProduct(response.data);
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
               <img src={product.imageUrl} alt={product.title} />
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
