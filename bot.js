const Discord = require("discord.js");
const guild = new Discord.Guild();
const client = new Discord.Client();
const api = require("./services/api");
const endpoints = require("./services/endpoints");
const config = require("./config.json");

client.on("ready", async () => {
  client.user.setActivity(`Em Manuntenção`);
});

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.content === "hello") {
    message.reply(`hello ${message.channel.name}`);
  }
});

client.login(config.token);
