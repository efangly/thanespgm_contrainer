//mainController
const DetailPlans = require("../models/detailplans")

exports.detailplanlist = (req,res)=>{
  DetailPlans.find({}).exec((err,detailplan)=>{
    if(err){
      res.status(400).json({error:err})
    }
    res.json(detailplan)
  })
}

exports.detailplanlistbyid = (req,res)=>{
  const {detailID} = req.params
  DetailPlans.findOne({detailID}).exec((err,detailplan)=>{
    if(err){
      res.status(400).json({error:err})
    }
    res.json(detailplan)
  })
}

exports.updatedetailplan = (req,res)=>{
  const {detailID} = req.params
  const {objective,location,
    buddy,travel_money,hotel_money,other_money} = req.body
  //update detailplan
  DetailPlans.findOneAndUpdate({detailID},{objective,location,buddy,travel_money,hotel_money,other_money},{new:true}).exec((err,detailplan)=>{
    if(err){
      res.status(400).json({error:err})
    }
    res.json(detailplan)
  })
}

exports.removedetailplan = (req,res)=>{
  const {detailID} = req.params
  const allDtPlanID = detailID.split(",")
  DetailPlans.deleteMany({detailID:{$in:allDtPlanID}}).exec((err,detailplan)=>{
    if(err){
      res.status(400).json({error:err})
    }
    res.json({
      message: "ลบรายการเรียบร้อย"
    })
  })
}

exports.detailplanlistbyplanid = (req,res)=>{
  const {planID} = req.params
  DetailPlans.aggregate([
    {$match: 
			{planID: planID}},
    {$project:{
			_id: 0,
      detailID: 1,
      dateplan:{ $dateToString:{format: "%d/%m/%Y", date: "$date_plan" }},
      date_plan: 1,
      objective: 1,
      location: 1,
      buddy: 1,
			travel_money: 1,
			hotel_money: 1,
			other_money: 1,
      createdAt: 1}},
    {$sort:
      {date_plan: 1}}
  ]).exec((err,detailplan)=>{
    if(err){
      res.status(400).json({error:err})
    }
    res.status(200).json(detailplan)
  })
}

exports.exportPlanPDF = (req,res)=>{
  const {planID} = req.params
  const allPlanID = planID.split(",")
  DetailPlans.aggregate([
    {$match: 
			{planID:{$in:allPlanID}}},
    {$project:{
			_id: 0,
      detailID: 1,
      dateplan:{ $dateToString:{format: "%d/%m/%Y", date: "$date_plan" }},
      objective: 1,
      location: 1,
      buddy: 1,
			travel_money: 1,
			hotel_money: 1,
			other_money: 1,
      createdAt: 1}},
    {$sort:
      {date_plan: 1}}
  ]).exec((err,detailplan)=>{
    if(err){
      res.status(400).json({error:err})
    }
    res.status(200).json(detailplan)
  })
}