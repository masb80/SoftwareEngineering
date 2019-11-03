var mongoose = require('mongoose')
var Schema = mongoose.Schema

var BackSchema = new Schema({
  name: String,
  party: String,
  age: Number,
  pid: {type:Number,default:0},
  presidential: {type:Boolean,default:false},
  district: {type:Boolean,default:false},
  vote: {type:Number,default:0},
  pvote: {type:Number,default:0},
  dvote: {type:Number,default:0}
})

module.exports = mongoose.model("Back", BackSchema)
