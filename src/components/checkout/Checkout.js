import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../cart/CartContext";

const Checkout = () => {
   const [name, setName] = useState("");
   const [address, setAddress] = useState("");
   const [email, setEmail] = useState("");
   const [error, setError] = useState(null);
   const history = useNavigate();
   const { cart, clearCart } = useContext(CartContext);

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         // Here, you would typically send the order information to your server or a third-party service
         // to handle order processing, payment, and fulfillment.

         // Clear the cart and navigate to the confirmation page or homepage.
         clearCart();
         history.push("/confirmation");
      } catch (error) {
         setError(error.message);
      }
   };

   return (
      <div>
         <h1>Checkout</h1>
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
            <button type="submit">Place Order</button>
         </form>
         {error && <p>{error}</p>}
      </div>
   );
};

export default Checkout;
