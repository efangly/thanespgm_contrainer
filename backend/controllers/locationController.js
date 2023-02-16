//userController
const { v1: uuidv1 } = require('uuid')
const Locations = require("../models/locations")

exports.locationlist = (req,res)=>{
  Locations.find({}).sort({"createdAt":-1}).exec((err,location)=>{
    if(err){
      return res.status(400).json({error:err})
    }
    return res.json(location)
  })
}

exports.locationlistbyid = (req,res)=>{
  const {locationID} = req.params
  Locations.find({locationID}).exec((err,location)=>{
   if(err){
    return res.status(400).json({error:err})
   }
   return res.json(location)
 })
}

exports.createlocation = (req,res)=>{
  const locationID = "LO-"+uuidv1()
  const {locname,price} = req.body

  //insert location
  Locations.create({locationID,locname,price},(err,location)=>{
    if(err){
      res.status(400).json({error:err})
    }
    res.json(location)
  })
}

exports.removelocation = (req,res)=>{
  const {locationID} = req.params
  Locations.findOneAndRemove({locationID}).exec((err,location)=>{
    if(err){
      res.status(400).json({error:err})
    }
    res.json({
      message: "Remove Location Success"
    })
  })
}