import pkg from 'discord.js';
const { Client, Intents } = pkg;

const client = new Client({
    intents: [
        Intents.FLAGS.Guilds,
        Intents.FLAGS.GuildMessages,
        Intents.FLAGS.DirectMessages
    ]
});

// Event: Bot is ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Event: Bot receives a message
client.on('messageCreate', (message) => {
    if (message.content === '!hello') {
        message.channel.send('Hello, I am your Discord bot!');
    }
});

// Log in with your bot token
client.login('MTIwNTUyMTQzI0NDI4ODU4Mg.GZgDLy.t5ABYz34Wk72hAeX_okaktR8wUIQLKLBEsmrEQ');