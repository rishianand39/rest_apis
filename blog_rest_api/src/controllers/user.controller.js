const mongoose = require("mongoose");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const User=require("../models/user.model");
const { body, validationResult } = require('express-validator');


// WHAT ARE THE FUNCTION IN BODY VALDIATION
// console.log(body("email"))


router.post("/register", body('email').isEmail(),async(req,res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        // HASHING PASSWORD
        const salt= await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(req.body.password,salt)

        const user=new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            profilePicture:req.body.profilePicture,

        })
        const savedUser=await user.save();
        // const {password,...other}=savedUser._doc


        return res.status(200).json(savedUser)

    } catch (error) {
      return  res.status(400).json(error)
    }
})


module.exports =router;