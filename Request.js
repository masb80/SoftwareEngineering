var mongoose = require('mongoose')
var Schema = mongoose.Schema

var RequestSchema = new Schema({
  from: String,
  to: String,
  ename: String,
  content: String
})

module.exports = mongoose.model("Request", RequestSchema)
