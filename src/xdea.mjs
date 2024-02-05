import { writeFileSync, readFileSync } from "fs";

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

  async chat(message) {
    let player = message.content;

    if (!this.Intents[player]) {
      this.Intents[player] = [];
      this.qKeys.push(player);
    } else {
      message.channel.send(`<xdea> ${this.mostCommon(this.Intents[player])}`);
    }

    const question = this.qKeys[Math.floor(Math.random() * this.qKeys.length)];
    message.channel.send(`<xdea> ${question}`);
    message.channel.send("<response learned>");

    let a = this.Intents[question] || [];
    if (!Array.isArray(a)) {
      a = [a];
    }

    a.push(player);
    this.Intents[question] = a;
    this.saveIntents();
  }
}

export default XDEA;