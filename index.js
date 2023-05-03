const { createClient } = require("@commercetools/sdk-client");
const {
  createAuthMiddlewareForClientCredentialsFlow,
} = require("@commercetools/sdk-middleware-auth");
const { createHttpMiddleware } = require("@commercetools/sdk-middleware-http");
const fetch = require("node-fetch");
globalThis.fetch = fetch
const projectKey = "custom_project";
const clientId = "HBPrIz0YM-nnO6PabxbRpLgR";
const clientSecret = "4ref7KnLWpu1wH4wMpnzcZUCDhYLKBMn";
const apiUrl = "https://api.australia-southeast1.gcp.commercetools.com";
const authUrl = "https://auth.australia-southeast1.gcp.commercetools.com";

const orderUrl = "https://commercetools.kemanamagento.web.id/order";

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
      uri: `/${projectKey}/orders`,
      method: "GET",
    })
    .then((result) => {
      const orders = result.body.results;
      // Log orders to console
      console.log("Orders:", orders);
      // Submit orders to customerUrl using POST method
      return fetch(orderUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orders),
      });
    })
    .then((response) => {
      console.log("Customers submitted successfully");
    })
    .catch((error) => {
      console.error(error);
    });
}

main();

// const express = require("express");
// const { createClient } = require("@commercetools/sdk-client");
// const {
//   createAuthMiddlewareForClientCredentialsFlow,
// } = require("@commercetools/sdk-middleware-auth");
// const { createHttpMiddleware } = require("@commercetools/sdk-middleware-http");

// const app = express();
// const port = 3000;

// const projectKey = "custom_project";
// const clientId = "HBPrIz0YM-nnO6PabxbRpLgR";
// const clientSecret = "4ref7KnLWpu1wH4wMpnzcZUCDhYLKBMn";
// const apiUrl = "https://api.australia-southeast1.gcp.commercetools.com";
// const authUrl = "https://auth.australia-southeast1.gcp.commercetools.com";

// const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
//   host: authUrl,
//   projectKey,
//   credentials: {
//     clientId,
//     clientSecret,
//   },
// });

// const httpMiddleware = createHttpMiddleware({
//   host: apiUrl,
// });

// const client = createClient({
//   middlewares: [authMiddleware, httpMiddleware],
// });

// app.get("/", async (req, res) => {
//   try {
//     const result = await client.execute({
//       uri: `/${projectKey}/customers`,
//       method: "GET",
//     });
//     const customers = result.body.results;
//     let html = "<h1>Customers</h1><ul>";
//     for (const customer of customers) {
//       html += `<li>${customer.firstName} ${customer.lastName}</li>`;
//     }
//     html += "</ul>";
//     res.send(html);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("An error occurred");
//   }
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });