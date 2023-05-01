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
      <div className="product-details-container">
         {product ? (
            <>
               <h1>{product.title}</h1>
               <div className="product-image">
                  <img src={product.image} alt={product.title} />
               </div>
               <div
                  className="product-description"
                  dangerouslySetInnerHTML={{ __html: product.description }}
               ></div>
               <p>Price: ${product.price}</p>
               <div className="variants">
                  <h3>Variants:</h3>
                  {product.variants.map((variant) => (
                     <div key={variant.id} className="variant">
                        <h4>{variant.title}</h4>
                        <img
                           src={variant.selectedOptions[0].value}
                           alt={variant.title}
                        />
                        <p>Price: ${variant.price}</p>
                        <div className="selected-options">
                           {variant.selectedOptions.map((option, index) => (
                              <p key={index}>
                                 {option.name}: {option.value}
                              </p>
                           ))}
                        </div>
                     </div>
                  ))}
               </div>
            </>
         ) : (
            <h2>Loading product details...</h2>
         )}
      </div>
   );
};

export default ProductDetails;
