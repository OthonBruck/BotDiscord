const { MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");

exports.run = async (client, message, args) => {
  if (!message.member.voice.channel)
    return message.channel.send("Connect to a voice channel");
  if (message.guild.me.voice.channel)
    return message.channel.send("already in other voice channel in the guild");

  if (!args[0]) return message.channel.send("sorry");

  let validate = await ytdl.validateURL(args[0]);

  if (!validate) return message.channel.send("send a url valid");

  let info = await ytdl.getInfo(args[0]);

  let connection = await message.member.voice.channel.join();

  let dispatcher = connection.play(
    await ytdl(args[0], { filter: "audioonly" })
  );

  const embed = new MessageEmbed()
    .setTitle("Music")
    .setColor("#00FFFF")
    .setDescription(`${info.videoDetails.title} is playing`);
  message.channel.send(embed);
};
