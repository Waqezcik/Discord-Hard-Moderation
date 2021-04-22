



const RoleDatabase = require("../schemas/rolveridb");
const moment = require("moment")

module.exports = {
    conf: {
      aliases: ["rollog"],
      name: "rollog",
      help: "rollog",
    },
  
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { Array<String> } args
     */
  
    run: async (client, message, args, embed) => {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) return message.channel.send(embed.setDescription(`**Lütfen Geçerli Bir Kullanıcı veya KullanıcıID Giriniz.**`))
        let aias = await RoleDatabase.findOne({ guildID: message.guild.id, kullanıcıID: member.id })
        if(!aias) message.channel.send(embed.setDescription(`Kullanıcının VeriDBsi Bulunamadı`))
        let listening = aias.rolveridb.map((v, i) => ` ${v.type}   **Rol**: ${message.guild.roles.cache.get(v.rolid)}   **Yetkili:** ${message.guild.members.cache.get(v.staffID)}   **Tarih:** \`${new Date(v.tarih).toTurkishFormatDate()}\` ` || "\`Veri Yok\`").join("\n\n")
      
        message.channel.send(embed.setDescription(`${member} kişisinin toplamda **${aias.rolveridb.length ? aias.rolveridb.length : "0" }** rol bilgisi bulunmaktadır. Gerekli Bilgiler Aşşağıda Verilmiştir. \n\n${listening}`))
      
    },
  };
  





