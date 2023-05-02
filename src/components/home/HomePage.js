import React from "react";
import ProductList from "../products/ProductList";
import "../../styles/Home.css";

const Home = () => {
   return (
      <div className="main-content">
         <div className="home">
            <div className="jumbotron">
               <h1>Welcome to CP Vendors</h1>
               <p>Funky Finds for a Funk You!</p>
            </div>
            <div className="featured-products">
               <ProductList />
            </div>
         </div>
      </div>
   );
};

export default Home;
