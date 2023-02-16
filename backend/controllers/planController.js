//mainController
const { v1: uuidv1 } = require('uuid')
const Plans = require("../models/plans")
const DetailPlans = require("../models/detailplans")

exports.planlist = (req,res)=>{
  Plans.aggregate([
    {$project:{
      planID: 1,
      date_start:{ $dateToString:{format: "%d-%m-%Y", date: "$date_start" }},
      objective: 1,
      location: 1,
      buddy: 1,
      createdAt: 1}},
    {$sort:
      {createdAt: -1}}
  ])
  .exec((err,plan)=>{
    if(err){
      res.status(400).json({error:err})
    }
    return res.json(plan)
  })
}

exports.planlistbyid = (req,res)=>{
  const {userID} = req.params
  Plans.aggregate([
    {$match: 
			{userID: userID}},
    {$project:{
      _id: 0,
      planID: 1,
      date_start:{ $dateToString:{format: "%d/%m/%Y", date: "$date_start" }},
      date_end:{ $dateToString:{format: "%d/%m/%Y", date: "$date_end" }},
      objective: 1,
      location: 1,
      buddy: 1,
      createdAt: 1}},
    {$sort:
      {createdAt: -1}}
  ])
  .exec((err,plan)=>{
    if(err){
      res.status(400).json({error:err})
    }
    return res.json(plan)
  })
}

exports.createplan = (req,res)=>{
  const {userID,date_start,date_end,travel_money,hotel_money,other_money,location,objective,buddy} = req.body
  const planID = "DP-"+uuidv1()
  const start = new Date(date_start)
  const end = new Date(date_end)
  const alldetailplan = []
  let dtime=start
  //insert plan
  Plans.create({
    planID,userID,date_start,date_end,travel_money,hotel_money,
    other_money,location,objective,buddy
    },(err,plan)=>{
    if(err){
      res.status(400).json({error:err})
    }
    else{
      //insert detailplan
      while(dtime<=end){
        const detailID = "DT-"+uuidv1()
        alldetailplan.push({
          detailID: detailID,
          planID: planID,
          date_plan: dtime.toISOString().replace('T', ' '),
          objective: objective,
          location: location,
          buddy: buddy,
          travel_money: travel_money,
          hotel_money: hotel_money,
          other_money: other_money
        })
        dtime.setDate(dtime.getDate() + 1)
      }
      DetailPlans.insertMany(alldetailplan).then(function(){ 
        res.status(200).json({message: "create เรียบร้อย"}) // Success 
      }).catch(function(err){ 
        res.status(400).json({error:err}) // Fail
      })
    }
  })
}

exports.removeplan = (req,res)=>{
  const {planID} = req.params
  const allPlanID = planID.split(",")
  Plans.deleteMany({planID:{$in:allPlanID}}).exec((err,plan)=>{
    if(err){
      res.status(400).json({error:err})
    }
    else{
      DetailPlans.deleteMany({planID:{$in:allPlanID}}).exec((err,plan)=>{
        if(err){
          res.status(400).json({error:err})
        }
        res.json({
          "message": "ลบข้อมูลเรียบร้อย"
        })
      })
    }
  })
}