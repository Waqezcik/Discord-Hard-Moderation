const snipe = require("../schemas/snipe");
const conf = require("../configs/config.json");
const moment = require("moment");
require("moment-duration-format");
const { MessageEmbed } = require("discord.js");

module.exports = {
  conf: {
    aliases: [],
    name: "snipe",
    help: "snipe [miktar]",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
    if(!conf.penals.chatMute.staffs.some(x => message.member.roles.cache.has(x)) && !message.member.roles.cache.has(conf.admins.sahipRolu)) return
    const data = await snipe.findOne({ guildID: message.guild.id, channelID: message.channel.id });
    if (!data) return message.channel.error(message, "Bu kanalda silinmiş bir mesaj bulunmuyor!");
    const author = await client.fetchUser(data.author);
    embed.setDescription(`${data.messageContent ? `\n\`Mesaj içeriği:\` ${data.messageContent}` : ""}
\`Mesajın yazılma tarihi:\` ${moment.duration(Date.now() - data.createdDate).format("D [gün], H [saat], m [dakika], s [saniye]")} önce
\`Mesajın silinme tarihi:\` ${moment.duration(Date.now() - data.deletedDate).format("D [gün], H [saat], m [dakika], s [saniye]")} önce
    `);
    if (author) embed.setAuthor(author.tag, author.avatarURL({ dynamic: true, size: 2048 }));
    if (data.image) embed.setImage(data.image);
    message.channel.send(embed);
  },
};
