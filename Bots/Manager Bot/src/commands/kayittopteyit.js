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
    name: "topteyit",
    help: "topteyit"
  },
  run: async (client, message, args, embed, prefix) => { 
    let data = await kdb.get("teyit") || {};
    let arr = Object.keys(data);
    let listedMembers = arr.filter(dat => message.guild.members.cache.has(dat)).sort((a,b) => Number((data[b].erkek || 0) + (data[b].kiz || 0)) - Number((data[a].erkek || 0) + (data[a].kiz || 0))).map((value, index) => `\`${index + 1}.\` ${message.guild.members.cache.get(value)} | \`${((data[value].erkek || 0) + (data[value].kiz || 0))}\` | Erkek : \`${((data[value].erkek || 0))}\` | Kadın : \`${((data[value].kiz || 0))}\` `).splice(0, 30);
    message.channel.send(embed.setDescription(`**Top Teyit Listesi**\n\n${listedMembers.join("\n") || "Teyit verisi bulunamadı!"}`)).catch();
  }
}