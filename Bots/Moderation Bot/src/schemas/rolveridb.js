const mongoose = require("mongoose");
const schema = mongoose.Schema({
  guildID: String,
  kullanıcıID: String,
  rolveridb: { type: Array, default: [] }
});
module.exports = mongoose.model("rolveridb", schema);