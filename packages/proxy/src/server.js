require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const port = 4000;

const APP1_BUILD_ID = process.env.APP1_BUILD_ID ?? "123";
const APP2_BUILD_ID = process.env.APP2_BUILD_ID ?? "456";

app.use(express.json());

app.use(
  ["/app1", `/${APP1_BUILD_ID}`],
  createProxyMiddleware({
    target: "http://localhost:4001",
  })
);
app.use(
  ["/app2", `/${APP2_BUILD_ID}`],
  createProxyMiddleware({
    target: "http://localhost:4002",
  })
);

app.listen(port, () => {
  console.log(`proxy listening on port ${port}`);
});
