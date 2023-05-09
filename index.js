const { createClient } = require("@commercetools/sdk-client");
const {
  createAuthMiddlewareForClientCredentialsFlow,
} = require("@commercetools/sdk-middleware-auth");
const { createHttpMiddleware } = require("@commercetools/sdk-middleware-http");
const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
const fetch = require("node-fetch");
globalThis.fetch = fetch
const projectKey = "custom_project";
const clientId = "HBPrIz0YM-nnO6PabxbRpLgR";
const clientSecret = "4ref7KnLWpu1wH4wMpnzcZUCDhYLKBMn";
const apiUrl = "https://api.australia-southeast1.gcp.commercetools.com";
const authUrl = "https://auth.australia-southeast1.gcp.commercetools.com";

const orderUrl = "https://commercetools.kemanamagento.web.id/order/";
const productsUrl = "https://commercetools.kemanamagento.web.id/product/";

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: authUrl,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
});

const httpMiddleware = createHttpMiddleware({
  host: apiUrl,
});

const client = createClient({
  middlewares: [authMiddleware, httpMiddleware],
});

async function main() {
  // Fetch orders
  const ordersResult = await client.execute({
    uri: `/${projectKey}/orders?where=createdAt%3E"${oneHourAgo}"`,
    method: "GET",
  });

      const orders = ordersResult.body.results;
      // Log orders to console
      console.log("Orders:", orders);

      let response = 
      // Submit orders to orderUrl using POST method
      await fetch(orderUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orders),
      });
      console.log(response);
    
   // Fetch products
  const productsResult = await client.execute({
    uri: `/${projectKey}/products`,
    method: "GET",
  });

      const products = productsResult.body.results;
      // Log products to console
      console.log("Products:", products);
      // Submit products to productsUrl using POST method
      response =
      await fetch(productsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(products),
      });   
      console.log(response);
}

main();