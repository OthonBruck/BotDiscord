const { MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");

exports.run = async (client, message, args, ops) => {
  if (!message.member.voice.channel)
    return message.channel.send("Connect to a voice channel");

  if (!args[0]) return message.channel.send("sorry");

  let validate = await ytdl.validateURL(args[0]);

  if (!validate) return message.channel.send("send a url valid");

  let info = await ytdl.getInfo(args[0]);

  let data = ops.active.get(message.guild.id) || {};

  if (!data.connection)
    data.connection = await message.member.voice.channel.join();

  if (!data.queue) data.queue = [];

  data.guildID = message.guild.id;

  data.queue.push({
    songTitle: info.videoDetails.title,
    requester: message.author.tag,
    url: args[0],
    announceChannel: message.channel.id,
  });

  if (!data.dispatcher) play(client, ops, data);
  else {
    message.channel.send(
      `Added to queue: ${info.videoDetails.title} | Requested by: ${message.author.id}`
    );
  }

  ops.active.set(message.guild.id, data);

  const embed = new MessageEmbed()
    .setTitle("Music")
    .setColor("#00FFFF")
    .setDescription(`${info.videoDetails.title} is playing`);
  message.channel.send(embed);
};

const play = async (client, ops, data) => {
  client.channels
    .fetch(data.queue[0].announceChannel)
    .then((channel) =>
      channel.send(
        `Now Playing: ${data.queue[0].songTitle} | Requested by: ${data.queue[0].requester}`
      )
    );
  data.dispatcher = await data.connection.play(
    ytdl(data.queue[0].url, { filter: "audioonly" })
  );
  data.dispatcher.guildId = data.guildID;

  //TODO: Melhorar essa parte deve ter como
  data.dispatcher.once("finish", function () {
    finish(client, ops, this);
  });
};

const finish = async (client, ops, dispatcher) => {
  let fetched = await ops.active.get(dispatcher.guildId);
  console.log(fetched);
  fetched.queue.shift();
  if (fetched.queue.length > 0) {
    ops.active.set(dispatcher.guildId, fetched);
    play(client, ops, fetched);
  } else {
    ops.active.delete(dispatcher.guildId);
    let vc = client.guilds
      .fetch(dispatcher.guildId)
      .then((channel) => channel.me.voice.channel.leave());
  }
};
