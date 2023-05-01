require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(express.json());
app.use(cors());

const SHOPIFY_GRAPHQL_API_URL = `https://${process.env.REACT_APP_SHOPIFY_STORE_NAME}.myshopify.com/admin/api/2023-04/graphql.json`;

const axiosInstance = axios.create({
   baseURL: SHOPIFY_GRAPHQL_API_URL,
   headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token":
         process.env.REACT_APP_SHOPIFY_ADMIN_ACCESS_TOKEN,
   },
});

app.post("/graphql", async (req, res) => {
   try {
      const response = await axiosInstance.post("", req.body);
      res.json(response.data);
   } catch (error) {
      console.error("Error in proxy server:", error);
      res.status(500).json({ error: "An error occurred in the proxy server" });
   }
});

app.post("/create-payment-intent", async (req, res) => {
   try {
      const { cart } = req.body;
      // Calculate the total amount based on your cart items
      const amount = calculateTotalAmount(cart);

      const paymentIntent = await stripe.paymentIntents.create({
         amount,
         currency: "usd",
      });

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         error: "An error occurred while processing the payment",
      });
   }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});

function calculateTotalAmount(cart) {
   // Replace this with your own logic to calculate the total amount based on your cart items
   return (
      cart.reduce((total, item) => total + item.price * item.quantity, 0) * 100
   );
}