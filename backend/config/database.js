const mongoose = require("mongoose")

const connectDB = async () => {
  await mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:false
  }).then(()=>console.log("MongoDB Connected"))
    .catch((err)=>console.log(err))
}

module.exports = connectDB