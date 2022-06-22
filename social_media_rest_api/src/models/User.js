const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password:{
      type: String,
      required: true,
      min: 4,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coveredPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [], // will add userId of followers
    },
    followings: {
      type: Array,
      default: [], // will add userId of followings
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    relationships: {
      type: Number,
      enum: [1,2,3], //user can choose 1 or 2 or 3. 1=>single, 2=>commited, 3=>complicated
    },
    description: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


module.exports =mongoose.model("User",UserSchema)