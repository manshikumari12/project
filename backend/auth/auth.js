const jwt = require("jsonwebtoken")
const { BlackModel } = require("../models/black.model");
require("dotenv").config()

const auth = async(req,res,next)=>{
    let token = req.headers?.authorization?.split(" ")[1];
    if(token){
   const black = await BlackModel.find({token})
   if(black.length>0){
    res.status(204).send({msg:"login agin"})
   }else{
    try {
       const decoded = jwt.verify(playlist);
       req.body.userID = decoded.userID;
       req.body.name = decoded.name;
       req.body.time = new Date();
       next()  
    } catch (error) {
        if(error.message = "jwt expired"){
            res.status(404).send({msg:"jwt expired please login"})
        }else{
            res.status(404).send(error)
        }
    }
   }
    }
}
module.exports = {auth};