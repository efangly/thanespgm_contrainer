const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const connectDB = require('./config/database')

require("dotenv").config()
const Route = require('./routes/mainRoute')
const authRoute = require('./routes/authRoute')

const app = express()

//connectDB
connectDB()

//middleware
app.use(express.json())
app.use(cors({ origin: '*' }))
app.use(morgan("dev"))

//route
app.use('/api',Route)
app.use('/api',authRoute)

const port = process.env.PORT
app.listen(port,()=>console.log('Start server in port '+port))