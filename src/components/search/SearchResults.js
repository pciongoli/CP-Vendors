import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Product from "../products/Product";
import { fetchShopifyProducts } from "../../api/shopifyApi";

const SearchResults = () => {
   const [products, setProducts] = useState([]);
   const [filteredProducts, setFilteredProducts] = useState([]);
   const location = useLocation();
   const query = new URLSearchParams(location.search).get("query");

   useEffect(() => {
      const fetchAllProducts = async () => {
         const allProducts = await fetchShopifyProducts();
         setProducts(allProducts);
      };

      fetchAllProducts();
   }, []);

   useEffect(() => {
      if (query) {
         const searchResults = products.filter((product) => {
            const queryLowerCase = query.toLowerCase();
            const titleMatch = product.title
               .toLowerCase()
               .includes(queryLowerCase);
            const descriptionMatch =
               product.description &&
               product.description.toLowerCase().includes(queryLowerCase);
            const tagsMatch =
               product.tags &&
               product.tags.some((tag) =>
                  tag.toLowerCase().includes(queryLowerCase)
               );
            return titleMatch || descriptionMatch || tagsMatch;
         });
         setFilteredProducts(searchResults);
      } else {
         setFilteredProducts(products);
      }
   }, [query, products]);

   return (
      <div className="search-results">
         <h2>Search Results</h2>
         <div className="search-results-container">
            {filteredProducts.map((product) => (
               <Product
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.image}
                  tags={product.tags}
               />
            ))}
         </div>
      </div>
   );
};

export default SearchResults;
