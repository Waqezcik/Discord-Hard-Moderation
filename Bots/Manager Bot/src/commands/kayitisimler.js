const coin = require("../schemas/coin");
const conf = require("../configs/config.json");
const ayar = require("../configs/sunucuayar.json");
const toplams = require("../schemas/toplams");
const Ayarlar = require("../configs/sunucuayar.json");
const qdb = require("quick.db");
const db = new qdb.table("ayarlar");
const pdb = require("quick.db")
const kdb = new qdb.table("kullanici");
const idb = new qdb.table("kullanicicinsiyet");
const tepkiler = [
    Ayarlar.erkekTepkiId,
    Ayarlar.kadinTepkiId,
];

module.exports = {
  conf: {
    aliases: [],
    name: "isimler",
    help: "isimler [kullanıcı]"
  },
  run: async (client, message, args, embed, prefix) => { 

  if((!ayar.erkekRolleri && !ayar.kizRolleri) || !ayar.teyitciRolleri) return message.channel.send("Rol bulunamadı veya rol bilgileri girilemedi.").then(sil => sil.delete({timeout: 5000}));
  if(!ayar.teyitciRolleri.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Hata: Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin.`).then(sil => sil.delete({timeout: 5000}));
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!uye) return message.channel.send(`Hata: Lütfen bir üye etiketleyin veya Id giriniz!  __Örn:__  \`isimsorgu @Aias/ID\``).then(sil => sil.delete({timeout: 5000}));
  let isimsorgu = kdb.get(`k.${uye.id}.isimler`) || [];
 let Liste = isimsorgu.length || `0`;
isimsorgu = isimsorgu.reverse();
let IsimGecmisi;
IsimGecmisi = isimsorgu.length > 0 ? isimsorgu.map((value, index) => `\`${value.Isim}\``).join("\n") : "Üyenin herhangi bir kayıtı bulunamadı.";
  message.channel.send(embed.setDescription(`\n**Bu Kullanıcının Geçmiş İsimleri [${Liste}]**\n${IsimGecmisi}`));
  }
}