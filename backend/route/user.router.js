const express =require("express")
const {userModel}=require("../model/user.model")
const {BlackModel}=require("../model/black.model")
const jwt =require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userRouter =express.Router()

userRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const user = await userModel.find({ email });
    if (user.length <= 0) {
      try {
        bcrypt.hash(password, 5, async (err, hash) => {
          if (err) {
            res.send({ msg: "Something went Wrong", error: err.message });
          } else {
            const user = new userModel({
              name,
              email,
            
              password: hash,
            });
            await user.save();
            res.send({ msg: "New user has been registered" });
          }
        });
      } catch (error) {
        res.send({ msg: "Something went Wrong", error: error.message });
      }
    } else {
      res.send({ msg: "User already exist, please login" });
    }
  });
  
  userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userModel.findOne({ email });
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            const token = jwt.sign({ userId: user._id }, "token");

        

            res.send({ msg: "Logged in ", token: token,user });
          }
        });
      } else {
        res.send({ msg: "Wrong credentials" });
      }
    } catch (error) {
      res.send({ msg: "Something went wrong", error: error.message });
    }
  });





userRouter.get("/logout", async (req, res) => {
    let token = req.headers.authorization?.split(" ")[1];
    let black = new BlackModel({ token });
    await black.save();
    res.send({ msg: "logout sucessfully!!" });
  });
  
  

module.exports={userRouter}