const { Client, Collection } = require("discord.js");
const client = (global.client = new Client());
const settings = require("./src/configs/settings.json");
const ayar = require("./src/configs/sunucuayar.json");
const db = require("quick.db");
const ms = require("parse-ms");
client.commands = new Collection();
client.aliases = new Collection();
client.invites = new Collection();
client.cooldown = new Map();
client.ranks = [
 {role: "2.yetki", coin: 2000},
 {role: "3.yetki", coin: 3000}

]
require("./src/handlers/commandHandler");
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");

client
  .login(settings.token)
  .then(() => console.log("[BOT] Bot connected!"))
  .catch(() => console.log("[BOT] Bot can't connected!"));

//GİR ÇIK YAPINCA OTO KAYIT//
/*client.on("guildMemberRemove", async member => {
  db.set(`roles.${member.id}`, member.roles.cache.map(x => x.id))
  db.set(`isim.${member.id}`, member.displayName) 
    });

client.on("guildMemberAdd", async member => {
let rol = await db.get(`roles.${member.id}`);
let nick = await db.get(`isim.${member.id}`)

member.roles.set(rol).catch(e => { });
member.setNickname(nick)
db.delete(`eskirolleri.${member.id}`);
db.delete(`isim.${member.id}`);
})*/
//GİR ÇIK YAPINCA OTO KAYIT//


//TARİH HESAPLAMA GİRİŞ MESAJI//
Date.prototype.toTurkishFormatDate = function (format) {
  let date = this,
    day = date.getDate(),
    weekDay = date.getDay(),
    month = date.getMonth(),
    year = date.getFullYear(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();

  let monthNames = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
  let dayNames = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");

  if (!format) {
    format = "dd MM yyyy | hh:ii:ss";
  };
  format = format.replace("mm", month.toString().padStart(2, "0"));
  format = format.replace("MM", monthNames[month]);
  
  if (format.indexOf("yyyy") > -1) {
    format = format.replace("yyyy", year.toString());
  } else if (format.indexOf("yy") > -1) {
    format = format.replace("yy", year.toString().substr(2, 2));
  };
  
  format = format.replace("dd", day.toString().padStart(2, "0"));
  format = format.replace("DD", dayNames[weekDay]);

  if (format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
  if (format.indexOf("hh") > -1) {
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;
    format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
  };
  if (format.indexOf("ii") > -1) format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
  if (format.indexOf("ss") > -1) format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
  return format;
};

client.tarihHesapla = (date) => {
  const startedAt = Date.parse(date);
  var msecs = Math.abs(new Date() - startedAt);

  const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
  msecs -= years * 1000 * 60 * 60 * 24 * 365;
  const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
  msecs -= months * 1000 * 60 * 60 * 24 * 30;
  const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
  msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
  const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
  msecs -= days * 1000 * 60 * 60 * 24;
  const hours = Math.floor(msecs / (1000 * 60 * 60));
  msecs -= hours * 1000 * 60 * 60;
  const mins = Math.floor((msecs / (1000 * 60)));
  msecs -= mins * 1000 * 60;
  const secs = Math.floor(msecs / 1000);
  msecs -= secs * 1000;

  var string = "";
  if (years > 0) string += `${years} yıl ${months} ay`
  else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
  else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
  else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
  else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
  else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
  else if (secs > 0) string += `${secs} saniye`
  else string += `saniyeler`;

  string = string.trim();
  return `\`${string} önce\``;
};

client.wait = async function(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
//TARİH HESAPLAMA GİRİŞ MESAJI//


client.on("ready", async () => { 
  let botVoiceChannel = client.channels.cache.get(settings.botSes); 
  if (botVoiceChannel) 
  botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
  });  
  client.on("ready", async () => {
  client.user.setPresence({ activity: { name: settings.botDurum}, status: "online" });
  })