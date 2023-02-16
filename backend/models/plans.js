const mongoose = require("mongoose")

const planSchema = mongoose.Schema({
  planID:{
    type: String,
    require: true,
    unique: true
  },
  userID:{
    type: String,
    require: true
  },
  date_start:{
    type: Date,
    require: true
  },
  date_end:{
    type: Date,
    require: true
  },
  travel_money:{
    type: String,
    require: true
  },
  hotel_money:{
    type: String,
    require: true
  },
  other_money:{
    type: String,
    require: true
  },
  location:{
    type: String,
    require: true
  },
  objective:{
    type: String,
    require: true
  },
  buddy:{
    type: String
  }
},{timestamps:true})

module.exports = mongoose.model("Plans",planSchema)