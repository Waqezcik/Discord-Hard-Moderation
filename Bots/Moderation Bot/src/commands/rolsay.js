const { emojis, Discord } = require("../configs/config.json");
const conf = require("../configs/config.json");

module.exports = {
  conf: {
    aliases: ["rolsay"],
    name: "rs",
    help: "rolsay",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {    
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Yetkin yok dostum.`); 
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(x => x.name.match(new RegExp(args.join(' '), 'gi')));
    if (!args[0] || !role || role.id === message.guild.id) return message.channel.send('Hata: Belirtilen rol bulunamadı yada rol numarası geçersiz!');
    message.channel.send(`Rol: ${role.name} | ${role.id} (${role.members.size < 1 ? 'Bu rolde hiç üye yok!' : role.members.size})`, { code: 'xl' });
    message.channel.send(`${message.guild.roles.cache.get(role).members.size}`);
   
  },
};
