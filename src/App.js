import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Logout from "./components/auth/Logout";
import ProductList from "./components/products/ProductList";
import ProductDetails from "./components/products/ProductDetails";
import ShoppingCart from "./components/cart/ShoppingCart";
import Checkout from "./components/checkout/Checkout";
import { CartProvider } from "./components/cart/CartContext";

function App() {
   return (
      <CartProvider>
         <Router>
            <Navbar />
            <Routes>
               <Route path="/" element={<ProductList />} />
               <Route path="/product/:id" element={<ProductDetails />} />
               <Route path="/cart" element={<ShoppingCart />} />
               <Route path="/checkout" element={<Checkout />} />
               <Route path="/login" element={<Login />} />
               <Route path="/signup" element={<Signup />} />
               <Route path="/logout" element={<Logout />} />
            </Routes>
            <Footer />
         </Router>
      </CartProvider>
   );
}

export default App;
