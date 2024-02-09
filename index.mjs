import XDEA from "./xdea.mjs";
import { Client, Intents as DiscordIntents } from "discord.js";

const bot = new XDEA("./intents.json");
const client = new Client({
  intents: [
    DiscordIntents.FLAGS.GUILD_MESSAGES,
    DiscordIntents.FLAGS.GUILD_MESSAGE_CONTENT,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  bot.chat(message);
});

client.login(process.env.DISCORD_TOKEN);