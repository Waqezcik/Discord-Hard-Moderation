const { Client, Collection, Discord } = require("discord.js");
const db = require("quick.db");
const client = (global.client = new Client({ fetchAllMembers: true }));
const settings = require("./src/configs/settings.json");
client.commands = new Collection();
client.aliases = new Collection();
client.cooldown = new Map();
require("./src/handlers/commandHandler");
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);
const Levels = require("discord-xp");
Levels.setURL(settings.mongoUrl);
const logs = require('discord-logs');
logs(client);
client
  .login(settings.token)
  .then(() => console.log("[BOT] Bot connected!"))
  .catch(() => console.log("[BOT] Bot can't connected!"));

//TAG ROL KISMI
const tag = ayar.admins.tag
const ikinciTag = ayar.admins.ikinciTag
const sunucu = ayar.guildID
const ekipLogKanali = ayar.admins.ekipLogKanali
const chat = ayar.admins.chatKanal
const ekipRolu = ayar.admins.ekipRolu
const teyitsizRolleri = ayar.registration.unregRoles
const jailRolu = ayar.jail.roles
const guild = client.guilds.cache.get(ayar.guildID);


let user = guild.members.cache.get(oldUser.id);
if(newUser.username.includes(tag) && !user.roles.cache.has(ekipRolu)){
  if ((teyitsizRolleri && teyitsizRolleri.some(rol => user.roles.cache.has(rol))) || (jailRolu && user.roles.cache.has(jailRolu))) return;
  if(user.manageable && ikinciTag) user.setNickname(user.displayName.replace(ikinciTag, tag)).catch();
  if(ekipRolu) user.roles.add(ekipRolu).catch();
  ekipLogKanali.send(`${user} kişisi ismine \`${tag}\` sembolünü alarak ekibimize katıldı!`).catch();
  chat.send(`${user} ${tag} tagımızı alarak ailemize katıldı. Hoşgeldin dostum!`).then(x=> x.delete({timeout: 5000})).catch();
  if(chat && chatlog) chatlog
} else if(!newUser.username.includes(tag) && user.roles.cache.has(ekipRolu)){
  if(user.manageable && ikinciTag) user.setNickname(user.displayName.replace(tag, ikinciTag)).catch();
  if(ekipRolu){
    let ekipRol = guild.roles.cache.get(ekipRolu);
    user.roles.remove(user.roles.cache.filter(rol => ekipRol.position <= rol.position)).catch();
  }
 ekipLogKanali.send(`${user} kişisi isminden \`${tag}\` sembolünü çıkararak ekibimizden ayrıldı!`).catch();
 if(ayar.taglıalım) {
  if(user.voice.channel) user.voice.kick()
  user.setNickname(`${ikinciTag} İsim | Yaş`)
  user.roles.set([ayar.registration.unregRoles]) 
}
}



    //TAG KONTROL
    setInterval(() => {
      const server = client.guilds.cache.get(ayar.guildID); //Server ID 
      server.members.cache.forEach(async member => {
   if (!member.user.username.includes(ayar.admins.tag)) {
              await member.roles.remove(ayar.admins.ekipRolu).catch(() => {})

          }
      })
  }, 60 * 1000)


  client.guilds.cache.get(ayar.guildID).members.cache.filter(uye => uye.user.username.includes(ayar.admins.tag) && !uye.roles.cache.has(ayar.admins.boosterRolu) && (!uye.roles.cache.has(ayar.admins.ekipRolu) || !uye.displayName.startsWith(ayar.admins.tag))).array().forEach((uye, index) => {
    setTimeout(() => {
      uye.setNickname(uye.displayName.replace(ayar.ikinciTag, ayar.tag));
      if (ayar.ekipRolu) uye.roles.add(ayar.ekipRolu);
    }, index*30000);
  });

