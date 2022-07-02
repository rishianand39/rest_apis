const mongoose = require("mongoose");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/user.model");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// WHAT ARE THE FUNCTION IN BODY VALDIATION
// console.log(body("username"))

router.post(
  "/register",
  body("username")
    .not()
    .isEmpty()
    .withMessage("username can't be empty")
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) {
        throw new Error("username already exists");
      }
      return true;
    }),
  body("email")
    .not()
    .isEmpty()
    .withMessage("email can't be empty")
    .custom(async (value) => {
      const emailid = await User.findOne({ email: value });
      if (emailid) {
        throw new Error("email already exists");
      }
      return true;
    }),
  body("password")
    .not()
    .isEmpty()
    .withMessage("password can't be empty")
    .custom((value) => {
      const pass =
        "(?=^.{8,}$)((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$";
      if (!value.match(pass)) {
        throw new Error(
          "eight characters required including one uppercase letter, one lowercase letter, and one number or special character."
        );
      }
      return true;
    })
    .custom((value, { req }) => {
      if (req.body.confirmPassword == undefined) {
        throw new Error("confirmPassword is required");
      }
      if (value !== req.body.confirmPassword) {
        throw new Error("password and confirm password are not matching.");
      }
      return true;
    }),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // HASHING PASSWORD
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.profilePicture,
      });
      const savedUser = await user.save();
      // const {password,...other}=savedUser._doc

      return res.status(200).json(savedUser);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
);

// LOGIN

router.post(
  "/login",
  body("username")
    .not()
    .isEmpty()
    .withMessage("username can't be empty")
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (!user) {
        throw new Error("username does not exists");
      }
      return true;
    }),
  body("password").not().isEmpty().withMessage("password can't be empty"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //   FINDING USER BY EMAIL IN DB
      const user = await User.findOne({ username: req.body.username });

      // IF USER NOT FOUND IN DB THEN
      if (!user) {
        return res.status(404).json("user not found");
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

      // GENERATING ACCESS TOKEN
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC
      );

      const { password, ...others } = user._doc;

      return res.status(200).json({ others, accessToken });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
);

module.exports = router;
