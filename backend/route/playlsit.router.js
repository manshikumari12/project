const express =require("express")
const {playlistmodel}=require("../model/playlsit.model")

const palylistrouter =express.Router()



//all playlist
palylistrouter.get("/playlist",async(req,res)=>{
    try {
        const restaurant = await playlistmodel.find();
        res.status(200).send(restaurant);
    } catch (error) {
        res.status(400).send(error);
    }
});



//playlist by name ie. only title of login user
palylistrouter.get("/playlist/:id",async(req,res)=>{
    try {
const userid = req.params.id
const resp =await playlistmodel.find({userid}).select({ title:1, _id:1,})
console.log(resp)
res.status(200).send(resp)
        
    } catch (error) {
        console.log(error)
        res.status(404).send("faild to get")  
    }
})


 //user that has created his plylist
palylistrouter.get("/playlistmovie/:uid",async(req,res)=>{
    try {
const userid = req.params.uid

const allpaly =await playlistmodel.find({userid})
res.status(200).json({data:allpaly, flag : true, length: allpaly.length})
        
    } catch (error) {
        console.log(error)
        res.status(404).send("faild to get")  
    }
})
  


//create plylist
palylistrouter.post("/create",async(req,res)=>{
    try {
        const { title, desc,isprivate,userid} =req.body

        console.log(userid)
        const user =await playlistmodel.findOne({ title, userid })
      console.log(user)
        if(user){
           return res.status(500).json({msg:"Playlist already present"})
        }
        const pri = (isprivate == "private") ? true : false
        const newlist =new playlistmodel({ userid,title, desc,isprivate : pri})

        await newlist.save()
        res.status(200).json({msg:"playlist sucessfully"})

    } catch (error) {
        console.log(error)
        res.status(404).send("faild to create")
    }
})



  

palylistrouter.post("/playlistcreate/:idplaylist",async(req,res)=>{
    try {

        const ID=req.params.idplaylist


        const { Title,poster,year,type} =req.body
         
        console.log(Title,poster,year,type)


        const playlist = await playlistmodel.findById(ID)


        playlist.playList.push({Title,poster,year,type})
        await playlist.save()
        res.status(200).json({mag:"movie add"})
        
    } catch (error) {
       console.log(error) 
       res.status(404).send("faild to create")
    }
})



	


  










module.exports={palylistrouter}