const { MessageEmbed, WebhookClient } = require("discord.js");
const fetch = require('node-fetch');
const client = global.client;
const Levels = require("discord-xp");
const conf = require('../configs/ayarlar.json')
module.exports = async message => {
    if (!message.guild) return;
    if (message.author.bot) return;
    let level5 = message.guild.roles.cache.get(conf.rank5).name
    let level10 = message.guild.roles.cache.get(conf.rank10).name
    let level20 = message.guild.roles.cache.get(conf.rank20).name
    let level30 = message.guild.roles.cache.get(conf.rank30).name
    let level40 = message.guild.roles.cache.get(conf.rank40).name
    let level50 = message.guild.roles.cache.get(conf.rank50).name
    const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
      const user = await Levels.fetch(message.author.id, message.guild.id);
      client.channels.cache.get(conf.rankup).send(`${message.author} tebrikler, seviye atladın! Yeni seviyen: **${user.level}**`);
      if(user.level >= 50) { 
        message.member.roles.remove(conf.rank5, conf.rank10, conf.rank20, conf.rank30, conf.rank40)
        message.member.roles.add(conf.rank50)
        if(message.member.roles.cache.has(conf.rank50)) {
          return;
        } 
        client.channels.cache.get(conf.rankup).send(`${message.author} tebrikler, yeni seviyen **"${level50}"** rolüne yükselmene yeterli oldu. `)
      } else if(user.level >= 40) { 
        message.member.roles.remove(conf.rank5, conf.rank10, conf.rank20, conf.rank30, conf.rank50)
        message.member.roles.add(conf.rank40)
        if(message.member.roles.cache.has(conf.rank40)) {
          return;
        } 
        client.channels.cache.get(conf.rankup).send(`${message.author} tebrikler, yeni seviyen **"${level40}"** rolüne yükselmene yeterli oldu. `)
      } else if(user.level >= 30) { 
        message.member.roles.remove(conf.rank5, conf.rank10, conf.rank20, conf.rank50, conf.rank40)
        message.member.roles.add(conf.rank30)
        if(message.member.roles.cache.has(conf.rank30)) {
          return;
        } 
        client.channels.cache.get(conf.rankup).send(`${message.author} tebrikler, yeni seviyen **"${level30}"** rolüne yükselmene yeterli oldu. `)
      } else if(user.level >= 20) { 
        message.member.roles.remove(conf.rank5, conf.rank10, conf.rank50, conf.rank30, conf.rank40)
        message.member.roles.add(conf.rank20)
        if(message.member.roles.cache.has(conf.rank20)) {
          return;
        } 
        client.channels.cache.get(conf.rankup).send(`${message.author} tebrikler, yeni seviyen **"${level20}"** rolüne yükselmene yeterli oldu. `)
      } else if(user.level >= 10) { 
        message.member.roles.remove(conf.rank5, conf.rank50, conf.rank20, conf.rank30, conf.rank40)
        message.member.roles.add(conf.rank10)
        if(message.member.roles.cache.has(conf.rank10)) {
          return;
        } 
        client.channels.cache.get(conf.rankup).send(`${message.author} tebrikler, yeni seviyen **"${level10}"** rolüne yükselmene yeterli oldu. `)
      } else if(user.level >= 5) { 
        message.member.roles.remove(conf.rank50, conf.rank10, conf.rank20, conf.rank30, conf.rank40)
        message.member.roles.add(conf.rank5)
        if(message.member.roles.cache.has(conf.rank5)) {
          return;
        } 
        client.channels.cache.get(conf.rankup).send(`${message.author} tebrikler, yeni seviyen **"${level5}"** rolüne yükselmene yeterli oldu. `)
      } 
    }
      }; 
module.exports.conf = {
  name: "message"
};