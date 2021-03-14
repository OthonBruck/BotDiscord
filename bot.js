const Discord = require("discord.js");
const client = new Discord.Client();
const api = require("./services/api");
const endpoints = require("./services/endpoints");
const config = require("./config.json");
const path = require("path");

client.on("ready", async () => {
  client.user.setActivity(`Em Desenvolvimento`);
});

client.on("message", async (message) => {
  const [CMD_NAME, ...args] = message.content
    .trim()
    .substring(config.prefix.length)
    .split(/\s+/);

  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;

  try {
    delete require.cache[require.resolve(`./commands/${CMD_NAME}.js`)];

    let commandFile = require(`./commands/${CMD_NAME}.js`);
    commandFile.run(client, message, args);
  } catch (e) {
    console.log(e.stack);
  }
});

client.login(config.token);
