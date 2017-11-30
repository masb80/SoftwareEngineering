var mongoose = require('mongoose')
var Schema = mongoose.Schema

var TestSchema = new Schema({
  name: String,
  show: Boolean
})

module.exports = mongoose.model("Test", TestSchema)
