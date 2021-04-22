const { MessageEmbed, DiscordAPIError } = require("discord.js");
const conf = require("../configs/config.json")

module.exports = {
  conf: {
    aliases: ["yetenek","yt","vip","couple","rol","r","rolver"],
    name: "rolver",
    help: "rolver [kullanıcı]",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
    let array = [
    {rol: conf.rols.vip , no: "1"},
    {rol: conf.rols.designer , no: "2"},
    {rol: conf.rols.ressam , no: "3"},
    {rol: conf.rols.voiceaktor , no: "4"},
    {rol: conf.rols.vokal , no: "5"},
    {rol: conf.rols.muzisyen , no: "6"},
    {rol: conf.rols.streamer , no: "7"},
    {rol: conf.rols.famous , no: "8"},
    {rol: conf.rols.lovers , no: "9"}
    ]
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.channel.send(embed.setDescription(`**Bir üye etiketlemelisiniz veya idsini girmelisiniz.**`))
    message.channel.send(embed.setDescription(`${member} - (\`${member.id}\`) üyesine verilecek rolün numarasını yazmalısınız.
    
    ${array.map(a => `\`${a["no"]}\` ` + message.guild.roles.cache.get(a["rol"]).name).join("\n")}`)).then(async mesaj => {
    
    const filter = m => m !== null && m.author.id == message.author.id;
    message.channel.awaitMessages(filter, {max: 1, time: 10000, errors: ['time']})
    .then(collected => {
        array.forEach(a => {
            Object.keys(a).forEach(b => {
                if(b == "no" && a[b] == collected.first().content) {
                     member.roles.add(a["rol"])
                     message.channel.send(embed.setDescription(`${member} üyesine <@&${a["rol"]}> rolü başarıyla verildi.`)).then(x=> x.delete({timeout: 3000}))
                     mesaj.delete({timeout: 2000})
                   }
               })
            })
         }) 
    .catch(c => message.channel.send(embed.setDescription(`İşlem iptal edildi.`)))
    })
  }}