//GuildMemberAdd Fonksiyonu
const ayarlar = require("./src/configs/config.json")
client.on("guildMemberAdd", async(member) => {
let guvenilirlik = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
if (guvenilirlik) {
if(ayarlar.admins.fakeHesapRolu) member.roles.set([ayarlar.admins.fakeHesapRolu]).catch();
} else if(ayarlar.registration.unregRoles) member.roles.add(ayarlar.registration.unregRoles).catch();
if (member.user.username.includes(ayarlar.admins.tag)) { member.setNickname(`${ayarlar.admins.tag} İsim | Yaş`).catch(); }
else { member.setNickname(`${ayarlar.admins.ikinciTag} İsim | Yaş`).catch();}
})

client.on("guildMemberAdd", async (member) => {
const tag = ayar.admins.tag
const kanal = ayar.admins.ekipLogKanali
const rol = ayar.admins.ekipRolu
  if (member.user.username.includes(tag)) {
    member.roles.add(rol)
    client.channels.cache.get(kanal).send(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, isminde ${tag} sembolü bulunuyor.`)
}})


client.on("guildMemberAdd", async(member) => {
member.roles.add(ayar.registration.unregRoles)
})


//İltifat sistemi


const aiasq = [
  "Yaşanılacak en güzel mevsim sensin.",
  "Sıradanlaşmış her şeyi, ne çok güzelleştiriyorsun.",
  "Gönlüm bir şehir ise o şehrin tüm sokakları sana çıkar.",
  "Birilerinin benim için ettiğinin en büyük kanıtı seninle karşılaşmam.",
  "Denize kıyısı olan şehrin huzuru birikmiş yüzüne.",
  "Ben çoktan şairdim ama senin gibi şiiri ilk defa dinliyorum.",
  "Gece yatağa yattığımda aklımda kalan tek gerçek şey sen oluyorsun.",
  "Ne tatlısın sen öyle. Akşam gel de iki bira içelim.",
  "Bir gamzen var sanki cennette bir çukur.",
  "Gecemi aydınlatan yıldızımsın.",
  "Ponçik burnundan ısırırım seni",
  "Bu dünyanın 8. harikası olma ihtimalin?",
  "fıstık naber?",
  "Mutluluk ne diye sorsalar cevabı gülüşünde ve o sıcak bakışında arardım.",
  "Hayatım ne kadar saçma olursa olsun, tüm hayallerimi destekleyecek bir kişi var. O da sensin, mükemmel insan.",
  "Bir adada mahsur kalmak isteyeceğim kişiler listemde en üst sırada sen varsın.",
  "Sesini duymaktan hikayelerini dinlemekten asla bıkmayacağım. Konuşmaktan en çok zevk aldığım kişi sensin.",
  "Üzerinde pijama olsa bile, nasıl oluyor da her zaman bu kadar güzel görünüyorsun? Merhaba, neden bu kadar güzel olduğunu bilmek istiyorum.",
  "Çok yorulmuş olmalısın. Bütün gün aklımda dolaşıp durdun.",
  "Çocukluk yapsan da gönlüme senin için salıncak mı kursam?",
  "Sen birazcık huzur aradığımda gitmekten en çok hoşlandığım yersin.",
  "Hangi çiçek anlatır güzelliğini? Hangi mevsime sığar senin adın. Hiçbir şey yeterli değil senin güzelliğine erişmeye. Sen eşsizsin...",
  "Rotanızı geçen her geminin ışığıyla değil, yıldızlara göre ayarlayın.",
  "Telaşımı hoş gör, ıslandığım ilk yağmursun.",
  "Gülüşün ne güzel öyle cumhuriyetin gelişi gibi...",
  "Aias diyor ki; bir gece tek beden olmaya ne dersin?",
  "Aias seni bekliyor ;)",
  "Aias sana aşık olmuş haberin olsun ;)",
  "Aias seni priv odada bekliyor :*"
];

client.on("message", async message => {
  if(message.channel.id !== ayarlar.admins.chatKanal) return;
  let Aiasdev = db.get('chatiltifat');
  await db.add("chatiltifat", 1);
  if(Aiasdev >= 50) {  
    db.delete("chatiltifat");
    const random = Math.floor(Math.random() * ((aiasq ).length - 1) + 1);
    message.reply(`${(aiasq )[random]}`);
  };
});

//YASAKLI TAG
/*client.on("guildMemberAdd", member => {
  let birinciYasakli = "⚚";  // YASAKLANICAK TAG 1 
  let ikinciYasakli = "∞"; // YASAKLANICAK TAG 2
  let yasakliRol = "831971942356615218";  //CEZALI ROL
  let kayitsizRol = '831971922228805633';  // KAYITSIZ ROL
  let logKanali = "833026703169159208";  // YASAKLI TAG LOG
  
  
  if(member.user.username.includes(birinciYasakli) && (member.user.username.includes(ikinciYasakli))) {
  member.roles.set([yasakliRol])
  member.roles.remove(kayitsizRol)
     client.channels.cache.get(logKanali).send(`<@${member.id}> sunucumuzun yasaklı taglarından birisinde bulunduğu için yasaklı tag rolü verildi.`)
  }
  })


    //YASAKLI TAG KONTROL
    setInterval(() => {
      const server = client.guilds.cache.get("728391978278191126"); //Server ID 
      server.members.cache.forEach(async member => {
   if (member.user.username.includes("∞")) {
              await member.roles.set(["831971942356615218"]).catch(() => {})

         }
      })
  }, 60 * 1000)

*/
//Giriş çıkış log
client.on("guildMemberAdd", (member, message) => {
  let üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
 if(ayar.logs.entriesLog && client.channels.cache.has(ayar.logs.sentriesLog)) client.channels.cache.get(ayar.logs.entriesLog).send(`:inbox_tray: ${member.user.tag} (\`${member.id}\`) katıldı. \`${üyesayısı}\` olduk.`)
})
client.on("guildMemberRemove", (member, message) => {
  let üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
 if(ayar.logs.entriesLog && client.channels.cache.has(ayar.logs.entriesLog)) client.channels.cache.get(ayar.logs.entriesLog).send(`:outbox_tray: ${member.user.tag} (\`${member.id}\`) aramızdan ayrıldı. \`${üyesayısı}\` olduk.`)
})

//Rol verme alma log 
client.on("guildMemberRoleAdd", (member, role) => {
  if(ayar.logs.rolLog && client.channels.cache.has(ayar.logs.rolLog)) client.channels.cache.get(ayar.logs.rolLog).send(`${member.user.tag} (\`${member.id}\`) kullanıcısına \`${role.name}\` rolü eklendi.`);
 });
 client.on("guildMemberRoleRemove", (member, role) => {
  if(ayar.logs.rolLog && client.channels.cache.has(ayar.logs.rolLog)) client.channels.cache.get(ayar.logs.rolLog).send(`${member.user.tag} (\`${member.id}\`) kullanıcısından \`${role.name}\` rolü kaldırıldı.`);
 });

//NİCKNAME LOG
client.on("guildMemberNicknameUpdate", (member, oldNickname, newNickname) => {
  if(ayar.logs.nicknameLog && client.channels.cache.has(ayar.logs.nicknameLog)) client.channels.cache.get(ayar.logs.nicknameLog).send(`
  ${member.user.tag} \`${member.user.id}\` kullanıcısının sunucu içi ismi değişti => \` ${oldNickname} > ${newNickname} \``);
  });

/// TAG
client.on('message', message => {
    const tag = message.content.toLowerCase()
    if (tag === '.tag' || tag === '!tag' || tag === 'tag') {
        message.channel.send(`${ayar.admins.tag}`);
    }
})


//Ses Hesaplama 

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


client.on("voiceStateUpdate",(oldMember, newMember) => {

if(newMember.channelID != null) {
db.set(`voiceTime_${oldMember.id}_${oldMember.guild.id}`, new Date());
}

if(newMember.channelID == null) {
db.delete(`voiceTime_${oldMember.id}_${oldMember.guild.id}`)
}

 if (oldMember.channelID  != newMember.channelID  ) {
db.delete(`voiceTime_${oldMember.id}_${oldMember.guild.id}`)
db.set(`voiceTime_${oldMember.id}_${oldMember.guild.id}`, new Date());
}
})

client.on("ready", async () => { 
  let botVoiceChannel = client.channels.cache.get(settings.botSes); 
  if (botVoiceChannel) 
  botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
  });  
  client.on("ready", async () => {
  client.user.setPresence({ activity: { name: settings.botDurum}, status: "online" });
  })





  //Küfür engel
  client.on('message', msg => {

           const kufurler = ["oç","aq", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq",];
           let kelimeler = msg.content.split(' ');
           kelimeler.forEach(kelime=> {
            if(kufurler.some(küfür => küfür === kelime))  {
             try {   
               if (!msg.member.hasPermission("ADMINISTRATOR")) {
                     msg.delete();
                             
                         return msg.reply('Bu Sunucuda Küfür Filtresi Aktiftir.').then(x=>x.delete({timeout: 5000}));
             }              
             } catch(err) {
               console.log(err);
             }
           }
       })
      })
   client.on("messageUpdate", (oldMessage, newMessage) => {
     
     
  
           const kufurler = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq",];
           let kelimeler = newMessage.content.split(' ');
           kelimeler.forEach(kelime=> {
            if(kufurler.some(küfür => küfür === kelime))  {
             try {   
               if (!msg.member.hasPermission("ADMINISTRATOR")) {
                     msg.delete();
                             
                         return msg.reply('Bu Sunucuda Küfür Filtresi Aktiftir.').then(msg => msg.delete(3000));
             }              
             } catch(err) {
               console.log(err);
             }
           }
       })
   })

   client.on("message", msg => {
           const reklam = [".com", ".tk", ".xyz", ".pw", ".io", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz",".rf.gd", ".az", ".party", "discord.gg",];
           if (reklam.some(word => msg.content.includes(word))) {
             try {
               if (!msg.member.hasPermission("ADMINISTRATOR")) {
                     msg.delete();
                       return msg.reply('**Reklam yapman yasak lütfen reklam yapmamaya dikkat et !**').then(x => x.delete({timeout: 5000}));
    
               }              
             } catch(err) {
               console.log(err);
             }
           }
       });
  

 //ROL LOG
 const RoleDatabase = require("./src/schemas/rolveridb")
 var moment = require('moment-timezone');
 moment().tz("Europe/Istanbul").format('LL');
 
 client.on("guildMemberUpdate", async(oldMember, newMember) =>{
  let aldiverdi;
  if(oldMember.roles.cache.size < newMember.roles.cache.size){ aldiverdi = "✅ **Rol Verildi.**" } else { aldiverdi = "❌ **Rol Alındı.**"}
  if(oldMember.roles.cache.size !== newMember.roles.cache.size) {
  let rolveren = await oldMember.guild.fetchAuditLogs({ type: 'GUILD_MEMBER_UPDATE' }).then(audit => audit.entries.first());
  let role = oldMember.roles.cache.find(s => !newMember.roles.cache.has(s.id)) || newMember.roles.cache.find(s => !oldMember.roles.cache.has(s.id))
  let aias = await RoleDatabase.findOne({ guildID: newMember.guild.id, kullanıcıID: newMember.id }) 
  if(!aias){
    let newRoleData = new RoleDatabase({
      guildID: newMember.guild.id,
      kullanıcıID: newMember.id,
      rolveridb: { staffID: rolveren.executor.id, tarih: Date.now(), rolid: role.id, type: aldiverdi }
    }).save(); } else {
      aias.rolveridb.push({ staffID: rolveren.executor.id, tarih: Date.now(), rolid: role.id, type: aldiverdi })
      aias.save()
    }
}
  })
  Date.prototype.toTurkishFormatDate = function () {
    return moment.tz(this, "Europe/Istanbul").format('LL');
  };