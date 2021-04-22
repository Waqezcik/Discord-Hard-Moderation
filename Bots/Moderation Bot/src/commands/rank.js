const Discord = require("discord.js");
const Levels = require('discord-xp')
const canvacord = require("canvacord")
const conf = require("../configs/ayarlar.json")
module.exports = {
  conf: {
    aliases: ["rank", "level", "xp"],
    name: "rank",
    help: "rank",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
	let target = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
  let uye = message.guild.member(target);
  const user = await Levels.fetch(target.id, message.guild.id); 
  if (!user) return message.channel.send(":no_entry_sign: Rank kartına bakmak için biraz sohbet et!");

  const req = Levels.xpFor(user.level +1);
  const level = user.level;
  const rank = new canvacord.Rank()
  .registerFonts()
  .setAvatar(target.displayAvatarURL({ format: "png" }))
  .setCurrentXP(user.xp)
  .setRequiredXP(req)
  .setRank(0, "Level", false)
  .setStatus(target.presence.status)
  .setLevel(level)
  .setBackground("IMAGE", "https://cdn.discordapp.com/attachments/831988927564480572/832407973011521536/monicatag.jpg")
  .setUsername(target.username)
  .setDiscriminator(target.discriminator)
  .setProgressBar("#FFFFFF", "COLOR")

  rank.build()
  .then(data => {
      const attachment = new Discord.MessageAttachment(data, "exzoncrprank.png");
      message.channel.send(attachment);

      if(level >= 50) { 
        uye.roles.add(conf.rank50)
        uye.roles.remove(conf.rank40)
        uye.roles.remove(conf.rank30)
        uye.roles.remove(conf.rank20)
        uye.roles.remove(conf.rank10)
        uye.roles.remove(conf.rank5)
       } else if(level >= 40) { 
        uye.roles.remove(conf.rank50)
        uye.roles.add(conf.rank40)
        uye.roles.remove(conf.rank30)
        uye.roles.remove(conf.rank20)
        uye.roles.remove(conf.rank10)
        uye.roles.remove(conf.rank5)
       } else if(level >= 30) { 
        uye.roles.remove(conf.rank50)
        uye.roles.remove(conf.rank40)
        uye.roles.add(conf.rank30)
        uye.roles.remove(conf.rank20)
        uye.roles.remove(conf.rank10)
        uye.roles.remove(conf.rank5)
       } else if(level >= 20) { 
        uye.roles.remove(conf.rank50)
        uye.roles.remove(conf.rank40)
        uye.roles.remove(conf.rank30)
        uye.roles.add(conf.rank20)
        uye.roles.remove(conf.rank10)
        uye.roles.remove(conf.rank5)
       } else if(level >= 10) { 
        uye.roles.remove(conf.rank50)
        uye.roles.remove(conf.rank40)
        uye.roles.remove(conf.rank30)
        uye.roles.remove(conf.rank20)
        uye.roles.add(conf.rank10)
        uye.roles.remove(conf.rank5)
       } else if(level >= 5) { 
        uye.roles.remove(conf.rank50)
        uye.roles.remove(conf.rank40)
        uye.roles.remove(conf.rank30)
        uye.roles.remove(conf.rank20)
        uye.roles.remove(conf.rank10)
        uye.roles.add(conf.rank5)
       }
      
  });

  }}