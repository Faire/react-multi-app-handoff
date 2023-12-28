require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const port = 4002;

const APP_BUILD_ID = process.env.APP_BUILD_ID ?? "456";

app.use(express.json());
app.use(`/${APP_BUILD_ID}/public`, express.static("public"));

app.get("/app2", (req, res) => {
  const rscId = req.query["_rsc"];
  if (rscId) {
    switch (rscId) {
      case "2":
        return res.send({
          appId: APP_BUILD_ID,
          files: ["public/dist/main.js"],
        });
      default:
        return res.send({});
    }
  }
  return res.sendFile("public/index.html", {
    root: path.join(__dirname, ".."),
  });
});

app.listen(port, () => {
  console.log(`app2 listening on port ${port}`);
});
