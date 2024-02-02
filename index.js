const fs = require("fs");
const readline = require("readline");

class XDEA {
  constructor(intentFile) {
    this.intentFile = intentFile;
    this.Intents = require(`./${this.intentFile}`);
    this.qKeys = Object.keys(this.Intents);
  }

  mostCommon(lst) {
    const data = lst.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});

    if (lst.length !== 0) {
      return Object.keys(data).reduce((a, b) => (data[a] > data[b] ? a : b));
    }

    return "I do not know.";
  }

  saveIntents() {
    fs.writeFileSync(this.intentFile, JSON.stringify(this.Intents, null, 2));
  }

  async chat() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    let player = "";

    while (player !== "q") {
      process.stdout.write(">_ ");

      player = await new Promise((resolve) => {
        rl.question("", resolve);
      });

      if (!this.Intents[player]) {
        this.Intents[player] = [];
        this.qKeys.push(player);
      } else {
        process.stdout.write(`>_ ${this.mostCommon(this.Intents[player])}\n`);
      }

      const question =
        this.qKeys[Math.floor(Math.random() * this.qKeys.length)];
      process.stdout.write(`>_ ${question}\n`);
      process.stdout.write(">_ ");

      player = await new Promise((resolve) => {
        rl.question("", resolve);
      });

      let a = this.Intents[question] || [];
      if (!Array.isArray(a)) {
        a = [a];
      }

      a.push(player);
      this.Intents[question] = a;
      this.saveIntents();
    }

    rl.close();
  }
}

new XDEA("intents.json").chat();
