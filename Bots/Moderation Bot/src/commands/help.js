module.exports = {
  conf: {
    aliases: ["help", "y", "h"],
    name: "yardım",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed, prefix) => {
    message.channel.send(embed
.addField(`Moderasyon Botu Komutları;`,client.commands.filter((x) => x.conf.help).sort((a, b) => b.conf.help - a.conf.help).map((x) => `\`${prefix}${x.conf.help}\``).join("\n"))
.addField(`Stat Botu Komutları;`,`\`${prefix}me\n${prefix}top\n${prefix}user [kullanıcı]\``)

      .setDescription(`**Yönetim Botu Komutları;**
\`${prefix}invites
${prefix}topinvites
${prefix}yetkim
${prefix}kayıt [kullanıcı] [isim] [yaş]
${prefix}isimler [kullanıcı]
${prefix}tagaldır [kullanıcı]
${prefix}yetkili [kullanıcı]
${prefix}topteyit\``))
},
};
