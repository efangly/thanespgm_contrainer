const mongoose = require("mongoose")

const locationSchema = mongoose.Schema({
  locationID:{
    type: String,
    require: true,
    unique: true
  },
  locname:{
    type: String,
    require: true
  },
  price:{
    type: String,
    require: true
  }
},{timestamps:true})

module.exports = mongoose.model("Locations",locationSchema)