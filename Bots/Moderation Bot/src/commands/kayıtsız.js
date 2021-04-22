const afk = require("../schemas/afk");
const ayarlar = require("../configs/config.json");

module.exports = {
    conf: {
      aliases: ["ks","kayitsiz"],
      name: "kayıtsız",
      help: "kayıtsız [üye]",
    },
  
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { Array<String> } args
     */
  
    run: async (client, message, args, embed) => {
    if (!message.member.hasPermission("BAN_MEMBERS") && !ayarlar.warn.staffs.some(x => message.member.roles.cache.has(x))) return message.channel.send(embed.setDescription("Yeterli yetkin bulunmuyor!"));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!uye) return message.channel.send(`Bir üye etiketlemeyi unuttun.`).then(x => x.delete({timeout: 5000}))
    if(message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(`Kendinden yüksek yetkide birisini kayıtsıza atamazsın.`).then(x=> x.delete({timeout :5000}))
    uye.setNickname(`${uye.user.username.includes(ayarlar.admins.tag) ? ayarlar.admins.tag : (ayarlar.admins.ikinciTag ? ayarlar.admins.ikinciTag : (ayarlar.admins.tag || ""))} İsim | Yaş`)
    uye.roles.set(ayarlar.registration.unregRoles)
    if(uye.voice.channel) uye.voice.kick()
    message.channel.send(`${uye} kullanıcısı başarıyla kayıtsıza atıldı.`).then(x=> x.delete({timeout: 5000}));
    },
  };