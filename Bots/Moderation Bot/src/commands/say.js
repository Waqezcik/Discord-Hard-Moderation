const { emojis, Discord } = require("../configs/config.json");
const conf = require("../configs/config.json");

module.exports = {
  conf: {
    aliases: ["say"],
    name: "say",
    help: "say",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {    
let Tag = conf.admins.tag 
   var TotalMember = message.guild.memberCount
          var Online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size;
          var Taglı = message.guild.members.cache.filter(u => u.user.username.includes(Tag)).size;
          var Voice = message.guild.members.cache.filter(s => s.voice.channel).size;
          message.channel.send(embed
              .setColor('RANDOM')
              .setDescription(`
\`•\` Sunucumuzda toplam **${TotalMember}** kullanıcı bulunmaktadır.
\`•\` Aktif **${Online}** kullanıcı bulunmaktadır.
\`•\` Tagımızı alan **${Taglı}** kullanıcı bulunmaktadır.
\`•\` Ses Kanallarında **${Voice}** kullanıcı bulunmaktadır.`)
)

  },
};
