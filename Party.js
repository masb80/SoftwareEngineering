var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PartySchema = new Schema({
  name: String,
  symbol: String
})

module.exports = mongoose.model("Party", PartySchema)
