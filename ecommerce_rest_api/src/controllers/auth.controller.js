const router = require("express").Router();
const User = require("../models/user.model");
const dotenv=require("dotenv")
dotenv.config()
const CryptoJS=require("crypto-js")
const jwt=require("jsonwebtoken")



// REGISTER 
router.post("/register", async (req, res) => {
  try {
    // HASHING THE PASSWORD
    const hashedPassword = CryptoJS.AES.encrypt(req.body.password,process.env.CRYPTO_SECRET);

    // COLLIECTIONG USER INFORMATION
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
     password:hashedPassword
    });

    // SAVING USER INFORMATION TO DATABASE
    const user = await newUser.save();

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});


// LOGIN 

router.post("/login", async (req, res) => {
  try {
    //   FINDING USER BY EMAIL IN DB
    const user = await User.findOne({ email: req.body.email });


    // IF USER NOT FOUND IN DB THEN
    if (!user) {
      return !user && res.status(404).json("user not found");
    }

    // GETTING  PASSWORD FROM DB 
    const originalPassword = CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_SECRET).toString(CryptoJS.enc.Utf8);
    
    // IF PASSWORD DOES NOT MATCH THEN
    if (originalPassword !==req.body.password) {
      return res.status(400).json("wrong password");
    }

    // GENERATING ACCESS TOKEN
    const accessToken=jwt.sign({
      id:user._id,
      isAdmin:user.isAdmin
    },
    process.env.JWT_SECRET,
    {expiresIn:"3d"}
    );
    const {password,...others}=user._doc;

    // IF EVERYTHING IS OK THEN
   return  user && res.status(200).json({...others,accessToken});
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;