// run: node index.js
import XDEA from "./src/xdea.mjs";

const modelInstance = new XDEA("./src/intents/intents.json");
modelInstance.chat();