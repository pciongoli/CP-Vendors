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
        variants(first: 10) {
          edges {
            node {
              id
              title
              price
              selectedOptions {
                name
                value
              }
              image {
                transformedSrc
              }
            }
          }
        }
      }
    }
  }`;

   const variables = { id: `gid://shopify/Product/${productId}` };

   try {
      const response = await axios.post(API_URL, { query, variables });

      if (!response.data.data || !response.data.data.node) {
         if (response.data.errors) {
            console.error("Shopify API Errors:", response.data.errors);
         }
         console.error(
            "Error fetching product by ID from server: No valid data"
         );
         return null;
      }

      const product = response.data.data.node;

      const variants = product.variants.edges.map(({ node }) => ({
         id: node.id,
         title: node.title,
         price: parseFloat(node.price),
         selectedOptions: node.selectedOptions,
         imageUrl: node.image?.transformedSrc,
      }));

      return {
         id: product.id,
         title: product.title,
         description: product.description,
         price: parseFloat(product.priceRange.minVariantPrice.amount),
         image: product.images.edges[0]?.node.transformedSrc,
         variants: variants,
      };
   } catch (error) {
      console.error("Error fetching product by ID from server", error);
      return null;
   }
};

const createDraftOrder = async (cart, customer) => {
   console.log("Cart items:", cart);

   const lineItems = cart.map((item) => ({
      variant_id: parseInt(item.variant.id),
      quantity: 1, // Update this with the actual quantity
      title: item.name,
      price: item.variant.price,
   }));

   const draftOrder = {
      draft_order: {
         line_items: lineItems,
         customer: {
            first_name: customer.name.split(" ")[0],
            last_name: customer.name.split(" ")[1] || "",
            email: customer.email,
         },
         shipping_address: {
            first_name: customer.name.split(" ")[0],
            last_name: customer.name.split(" ")[1] || "",
            phone: customer.phoneNumber,
            address1: customer.address.address1,
            city: customer.address.city,
            province: customer.address.province,
            zip: customer.address.zip,
            country: customer.address.country,
         },
      },
   };

   try {
      const response = await axios.post("/api/draft_order", draftOrder);

      if (response.data && response.data.draft_order) {
         const invoiceUrl = response.data.draft_order.invoice_url;
         return {
            id: response.data.draft_order.id,
            invoiceUrl,
         };
      } else {
         console.error("Error creating draft order:", response);
         return null;
      }
   } catch (error) {
      console.error("Error creating draft order:", error);
      return null;
   }
};

export { fetchShopifyProducts, fetchShopifyProductById, createDraftOrder };
