const client = global.client;
const { Collection } = require("discord.js");
const inviterSchema = require("../schemas/inviter");
const inviteMemberSchema = require("../schemas/inviteMember");
const conf = require("../configs/config.json");
const coin = require("../schemas/coin");
const ayar = require("../configs/sunucuayar.json");
const moment = require("moment");


module.exports = async (member) => {
  let guvenilirlik = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
  let memberGün = moment(member.user.createdAt).format("DD");
  let memberTarih = moment(member.user.createdAt).format("YYYY HH:mm:ss");
  let memberAylar = moment(member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık");
  let üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
    

  const channel = member.guild.channels.cache.get(conf.invLogChannel);
  const kayitchannel = member.guild.channels.cache.get(ayar.teyitKanali);
  const kurallar = member.guild.channels.cache.get(ayar.kurallar);
  if (!channel) return;
  if (member.user.bot) return;

  const gi = client.invites.get(member.guild.id).clone() || new Collection().clone();
  const invites = await member.guild.fetchInvites();
  const invite = invites.find((x) => gi.has(x.code) && gi.get(x.code).uses < x.uses) || gi.find((x) => !invites.has(x.code)) || member.guild.vanityURLCode;
  client.invites.set(member.guild.id, invites);

  if (invite === member.guild.vanityURLCode) kayitchannel.send(`
:tada: ${member} **Sunucumuza Hoşgeldin!**\n   
Seninle beraber **${üyesayısı}** kişiyiz.\n
Kayıt olabilmek için **V. Confirmed** odalarından birine girerek <@&${ayar.teyitciRolleri}> yetkilimize teyit verebilirsin.\n
Hesabın açılış süresi ${memberGün} ${memberAylar} ${memberTarih} (${member.client.tarihHesapla(member.user.createdAt)}) Hesabın kontrol durumu ${guvenilirlik ? "Şüpheli! Kayıt olmak için yetkililere ulaşabilirsin." : "Güvenli! Kayıt olabilirsiniz." }\n
${conf.tag} tagımızı alarak bize destek olabilirsin.\n
**Seni Davet eden:** Sunucu Özel URL :tada: :tada: :tada:`);
  if (!invite.inviter) return;
  await inviteMemberSchema.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $set: { inviter: invite.inviter.id, date: Date.now() } }, { upsert: true });
  if (Date.now() - member.user.createdTimestamp <= 1000 * 60 * 60 * 24 * 7) {
    await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: invite.inviter.id }, { $inc: { total: 1, fake: 1 } }, { upsert: true });
    const inviterData = await inviterSchema.findOne({ guildID: member.guild.id, userID: invite.inviter.id });
    const total = inviterData ? inviterData.total : 0;
    kayitchannel.send(`
:tada: ${member} **Sunucumuza Hoşgeldin!**\n   
Seninle beraber **${üyesayısı}** kişiyiz.\n
Kayıt olabilmek için **V. Confirmed** odalarından birine girerek <@&${ayar.teyitciRolleri}> yetkilimize teyit verebilirsin.\n
Hesabın açılış süresi ${memberGün} ${memberAylar} ${memberTarih} (${member.client.tarihHesapla(member.user.createdAt)}) Hesabın kontrol durumu ${guvenilirlik ? "Şüpheli! Kayıt olmak için yetkililere ulaşabilirsin." : "Güvenli! Kayıt olabilirsiniz." }\n
${conf.tag} tagımızı alarak bize destek olabilirsin.\n
Seni Davet Eden : ${invite.inviter.tag}. (**${total}** davet) :tada: :tada: :tada:`);
  } else {
    await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: invite.inviter.id }, { $inc: { total: 1, regular: 1 } }, { upsert: true });
    const inviterData = await inviterSchema.findOne({ guildID: member.guild.id, userID: invite.inviter.id });
    const total = inviterData ? inviterData.total : 0;
    kayitchannel.send(`
:tada: ${member} **Sunucumuza Hoşgeldin!**\n   
Seninle beraber **${üyesayısı}** kişiyiz.\n
Kayıt olabilmek için **V. Confirmed** odalarından birine girerek <@&${ayar.teyitciRolleri}> yetkilimize teyit verebilirsin.\n
Hesabın açılış süresi ${memberGün} ${memberAylar} ${memberTarih} (${member.client.tarihHesapla(member.user.createdAt)}) Hesabın kontrol durumu ${guvenilirlik ? "Şüpheli! Kayıt olmak için yetkililere ulaşabilirsin." : "Güvenli! Kayıt olabilirsiniz." }\n
${conf.tag} tagımızı alarak bize destek olabilirsin.\n
Seni Davet Eden : ${invite.inviter.tag}. (**${total}** davet) :tada: :tada: :tada: `);
  }
  await coin.findOneAndUpdate({ guildID: member.guild.id, userID: invite.inviter.id }, { $inc: { coin: 1 } }, { upsert: true });

};

module.exports.conf = {
  name: "guildMemberAdd",
};