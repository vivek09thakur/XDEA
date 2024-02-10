import { Client, Intents } from "discord.js";
import XDEA from "./src/xdea.mjs";

const client = new Client({ intents: [Intents.Guilds, Intents.GuildMessages] });

client.once("ready", () => {
  console.log("Ready!");
});

client.on("messageCreate", (message) => {
  if (message.author.id === client.user.id) return;
  const xdeaBot = new XDEA("./save/intents.json");

  if (xdeaBot.Intents[message.content]) {
    message.channel.send(xdeaBot.mostCommon(xdeaBot.Intents[message.content]));
  } else {
    xdeaBot.Intents[message.content] = [];
    xdeaBot.qKeys.push(message.content);
  }

  const randomQuestion =
    xdeaBot.qKeys[Math.floor(Math.random() * xdeaBot.qKeys.length)];
  message.channel.send(`<@${message.author.id}> <xdea> ${randomQuestion}`);

  xdeaBot.Intents[randomQuestion].push("<response learned>");
  xdeaBot.saveIntents();
});

client.login("your-bot-token");
