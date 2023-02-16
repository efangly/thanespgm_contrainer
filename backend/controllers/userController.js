//userController
const Users = require("../models/users")

exports.userlistnoself = (req,res)=>{
  const {userID} = req.params
  Users.aggregate([
    {$match: 
			{userID:{'$ne': userID}}},
    {$project:{
			_id: 0,
      userID: 1,
      fullname:{ $concat: ['$firstname', ' ', '$lastname'] },
      nickname: 1,
      job: 1,
      createdAt: 1}},
    {$sort:
      {status: 1,createdAt: 1}}
    ])
   .exec((err,user)=>{
    if(err){
      res.status(400).json({error:err})
    }
    res.json(user)
  })
}

exports.userlistbyid = (req,res)=>{
  const {userID} = req.params
  Users.find({userID: {$ne : userID}}).exec((err,user)=>{
   if(err){
     res.status(400).json({error:err})
   }
   res.json(user)
 })
}

exports.getuser = (req,res)=>{
  Users.find({}).exec((err,user)=>{
   if(err){
     res.status(400).json({error:err})
   }
   res.json(user)
 })
}

exports.getuserbyid = (req,res)=>{
  const {userID} = req.params
  Users.findOne({userID: userID}).exec((err,user)=>{
   if(err){
     res.status(400).json({error:err})
   }
   res.json(user)
 })
}

exports.createuser = async (req,res)=>{
  const {userID,username,password,firstname,lastname,
    job,department,status,nickname} = req.body
  //insert users
  Users.create({
    userID,username,password,firstname,lastname
    ,job,department,status,nickname},(err,user)=>{
    if(err){
      res.status(400).json({error:"ทำรายการไม่สำเร็จ"})
    }
    res.json(user)
  })
}

exports.updateuser = async (req,res)=>{
  const {userID,username,password,firstname,lastname,
    job,department,status,nickname} = req.body
  //update user
  Users.findOneAndUpdate({userID},{userID,username,password,firstname,lastname,job,department,status,nickname},{new:true}).exec((err,user)=>{
    if(err){
      res.status(400).json({error:err})
    }
    res.json({
      message: "Update User เรียบร้อย"
    })
  })
}

exports.removeuser = (req,res)=>{
  const {userID} = req.params
  Users.findOneAndRemove({userID}).exec((err,user)=>{
    if(err){
      res.status(400).json({error:err})
    }
    res.json({
      message: "ลบuserเรียบร้อย"
    })
  })
}