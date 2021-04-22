const { emojis, Discord, MessageEmbed } = require("discord.js");
const conf = require("../configs/config.json");

module.exports = {
  conf: {
    aliases: ["rolsuz"],
    name: "rolsuz",
    help: "rolsuz",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {    
    if(!message.member.hasPermission("ADMINISTRATOR"))
    return;
    
    
    let aiasrol = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)
    
    if(args[0] == "ver") {
        aiasrol.forEach(r => {
    r.roles.add(`831971922228805633`)
    })
    message.channel.send(embed
    .setColor("RANDOM")
    .setDescription("Sunucuda rolü olmayan \`"+ aiasrol.size +"\` kişiye kayıtsız rolü verildi!")
        )    } else if(!args[0]) {
    message.channel.send(embed
    .setColor("RANDOM")
    .setDescription("Sunucumuzda rolü olmayan \`"+ aiasrol.size +"\` kişi var. Bu kişilere kayıtsız rolü vermek için \`.rolsuz ver\` komutunu uygulayın!")
      )  }
}
};
