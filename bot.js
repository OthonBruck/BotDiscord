const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
  console.log(client.channels);
  client.user.setActivity(`Estou em ${client.guilds.size} servidores`);
});

client.login(config.token);
