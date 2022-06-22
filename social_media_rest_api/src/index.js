const express = require('express');

const app = express();
app.use(express.json());

const authController=require("./controllers/auth")


app.use("/api/auth",authController)









module.exports =app;
