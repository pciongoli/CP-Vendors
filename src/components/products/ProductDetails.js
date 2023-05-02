import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchShopifyProductById } from "../../api/shopifyApi";
import { CartContext } from "../cart/CartContext";
import "../../styles/ProductDetails.css";

const ProductDetails = () => {
   const [product, setProduct] = useState(null);
   const [selectedVariant, setSelectedVariant] = useState(null);
   const { id } = useParams();

   const { addToCart } = useContext(CartContext);

   const handleAddToCart = () => {
      console.log("Adding to cart:", selectedVariant);
      addToCart(selectedVariant);
   };

   useEffect(() => {
      const fetchProductDetails = async () => {
         try {
            const fetchedProduct = await fetchShopifyProductById(id);
            setProduct(fetchedProduct);
            setSelectedVariant(fetchedProduct?.variants[0]);
         } catch (error) {
            console.error("Error fetching product details:", error);
         }
      };

      fetchProductDetails();
   }, [id]);

   const handleVariantClick = (variant) => {
      console.log("Selected Variant:", variant);
      console.log("Selected Variant Image:", variant.image);
      setSelectedVariant(variant);
   };
   return (
      <div className="product-details-container">
         {product && selectedVariant ? (
            <>
               <h1>{product.title}</h1>
               <div className="product-image">
                  <img
                     src={selectedVariant.imageUrl || product.image}
                     alt={product.title}
                  />
                  <p>
                     Price: ${selectedVariant.price}
                     <button
                        onClick={handleAddToCart}
                        className="add-to-cart-button"
                     >
                        Add to Cart
                     </button>
                  </p>
               </div>
               <div className="variants">
                  <h3>Variants:</h3>
                  {product.variants.map((variant) => (
                     <div
                        key={variant.id}
                        className="variant"
                        onClick={() => handleVariantClick(variant)}
                     >
                        <h4>{variant.title}</h4>
                     </div>
                  ))}
               </div>
               <div
                  className="product-description"
                  dangerouslySetInnerHTML={{ __html: product.description }}
               ></div>
            </>
         ) : (
            <h2>Loading product details...</h2>
         )}
      </div>
   );
};

export default ProductDetails;
