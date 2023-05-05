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

   const [quantity, setQuantity] = useState(1); // Add the quantity state

   const handleQuantityChange = (e) => {
      const newQuantity = parseInt(e.target.value, 10);
      setQuantity(isNaN(newQuantity) || newQuantity < 1 ? 1 : newQuantity);
   };

   const handleAddToCart = () => {
      console.log("Adding to cart:", selectedVariant);
      addToCart(
         {
            id: selectedVariant.id,
            title: selectedVariant.title,
            price: selectedVariant.price,
            image: { src: selectedVariant.imageUrl },
            product: {
               id: product.id,
               title: product.title,
               images: [{ src: product.image }],
               price: parseFloat(product.variants[0].price).toFixed(2),
            },
         },
         quantity // Pass the quantity value here
      );
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
               <div className="product-details-left">
                  <h1>{product.title}</h1>
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
               </div>
               <div className="product-description-container">
                  <div className="product-image">
                     <img
                        src={selectedVariant.imageUrl || product.image}
                        alt={product.title}
                     />
                     <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="quantity-input"
                     />
                     <p>
                        Price: ${selectedVariant.price.toFixed(2)}
                        <button
                           onClick={handleAddToCart}
                           className="add-to-cart-button"
                        >
                           Add to Cart
                        </button>
                     </p>
                  </div>
                  <div
                     className="product-description"
                     dangerouslySetInnerHTML={{
                        __html: product.description,
                     }}
                  ></div>
               </div>
            </>
         ) : (
            <h2>Loading product details...</h2>
         )}
      </div>
   );
};

export default ProductDetails;
