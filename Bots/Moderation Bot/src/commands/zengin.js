const { emojisi } = require("../configs/config.json");
const conf = require("../configs/config.json");

module.exports = {
  conf: {
    aliases: ["booster"],
    name: "zengin",
    help: "zengin isim",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
  let booster = conf.admins.boosterRolu || undefined;
  if(!booster) return message.channel.send("Böyle Bir rol Bulanamadı!")
   if(!message.member.roles.cache.has(booster)) return message.reply("Bu Komutu Kullanabilmek İçin Booster Rolüne Sahip Olmalısın!").then(chery=> chery.delete({timeout: 5000}))
    let uye = message.guild.members.cache.get(message.author.id);
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yazilacakIsim;
        if(!isim) return message.channel.send(embed.setDescription("Geçerli bir isim belirtmelisin!")).then(x => x.delete({timeout: 5000}));
    yazilacakIsim = `${uye.user.username.includes(conf.admins.tag) ? conf.admins.tag : (conf.admins.ikinciTag ? conf.admins.ikinciTag : (conf.admins.tag || ""))} ${isim}`;

uye.setNickname(`${yazilacakIsim}`).catch() },
};
