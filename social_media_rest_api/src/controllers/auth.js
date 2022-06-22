const router = require("express").Router();

const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {


    // collecting user information
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });


    
    // saving user information to database
    const user = await newUser.save();

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
