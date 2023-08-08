const mongoose=require("mongoose")


const playschema = mongoose.Schema({

    title:String,
    desc:String,
    isprivate:{type:Boolean,default:false },
    playlist:[{
        id:mongoose.Schema.Types.ObjectId,
        Title:String,
        poster:String,
        year:String,
        type:String,
        playlistid:mongoose.Schema.Types.ObjectId,
    }],
    userid:mongoose.Schema.Types.ObjectId,
})
const playlistmodel = mongoose.model("play",playschema)

module.exports={playlistmodel}