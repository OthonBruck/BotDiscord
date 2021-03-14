exports.run = (client, message, args, ops) => {
  if (!message.member.voice.channel)
    return message.channel.send("Connect to a channel");

  if (!message.guild.me.voice.channel)
    return message.channel.send("Bot dont connected to the guild");

  if (message.guild.me.voice.channel.id !== message.member.voice.channel.id)
    return message.channel.send("sorry dont connect at the same channel");

  message.guild.me.voice.channel.leave();

  message.channel.send("leaving channel...");
};
