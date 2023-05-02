require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
