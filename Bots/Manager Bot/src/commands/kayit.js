const coin = require("../schemas/coin");
const conf = require("../configs/config.json");
const ayar = require("../configs/sunucuayar.json");
const toplams = require("../schemas/toplams");
const Ayarlar = require("../configs/sunucuayar.json");
const qdb = require("quick.db");
const kdb = new qdb.table("kullanici");
const idb = new qdb.table("kullanicicinsiyet");
const ayarlar = require("../configs/config.json");

module.exports = {
  conf: {
    aliases: ["i","isim"],
    name: "isim",
    help: "isim [kullanıcı] [isim] [yaş]"
  },

  run: async (client, message, args, embed, prefix) => { 
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!Ayarlar.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !Ayarlar.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Malesef yetkin bulunmamakta dostum.`).then(x=> x.delete({timeout: 5000}))
    if(!uye) return message.channel.send(`Hata yaptın!\`${prefix}isim <@Aias/ID> <Isim> <Yaş>\``);
    if(message.author.id === uye.id) return message.channel.send(`Kendini kayıt edemezsin dostum.`).then(x => x.delete({timeout: 5000}));
    if(!uye.manageable) return message.channel.send(`Böyle birisini kayıt edemiyorum.`).then(x => x.delete({timeout: 5000}));
    if(message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(`Senden yüksekte olan birisini kayıt edemezsin.`).then(x => x.delete({timeout: 5000}));
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let setName;
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;
    if(!isim || !yaş) return message.channel.send(`Hata yaptın! \`${prefix}isim <@Aias/ID> <Isim> <Yaş>\``);
    setName = `${uye.user.username.includes(Ayarlar.tag) ? Ayarlar.tag : (Ayarlar.ikinciTag ? Ayarlar.ikinciTag : (Ayarlar.tag || ""))} ${isim} | ${yaş}`;
    uye.setNickname(`${setName}`).catch(err => message.channel.send(`İsim çok uzun.`)).then(x=> x.delete({timeout: 5000}))
    var filter = msj => msj.author.id === message.author.id && msj.author.id !== client.user.id;
    let isimdata = kdb.get(`k.${uye.id}.isimler`) || [];
    let isimler = isimdata.length > 0 ? isimdata.map((value, index) => `\`${value.Isim}\``).join("\n") : "Sistem de isim kaydı bulunamadı!";    
	let mesaj = await message.channel.send(embed
    .addField(`Bu Kullanıcının Geçmiş İsimleri [${isimdata.length}]` || `0`, isimler, true)
    .setDescription(`${uye} kişisinin ismi başarıyla "${isim} | ${yaş}" olarak değiştirildi, bu üye daha önce bu isimlerle kayıt olmuş. [${isimdata.length}]`)
    ).then(x => message.react(`✅`))
    if(uye.roles.cache.has(Ayarlar.erkekRolleri) || uye.roles.cache.has(Ayarlar.kizRolleri)) { 
    message.channel.send(`Üye zaten kayıtlı olduğu için ismini değiştirdim.`).then(x=>x.delete({timeout: 5000}));
    };
        if(uye.roles.cache.has(Ayarlar.erkekRolleri) || uye.roles.cache.has(Ayarlar.kizRolleri)) return;
        message.channel.awaitMessages(filter, { max: 1, time: 10000 }).then(async collected => {
            if(conf.taglıalım != false && !uye.user.username.includes(Ayarlar.tag) && !uye.roles.cache.has(Ayarlar.boosterRolu) && !uye.roles.cache.has(Ayarlar.vipRolu) && !message.member.hasPermission('ADMINISTRATOR') && !Ayarlar.sahipRolu.some(oku => message.member.roles.cache.has(oku))) return message.channel.send(`Şuanda taglı alımdayız. Üye tagımızı almadığı için işlemi tamamlanmadı. Tagımızı alarak kayıt olabilirsiniz. \`${Ayarlar.tag}\`   `).then(x => x.delete({timeout: 5000}));
            if(collected.first().content.toLowerCase() === `${prefix}kadın` || collected.first().content.toLowerCase() === `${prefix}k`) {

              message.channel.send(`Başarılı! ${uye}, kullanıcısı başarıyla **Kadın** olarak kayıt edildi!`).then(x => x.delete({timeout: 5000}));
              await uye.roles.add(ayar.kizRolleri)
              await uye.roles.remove(ayar.Unregister)
              kdb.add(`teyit.${message.author.id}.toplam`, 1); 
              kdb.add(`teyit.${message.author.id}.kiz`, 1);
              idb.push(`veri.${uye.id}.cinsiyet`, `kadin`);
            }
            if(collected.first().content.toLowerCase() === `${prefix}erkek` || collected.first().content.toLowerCase() === `${prefix}e`) { 

              message.channel.send(`Başarılı! ${uye}, kullanıcısı başarıyla **Erkek** olarak kayıt edildi!`).then(x => x.delete({timeout: 5000}));
              await uye.roles.add(ayar.erkekRolleri)
              await uye.roles.remove(ayar.Unregister)
              kdb.add(`teyit.${message.author.id}.toplam`, 1); 
              kdb.add(`teyit.${message.author.id}.erkek`, 1);
              idb.push(`veri.${uye.id}.cinsiyet`, `erkek`);
            }}).catch()
kdb.push(`k.${uye.id}.isimler`, {
Isim: yazilacakIsim,
Yetkili: message.author.id,
Zaman: Date.now()
});
kdb.push(`k.${uye.id}.isimler`, {
Isim: yazilacakIsim,
Yetkili: message.author.id,
Zaman: Date.now()
});
}      
};
if(ayar.chatKanali && client.channels.cache.has(ayar.chatKanali)) client.channels.cache.get(ayar.chatKanali).send(`Aramıza hoşgeldin **${uye}**! Kuralları okumayı unutma!`).then(x => x.delete({timeout: 10000})) 
await coin.findOneAndUpdate({ guildID: uye.guild.id, userID: message.author.id }, { $inc: { coin: conf.toplamsCoin } }, { upsert: true });
await toplams.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { toplams: uye.user.id } }, { upsert: true });


