var mongoose = require('mongoose')
var Schema = mongoose.Schema
//var AutoIncrement = require('mongoose-sequence')(mongoose)


var ElectionSchema = new Schema({
  eid: Number,
  type: String,
  status: String
})

//ElectionSchema.plugin(AutoIncrement,{inc_field:'eid'});




module.exports = mongoose.model("Election", ElectionSchema)
