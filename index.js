// run: node index.js
import XDEA from "./Bot/xdea" assert {type:"module"};

const xdeaInstance = new XDEA("./intents.json");
xdeaInstance.chat();