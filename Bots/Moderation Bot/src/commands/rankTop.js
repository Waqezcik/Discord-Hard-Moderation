const { MessageEmbed } = require("discord.js");
const Levels = require("discord-xp");

module.exports = {
  conf: {
    aliases: ["toprank", "toplevel"],
    name: "toprank",
    help: "toprank",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {

  const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 30); // We grab top 10 users with most xp in the current server.

if (rawLeaderboard.length < 1) return reply("Rank sıralamasında kimse yok :confused:");

const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.

const lb = leaderboard.map(e => `\`${e.position}.\` ${e.username}#${e.discriminator}: ${e.level}`); // We map the outputs.

message.channel.send(new MessageEmbed().setColor("RANDOM").setAuthor(`${message.guild.name} Rank Top Listesi`, message.guild.iconURL({display: true, size: 2048})).setDescription(`${lb.join("\n")}`));
}}
