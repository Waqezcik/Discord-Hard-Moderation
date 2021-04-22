const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: "" },
  userID: { type: String, default: "" },
  ceza: { type: Array, default: [] }
});

module.exports = model("ceza", schema);
