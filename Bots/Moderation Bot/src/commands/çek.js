const { emojis } = require("../configs/config.json");

module.exports = {
  conf: {
    aliases: [],
    name: "çek",
    help: "çek [kullanıcı]",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!uye) return message.channel.send(embed.setDescription("Ses odana çekilecek üyeyi belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  if (!message.member.voice.channel || !uye.voice.channel || message.member.voice.channelID == uye.voice.channelID) return message.channel.send(embed.setDescription("Belirtilen üyenin ve kendinin ses kanalında olduğundan emin ol!")).then(x => x.delete({timeout: 5000}));
    const reactionFilter = (reaction, user) => {
      return ['✅'].includes(reaction.emoji.name) && user.id === uye.id;
    };
    message.channel.send(`${uye}`, {embed: embed.setAuthor(uye.displayName, uye.user.avatarURL({dynamic: true, size: 2048})).setDescription(`${message.author} seni ses kanalına çekmek için izin istiyor! Onaylıyor musun?`)}).then(async msj => {
      await msj.react('✅');
      msj.awaitReactions(reactionFilter, {max: 1, time: 15000, error: ['time']}).then(c => {
        let cevap = c.first();
	if (cevap) {
	  uye.voice.setChannel(message.member.voice.channelID);
          msj.delete();
          message.react('✅').catch();
	};
      });
    });
  }
}
