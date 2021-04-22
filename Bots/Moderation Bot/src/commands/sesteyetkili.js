const conf = require("../configs/config.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const muteLimit = new Map();
moment.locale("tr");
const ms = require("ms");

module.exports = {
  conf: {
    aliases: ["sesteki"],
    name: "sesteki",
    help: "sesteki",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
    let NoVoice = message.guild.members.cache.filter(Tau => Tau.roles.cache.has(conf.registration.staffs)).filter(filterTau => !filterTau.voice.channel&&filterTau.presence.status!="offline")
    message.channel.send(`
Aktif olup seste olmayan yetkililer ;
Seslere geçelim aktifliğiniz ile puanlarınız yükselir ve yetki atlayabilirsiniz.    
${NoVoice.map(noVoiceMember => `${noVoiceMember}  \`${noVoiceMember.user.tag}\``).join('\n')}`)
    
}}


