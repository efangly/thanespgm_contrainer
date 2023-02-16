const jwt = require("jsonwebtoken")
const Users = require("../models/users")
const expressJWT = require("express-jwt")
const bcrypt = require('bcrypt')

exports.login = (req,res)=>{
  const {username,password} = req.body
  Users.findOne({username:username}).exec( async (err,user)=>{
    if(err){
      res.status(400).json({error:"ไม่สามารถเชื่อม Database ได้"})
    }
    else{
      if(user){
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
          return res.status(400).json({error:"รหัสผ่านไม่ถูกต้อง"})
        }else{
          const userID = user.userID
          const firstname = user.firstname
          const lastname = user.lastname
          const job = user.job
          const department = user.department
          const status = user.status
          const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'1d'})
          return res.json({token,username,userID,firstname,lastname,job,department,status})
        }
      }
      else{
        return res.status(400).json({error:"ชื่อผู้ใช้ไม่ถูกต้อง"})
      }
    }
  })
}
//check token
exports.requireLogin=expressJWT({
  secret:process.env.JWT_SECRET,
  algorithms:["HS256"],
  userProperty:"auth"
})