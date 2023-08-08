const mongoose = require("mongoose")


const blackSchema = mongoose.Schema({
 token:String
})

const BlackModel = mongoose.model("black",blackSchema)

module.exports = {BlackModel};
