const mongoose=require("mongoose")


const playschema = mongoose.Schema({

    title:String,
    desc:String,
    isprivate:{type:Boolean,default:false },
    playList:[{
  
        Title:String,
        poster:String,
        year:String,
        type:String,

    }],
    userid:mongoose.Schema.Types.ObjectId,
})
const playlistmodel = mongoose.model("play",playschema)

module.exports={playlistmodel}