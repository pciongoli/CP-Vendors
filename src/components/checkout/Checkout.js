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
   const [city, setCity] = useState("");
   const [province, setProvince] = useState("");
   const [zip, setZip] = useState("");
   const [country, setCountry] = useState("");
   const [phone, setPhone] = useState("");
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

   const totalPrice = cart.reduce(
      (total, item) => total + parseFloat(item.variant.price),
      0
   );

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
                  <p>Price: ${parseFloat(item.variant.price).toFixed(2)}</p>
                  <p>Variant: {item.variant.name}</p>
               </div>
            ))}
            <h2>Total: ${totalPrice.toFixed(2)}</h2>
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
               <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
               />
               <textarea
                  placeholder="Shipping Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
               ></textarea>
               <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
               />
               <input
                  type="text"
                  placeholder="Province/State"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  required
               />
               <input
                  type="text"
                  placeholder="Postal/ZIP Code"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  required
               />
               <input
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
               />
               <button type="submit">Proceed to Checkout</button>
            </form>
         </div>
      </div>
   );
};

export default Checkout;
