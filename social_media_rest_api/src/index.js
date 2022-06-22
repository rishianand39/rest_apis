const express = require('express');
const hamelt=require('helmet');
const morgan = require('morgan');
const app = express();

// MIDDLEWARE
app.use(express.json());

//THIS MIDDLEWARE WILL HELP SECURE YOUR EXPRESS APPS BY SETTING VARIOUS HTTP HEADERS.
app.use(hamelt())   

// THIS MORGAN MIDDLEWARE WILL HELP TO SEE IN YOUR CONSOLE WHICH REQUEST MADE(get,put,post,delete),  WHEN MADE(time)
app.use(morgan("common"));

//CONTROLLERS
const authController=require("./controllers/auth");
const userController=require("./controllers/user");

// ROUTERS/ API
app.use("/api/auth",authController);
app.use("/api/users",userController);









module.exports =app;
