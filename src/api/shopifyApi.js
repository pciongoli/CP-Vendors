import axios from "axios";

const API_URL = "/graphql";

const fetchShopifyProducts = async () => {
   const query = `
  {
    products(first: 10) {
      edges {
        node {
          id
          title
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 1) {
            edges {
              node {
                transformedSrc
              }
            }
          }
        }
      }
    }
  }`;

   try {
      const response = await axios.post(API_URL, { query });
      const products = response.data.data.products.edges.map(({ node }) => ({
         id: node.id,
         title: node.title,
         price: parseFloat(node.priceRange.minVariantPrice.amount),
         image: node.images.edges[0]?.node.transformedSrc,
      }));
      return products;
   } catch (error) {
      console.error("Error fetching products from server", error);
      return [];
   }
};

const fetchShopifyProductById = async (productId) => {
   const query = `
  query($id: ID!) {
    node(id: $id) {
      ... on Product {
        id
        title
        description: descriptionHtml
        priceRange {
          minVariantPrice {
            amount
          }
        }
        images(first: 1) {
          edges {
            node {
             
              transformedSrc
            }
          }
        }
      }
    }
  }`;

   const variables = { id: productId };

   try {
      const response = await axios.post(API_URL, { query, variables });
      const product = response.data.data.node;
      return {
         id: product.id,
         title: product.title,
         description: product.description,
         price: parseFloat(product.priceRange.minVariantPrice.amount),
         image: product.images.edges[0]?.node.transformedSrc,
      };
   } catch (error) {
      console.error("Error fetching product by ID from server", error);
      return null;
   }
};

export { fetchShopifyProducts, fetchShopifyProductById };
