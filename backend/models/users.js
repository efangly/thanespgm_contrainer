const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
  userID:{
    type: String,
    require: true,
    unique: true
  },
  username:{
    type: String,
    require: true
  },
  password:{
    type: String,
    require: true
  },
  firstname:{
    type: String,
    require: true
  },
  lastname:{
    type: String,
    require: true
  },
  job:{
    type: String,
    require: true
  },
  department:{
    type: String,
    require: true
  },
  status:{
    type: String,
    require: true
  },
  nickname:{
    type: String,
    require: true
  }
},{timestamps:true})

userSchema.pre('save',(async function(next){
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)
}))

module.exports = mongoose.model("Users",userSchema)