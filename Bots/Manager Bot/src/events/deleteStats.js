const { CronJob } = require("cron");
const client = global.client;
const messageGuild = require("../schemas/messageGuild");
const voiceGuild = require("../schemas/voiceGuild");
const messageUser = require("../schemas/messageUser");
const voiceUser = require("../schemas/voiceUser");

module.exports = () => {
  new CronJob("0 0 * * *", () => {
    client.guilds.cache.forEach(async (guild) => {
      await messageGuild.findOneAndUpdate({ guildID: guild.id }, { $set: { dailyStat: 0 } });
      await voiceGuild.findOneAndUpdate({ guildID: guild.id }, { $set: { dailyStat: 0 } });
      await messageUser.findOneAndUpdate({ guildID: guild.id }, { $set: { dailyStat: 0 } });
      await voiceUser.findOneAndUpdate({ guildID: guild.id }, { $set: { dailyStat: 0 } });
    });
  }, null, true, "Europe/Istanbul").start();
  
  new CronJob("0 0 * * 0", () => {
    client.guilds.cache.forEach(async (guild) => {
      await messageGuild.findOneAndUpdate({ guildID: guild.id }, { $set: { weeklyStat: 0 } });
      await voiceGuild.findOneAndUpdate({ guildID: guild.id }, { $set: { weeklyStat: 0 } });
      await messageUser.findOneAndUpdate({ guildID: guild.id }, { $set: { weeklyStat: 0 } });
      await voiceUser.findOneAndUpdate({ guildID: guild.id }, { $set: { weeklyStat: 0 } });
    });
  }, null, true, "Europe/Istanbul").start();

  new CronJob("0 0 1,15 * *", () => {
    client.guilds.cache.forEach(async (guild) => {
      await messageGuild.findOneAndUpdate({ guildID: guild.id }, { $set: { twoWeeklyStat: 0 } });
      await voiceGuild.findOneAndUpdate({ guildID: guild.id }, { $set: { twoWeeklyStat: 0 } });
      await messageUser.findOneAndUpdate({ guildID: guild.id }, { $set: { twoWeeklyStat: 0 } });
      await voiceUser.findOneAndUpdate({ guildID: guild.id }, { $set: { twoWeeklyStat: 0 } });
    });
  }, null, true, "Europe/Istanbul").start();
};

module.exports.conf = {
  name: "ready",
};