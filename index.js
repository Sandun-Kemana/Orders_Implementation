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
  client
    .execute({
      uri: `/${projectKey}/orders?where=createdAt%3E"${oneHourAgo}"`,
      method: "GET",
    })
    .then((result) => {
      const orders = result.body.results;
      // Log orders to console
      console.log("Orders:", orders);
      // Submit orders to orderUrl using POST method
      return fetch(orderUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orders),
      });
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
}

export default main;