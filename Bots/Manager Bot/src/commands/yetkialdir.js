const coin = require("../schemas/coin");
const yetkis = require("../schemas/yetkis");
const conf = require("../configs/config.json");

module.exports = {
  conf: {
    aliases: ["yetkiver", "yetkili"],
    name: "yetkili",
    help: "yetkili [kullanıcı]"
  },

  run: async (client, message, args, embed) => {
    if (!conf.staffs.some(x => message.member.roles.cache.has(x))) return;
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return message.channel.send(embed.setDescription("Bir üye belirtmelisin!"));
    if (!member.user.username.includes(conf.tag)) return message.channel.send(embed.setDescription("Bu üye taglı değil!"));
    const yetkiData = await yetkis.findOne({ guildID: message.guild.id, userID: message.author.id });
    if (yetkiData && yetkiData.yetkis.includes(member.user.id)) return message.channel.send(embed.setDescription("Bu üye zaten önceden yetkili olmuş."));

    embed.setDescription(`${message.member.toString()} üyesi sana yetki vermek istiyor. Kabul ediyor musun?`);
    const msg = await message.channel.send(member.toString(), { embed });
    msg.react("✅");
    msg.react("❌");

    msg.awaitReactions((reaction, user) => ["✅", "❌"].includes(reaction.emoji.name) && user.id === member.user.id, {
      max: 1,
      time: 30000,
      errors: ['time']
    }).then(async collected => {
      const reaction = collected.first();
      if (reaction.emoji.name === '✅') {
        await coin.findOneAndUpdate({ guildID: member.guild.id, userID: message.author.id }, { $inc: { coin: conf.yetkiCoin } }, { upsert: true });
        embed.setColor("GREEN");
        msg.edit(embed.setDescription(`${member.toString()} üyesi başarıyla yetkili oldu!`)).then(x => x.delete({timeout: 5000}))
        message.channel.send(`${member.toString()} aramıza hoşgeldin!`)
        member.roles.add(conf.yetkiRolleri)
        await yetkis.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { yetkis: member.user.id } }, { upsert: true });
      } else {
        embed.setColor("RED");
        msg.edit(embed.setDescription(`${member.toString()} üyesi, yetkiye alma teklifini reddetti!`));
      }
    }).catch(() => msg.edit(embed.setDescription("Yetki verme işlemi iptal edildi!")));
  }
}