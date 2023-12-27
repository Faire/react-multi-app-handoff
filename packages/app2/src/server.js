require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const port = 4002;

const APP2_BUILD_ID = process.env.APP2_BUILD_ID ?? "456";

app.use(express.json());
app.use(`/${APP2_BUILD_ID}/public`, express.static("public"));

app.get("*", (req, res) => {
  const rscId = req.query["_rsc"];
  if (rscId) {
    switch (rscId) {
      case "2":
        res.send({
          appId: APP2_BUILD_ID,
          files: ["main.js"],
        });
      default:
        res.send([]);
    }
    return;
  }

  res.sendFile("public/index.html", { root: path.join(__dirname, "..") });
});

app.listen(port, () => {
  console.log(`app2 listening on port ${port}`);
});
