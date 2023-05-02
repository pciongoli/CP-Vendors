import React from "react";
import ProductList from "../products/ProductList";
import "../../styles/Home.css";

const Home = () => {
   return (
      <div className="main-content">
         <div className="home">
            <div className="jumbotron">
               <h1>Welcome to CP Vendors</h1>
               <p>Find Funky Products for a Funky You!</p>
            </div>
            <div className="featured-products">
               <h2>Featured</h2>
               <ProductList />
            </div>
         </div>
      </div>
   );
};

export default Home;
