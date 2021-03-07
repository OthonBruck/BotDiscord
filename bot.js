const Discord = require("discord.js");
const guild = new Discord.Guild();
const client = new Discord.Client();
const api = require("./services/api");
const endpoints = require("./services/endpoints");
const config = require("./config.json");
const path = require("path");

client.on("ready", async () => {
  client.user.setActivity(`Em Desenvolvimento`);
});

client.on("message", async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith(config.prefix)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(config.prefix.length)
      .split(/\s+/);
    const { voice } = message.member;

    console.log(CMD_NAME);

    if (CMD_NAME === "COMANDO QUE DESEJA PARA ATIVAR O BOT") {
      if (!voice.channelID) {
        message.reply("Enter to a channel");
      } else {
        voice.channel.join().then((connection) => {
          connection.play("LOCAL DO SEU ARQUIVO MP3", { volume: 0.5 });
        });
      }
    }
  }
});

client.login(config.token);
