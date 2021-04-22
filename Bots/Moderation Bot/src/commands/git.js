const { emojis } = require("../configs/config.json");

module.exports = {
  conf: {
    aliases: [],
    name: "git",
    help: "git [kullanıcı]",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
    if (!message.member.voice.channelID) return message.channel.error(message, "Bir ses kanalında olmalısın!");
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!uye) return message.channel.error(message, "Bir kullanıcı belirtmelisin!");
    if (!uye.voice.channelID) return message.channel.error(message, "Bu kullanıcı herhangi bir ses kanalında bulunmuyor!");
    if (message.member.voice.channelID === uye.voice.channelID) return message.channel.error(message, "Zaten aynı kanaldasınız!");
    const reactionFilter = (reaction, user) => {
      return ['✅'].includes(reaction.emoji.name) && user.id === uye.id;
    };
    message.channel.send(`${uye}`, {embed: embed.setAuthor(uye.displayName, uye.user.avatarURL({dynamic: true, size: 2048})).setDescription(`${message.author} senin ses kanalına girmek için izin istiyor! Onaylıyor musun?`)}).then(async msj => {
      await msj.react('✅');
      msj.awaitReactions(reactionFilter, {max: 1, time: 15000, error: ['time']}).then(c => {
	let cevap = c.first();
	if (cevap) {
	  message.member.voice.setChannel(uye.voice.channelID);
          msj.delete();
          message.react('✅').catch();
	};
      });
    });
  }  }