import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../cart/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import {
   CardElement,
   Elements,
   useElements,
   useStripe,
} from "@stripe/react-stripe-js";

// Replace "your_publishable_key" with your actual Stripe publishable key
const stripePromise = loadStripe(
   "pk_test_51N1PNWFKxkqoPzHi7RFOIyMUoo55fSHBsadLjji5Fai1XYzcggDiGQVUO2142FmM7o7RSc6h9TwO0IZO53pDAbvx00tGt7Pm7O"
);

const CheckoutForm = () => {
   const [error, setError] = useState(null);
   const [processing, setProcessing] = useState(false);
   const history = useNavigate();
   const { cart, clearCart } = useContext(CartContext);
   const stripe = useStripe();
   const elements = useElements();

   const handleSubmit = async (e) => {
      e.preventDefault();
      setProcessing(true);

      // Create a payment intent on your server
      // Replace this URL with the API endpoint on your server that creates a payment intent
      const { data: clientSecret } = await axios.post(
         "https://your-server.com/create-payment-intent",
         {
            cart, // Send the cart data to your server
         }
      );

      const { error: stripeError } = await stripe.confirmCardPayment(
         clientSecret,
         {
            payment_method: {
               card: elements.getElement(CardElement),
            },
         }
      );

      if (stripeError) {
         setError(stripeError.message);
         setProcessing(false);
      } else {
         // Payment succeeded, clear the cart and navigate to the confirmation page or homepage.
         clearCart();
         history.push("/confirmation");
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <CardElement />
         <button type="submit" disabled={processing || !stripe || !elements}>
            {processing ? "Processing..." : "Pay"}
         </button>
         {error && <p>{error}</p>}
      </form>
   );
};

const Checkout = () => {
   const [name, setName] = useState("");
   const [address, setAddress] = useState("");
   const [email, setEmail] = useState("");

   return (
      <div>
         <h1>Checkout</h1>
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
         <Elements stripe={stripePromise}>
            <CheckoutForm />
         </Elements>
      </div>
   );
};

export default Checkout;
