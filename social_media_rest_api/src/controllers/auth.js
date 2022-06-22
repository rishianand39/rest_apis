const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    // HASHING THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // COLLIECTIONG USER INFORMATION
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // SAVING USER INFORMATION TO DATABASE
    const user = await newUser.save();

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    //   FINDING USER BY EMAIL IN DB
    const user = await User.findOne({ email: req.body.email });


    // IF USER NOT FOUND IN DB THEN
    if (!user) {
      return !user && res.status(404).json("user not found");
    }

    // COMPARING PASSWORD 
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    
    // IF PASSWORD DOES NOT MATCH THEN
    if (!validPassword) {
      return res.status(400).json("wrong password");
    }

    // IF EVERYTHING IS OK THEN
   return  user && res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
