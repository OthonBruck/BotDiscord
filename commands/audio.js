const path = require("path");

exports.run = (client, message, args) => {
  const { voice } = message.member;

  if (!voice.channelID) {
    message.reply("Enter to a channel");
  } else {
    voice.channel.join().then((connection) => {
      const puto = connection.play(
        path.join(__dirname, "DIRETORIO DO ARQUIVO QUE QUER REPRODUZIR"),
        {
          volume: 0.5,
        }
      );
      puto.on("finish", (end) => {
        voice.channel.leave();
      });
    });
  }
};
