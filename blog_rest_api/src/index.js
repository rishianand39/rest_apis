const express=require('express')
const morgan = require('morgan')
const app = express()

// MIDDLEWARES
app.use(express.json())
app.use(morgan('common'))

// CONSTROLLERS
const userController=require("./controllers/user.controller")

app.use("/api/auth",userController)








module.exports =app