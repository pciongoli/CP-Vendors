import React, { useState, useContext } from "react";
import { CartContext } from "../cart/CartContext";
import Client from "shopify-buy";
import "../../styles/Checkout.css";

const client = Client.buildClient({
   domain: "your-shop-name.myshopify.com",
   storefrontAccessToken: "your-storefront-access-token",
});

const Checkout = () => {
   const { cart } = useContext(CartContext);
   const [name, setName] = useState("");
   const [address, setAddress] = useState("");
   const [email, setEmail] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();

      // Create a Shopify checkout
      const checkout = await client.checkout.create();

      // Add line items to the checkout
      const lineItems = cart.map((item) => ({
         variantId: item.variant.id,
         quantity: 1, // Update this with the actual quantity
      }));

      await client.checkout.addLineItems(checkout.id, lineItems);

      // Redirect the user to Shopify's secure checkout page
      window.location.href = checkout.webUrl;
   };

   return (
      <div className="checkout-container">
         <div>
            <h1>Checkout</h1>
            {cart.map((item, index) => (
               <div
                  key={`${item.variant.id}-${index}`}
                  className="checkout-item"
               >
                  <img src={item.variant.image} alt={item.name} />
                  <h2>{item.name}</h2>
                  <p>Price: ${(item.variant.price / 100).toFixed(2)}</p>
                  <p>Variant: {item.variant.name}</p>
               </div>
            ))}
            <form onSubmit={handleSubmit}>
               <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
               />
               <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
               />
               <textarea
                  placeholder="Shipping Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
               ></textarea>
               <button type="submit">Proceed to Checkout</button>
            </form>
         </div>
      </div>
   );
};

export default Checkout;
