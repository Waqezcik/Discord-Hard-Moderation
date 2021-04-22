const Discord = require("discord.js");
const conf = require("../configs/config.json");
const settings = require("../configs/settings.json");

module.exports = {
  conf: {
    aliases: [],
    name: "ekipsay",
    owner: true
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */
  
  run: async (client, message, args) => {
let Ekip = "ekiprol1" // Ekip Rol ID
let Ekip2 = "ekiprol2" // Ekip2 Rol ID
let Ekip3 = "ekiprol3" // Ekip3 Rol ID
let EkipTotal = message.guild.roles.cache.get(Ekip).members.size; 
let EkipOnline = message.guild.members.cache.filter(u => u.roles.cache.get(Ekip)).filter(u => u.presence.status !== "offline").size;
let EkipVoice = message.guild.members.cache.filter(u => u.roles.cache.get(Ekip)).filter(s => s.voice.channel).size;

let EkipTotal2 = message.guild.roles.cache.get(Ekip2).members.size; 
let EkipOnline2 = message.guild.members.cache.filter(u => u.roles.cache.get(Ekip2)).filter(u => u.presence.status !== "offline").size;
let EkipVoice2 = message.guild.members.cache.filter(u => u.roles.cache.get(Ekip2)).filter(s => s.voice.channel).size;

let EkipTotal3 = message.guild.roles.cache.get(Ekip3).members.size; 
let EkipOnline3 = message.guild.members.cache.filter(u => u.roles.cache.get(Ekip3)).filter(u => u.presence.status !== "offline").size;
let EkipVoice3 = message.guild.members.cache.filter(u => u.roles.cache.get(Ekip3)).filter(s => s.voice.channel).size;

          const aiasembed = new Discord.MessageEmbed()
          .setFooter(`Aias Morks`)
              .setColor('#2F3136')

              .setDescription(`
<@&${Ekip}> **Bilgilendirme;**
▫️ Toplam üye sayısı; \`${EkipTotal}\`
▫️ Çevrimiçi üye sayısı; \`${EkipOnline}\`
▫️ Sesteki üye sayısı; \`${EkipVoice}\`

<@&${Ekip2}> **Bilgilendirme;**
▫️ Toplam üye sayısı; \`${EkipTotal2}\`
▫️ Çevrimiçi üye sayısı; \`${EkipOnline2}\`
▫️ Sesteki üye sayısı; \`${EkipVoice2}\`

<@&${Ekip3}> **Bilgilendirme;**
▫️ Toplam üye sayısı; \`${EkipTotal3}\`
▫️ Çevrimiçi üye sayısı; \`${EkipOnline3}\`
▫️ Sesteki üye sayısı; \`${EkipVoice3}\`

`)
message.channel.send(aiasembed)
}

}