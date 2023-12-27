const fs = require("fs");
const babel = require("@babel/core");

const inputFile = "src/client/main.js";
const outputFile = "public/dist/main.js";

const inputCode = fs.readFileSync(inputFile, "utf8");
const { code } = babel.transformSync(inputCode, {
  configFile: "./babel.config.json",
});

fs.mkdirSync("public/dist", { recursive: true });
fs.writeFileSync(outputFile, code, "utf8");
