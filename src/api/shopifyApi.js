import axios from "axios";

const SHOPIFY_API_BASE_URL =
   "https://cp-vendors.myshopify.com/api/2023-04/graphql.json";

export const fetchShopifyProductById = async (productId) => {
   const query = `
    query($id: ID!) {
      node(id: $id) {
        ... on Product {
          id
          title
          description
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 1) {
            edges {
              node {
                src
              }
            }
          }
        }
      }
    }
  `;

   const response = await axios.post(
      SHOPIFY_API_BASE_URL,
      { query, variables: { id: productId } },
      {
         headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token":
               process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
         },
      }
   );

   const product = response.data.data.node;
   return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.priceRange.minVariantPrice.amount,
      image: product.images.edges[0]?.node.src || "",
   };
};

export const fetchShopifyProducts = async () => {
   const query = `
    query {
      products(first: 10) {
        edges {
          node {
            id
            title
            description
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 1) {
              edges {
                node {
                  src
                }
              }
            }
          }
        }
      }
    }
  `;

   const response = await axios.post(
      SHOPIFY_API_BASE_URL,
      { query },
      {
         headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token":
               process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
         },
      }
   );

   return response.data.data.products.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      description: node.description,
      price: node.priceRange.minVariantPrice.amount,
      image: node.images.edges[0]?.node.src || "",
   }));
};
