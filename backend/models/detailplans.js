const mongoose = require("mongoose")

const detailplanSchema = mongoose.Schema({
  detailID:{
    type: String,
    require: true,
    unique: true
  },
  planID:{
    type: String,
    require: true
  },
  date_plan:{
    type: Date,
    require: true
  },
  objective:{
    type: String,
    require: true
  },
  location:{
    type: String,
    require: true
  },
  buddy:{
    type: String,
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
  }
},{timestamps:true})

module.exports = mongoose.model("DetailPlans",detailplanSchema)