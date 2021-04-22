const conf = require("../configs/config.json");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const muteLimit = new Map();
moment.locale("tr");
const ms = require("ms");

module.exports = {
  conf: {
    aliases: ["seskontrol", "sk", "n","nerede"],
    name: "seskontrol",
    help: "seskontrol [kullanıcı]",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
  if(!message.member.roles.cache.has(conf.admins.sahipRolu)) return message.channel.send(new MessageEmbed().setDescription("Bu komutu kullanabilmek için gerekli rollere sahip değilsin!")).then(x => x.delete({timeout: 5000}));
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!member) return message.channel.send(embed.setDescription(`Bir kullanıcı belirtmelisin.`)).then(x => x.delete({ timeout: 5000 }));
      let kanal = member.voice.channel
      if(!kanal) return message.channel.send(embed.setDescription(`Belirttiğin kişi ses kanalında bulunmuyor.`)).then(x => x.delete({ timeout: 5000 }));
  let voiceT = db.get(`voiceTime_${member.id}_${message.guild.id}`) 
  let time = client.tarihHesapla(voiceT) 
  let microphone = member.voice.selfMute ? "kapalı" : "açık";
  let headphones = member.voice.selfDeaf ? "kapalı" : "açık";
  let sestekiler = message.guild.channels.cache.get(kanal.id).members.map(x => x.user).join(", ")
  kanal.createInvite().then(invite =>
  message.channel.send(embed.setDescription(`${member} kullanıcısı \`${kanal.name}\` kanalında.
  **Mikrofon durumu:** \`${microphone}\`. | **Kulaklık durumu:** \`${headphones}\`.
  
  **Kanala gitmek için [tıklaman](https://discord.gg/${invite.code}) yeterli.**
    
  \`${time}\` sese girmiş.`)))
    }}
    //  \`•\` Odadaki kişiler; ${sestekiler}

