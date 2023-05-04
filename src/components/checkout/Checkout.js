import React, { useState, useContext } from "react";
import { CartContext } from "../cart/CartContext";
import { createDraftOrder } from "../../api/shopifyApi";
import "../../styles/Checkout.css";

const Checkout = () => {
   const { cart } = useContext(CartContext);
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [phone, setPhone] = useState("");
   const [address, setAddress] = useState("");
   const [city, setCity] = useState("");
   const [province, setProvince] = useState("");
   const [zip, setZip] = useState("");
   const [country, setCountry] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();

      const customer = {
         name,
         email,
         phoneNumber: phone,
         address: {
            address1: address,
            city,
            province,
            zip,
            country,
         },
      };

      const draftOrder = await createDraftOrder(cart, customer);

      if (draftOrder && draftOrder.invoiceUrl) {
         window.location.href = draftOrder.invoiceUrl;
      } else {
         console.error("Error creating draft order.");
      }
   };

   const totalPrice = cart.reduce((total, item) => {
      console.log("Item price:", item.variant.price);
      console.log("Item quantity:", item.quantity);
      const itemTotal = Number(item.variant.price) * item.quantity;
      console.log("Item total:", itemTotal);
      return total + itemTotal;
   }, 0);

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
