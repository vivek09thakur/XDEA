import { writeFileSync, readFileSync } from "fs";
import { createInterface } from "readline";

class XDEA {
  constructor(intentFile) {
    this.intentFile = intentFile;
    this.Intents = JSON.parse(readFileSync(intentFile, "utf-8"));
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
    writeFileSync(this.intentFile, JSON.stringify(this.Intents, null, 2));
  }

  async chat() {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    let player = "";

    while (player !== "q") {
      process.stdout.write("<user> ");

      player = await new Promise((resolve) => {
        rl.question("<user> ", resolve);
      });

      if (!this.Intents[player]) {
        this.Intents[player] = [];
        this.qKeys.push(player);
      } else {
        process.stdout.write(
          `<xdea> ${this.mostCommon(this.Intents[player])} `
        );
      }

      const question =
        this.qKeys[Math.floor(Math.random() * this.qKeys.length)];
      process.stdout.write(`<xdea> ${question}\n`);
      process.stdout.write("<response learned>");

      player = await new Promise((resolve) => {
        rl.question("<user> ", resolve);
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

export default XDEA;
