const express = require('express');
const hamelt=require('helmet');
const morgan = require('morgan');
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(hamelt())
app.use(morgan("common"));

//CONTROLLERS
const authController=require("./controllers/auth")

// ROUTERS/ API
app.use("/api/auth",authController)









module.exports =app;
