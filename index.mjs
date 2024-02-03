// run: node index.js
import XDEA from "./src/xdea.mjs";

const xdeaInstance = new XDEA("./src/data/intents.json");
xdeaInstance.chat();