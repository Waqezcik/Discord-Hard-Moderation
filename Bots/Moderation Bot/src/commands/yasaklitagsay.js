const { emojis, Discord } = require("../configs/config.json");
const conf = require("../configs/config.json");

module.exports = {
  conf: {
    aliases: ["yasaklisay","yasaklitaglar","yasaklitag","yasaklitagsay"],
    name: "yasaklitaglar",
    help: "yasaklitaglar",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {    
let ikinciYasakli = 'yasaklıtagid'
var Taglı2 = message.guild.members.cache.filter(u => u.user.username.includes(ikinciYasakli)).size;
message.channel.send(embed
              .setColor('BLACK')
              .setFooter(`Aias ❤️ SEX`)
              .setTimestamp()
              .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
              .setDescription(`
\`${message.guild.name}\` adlı sunucumuzun yasaklı listesi ;

\`1.\` ∞ (\`${Taglı2} kişi\`) `)
)

  },
};
