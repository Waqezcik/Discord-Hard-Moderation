const afk = require("../schemas/afk");
const ayarlar = require("../configs/config.json");

module.exports = {
    conf: {
      aliases: ["isim","i"],
      name: "isim",
      help: "isim [üye] isim yaş",
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
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;
    if(!isim || !yaş) return message.channel.send(`Hata: Lütfen tüm argümanları doldurunuz!  __Örn:__  \`isim @Aias/ID isim yaş\``).then(sil => sil.delete({timeout: 5000}));
    if(message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(`Kendinden yüksek yetkide birisinin ismini değiştirmezsin.`).then(x=> x.delete({timeout :5000}))
    uye.setNickname(`${uye.user.username.includes(ayarlar.admins.tag) ? ayarlar.admins.tag : (ayarlar.admins.ikinciTag ? ayarlar.admins.ikinciTag : (ayarlar.admins.tag || ""))} ${isim} | ${yaş}`)
    message.channel.send(`${uye} kullanıcısının adı başarıyla \`${isim} ${yaş}\` olarak değiştirildi!`).then(x=> x.delete({timeout: 5000}));
    },
  };