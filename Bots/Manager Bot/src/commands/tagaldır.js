const coin = require("../schemas/coin");
const taggeds = require("../schemas/taggeds");
const conf = require("../configs/config.json");

module.exports = {
  conf: {
    aliases: ["tag-aldır", "taglıaldır"],
    name: "tagaldır",
    help: "tagaldır [kullanıcı]"
  },

  run: async (client, message, args, embed) => {
    if (!conf.staffs.some(x => message.member.roles.cache.has(x))) return;
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return message.channel.send(embed.setDescription("Bir üye belirtmelisin!"));
    if (!member.user.username.includes(conf.tag)) return message.channel.send(embed.setDescription("Bu üye taglı değil!"));
    const taggedData = await taggeds.findOne({ guildID: message.guild.id, userID: message.author.id });
    if (taggedData && taggedData.taggeds.includes(member.user.id)) return message.channel.send(embed.setDescription("Bu üyeye zaten daha önce tag aldırmışsın!"));

    const msg = await message.channel.send( `${member.toString()}, ${message.member.toString()} üyesi sana tag aldırmak istiyor. Kabul ediyor musun?`);
    msg.react("✅");
    msg.react("❌");

    msg.awaitReactions((reaction, user) => ["✅", "❌"].includes(reaction.emoji.name) && user.id === member.user.id, {
      max: 1,
      time: 30000,
      errors: ['time']
    }).then(async collected => {
      const reaction = collected.first();
      if (reaction.emoji.name === '✅') {
        await coin.findOneAndUpdate({ guildID: member.guild.id, userID: message.author.id }, { $inc: { coin: conf.taggedCoin } }, { upsert: true });
        msg.channel.send(`${member.toString()} üyesine başarıyla tag aldırıldı!`).then(x => x.delete({timeout: 5000}))
        await taggeds.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { taggeds: member.user.id } }, { upsert: true });
      } else {
        msg.channel.send(`${member.toString()} üyesi, tag aldırma teklifini reddetti!`).then(x => x.delete({timeout: 5000}))
      }
    }).catch(() => msg.channel.send("Tag aldırma işlemi iptal edildi!")).then(x => x.delete({timeout: 5000}))
  }
}