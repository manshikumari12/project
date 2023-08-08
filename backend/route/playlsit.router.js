const express =require("express")
const {playlistmodel}=require("../model/playlsit.model")

const palylistrouter =express.Router()



palylistrouter.get("/playlist",async(req,res)=>{
    try {
        const restaurant = await playlistmodel.find();
        res.status(200).send(restaurant);
    } catch (error) {
        res.status(400).send(error);
    }
});


  



palylistrouter.post("/create",async(req,res)=>{
    try {
        const { title, desc,isprivate,userid} =req.body

        const user =await playlistmodel.findOne({ title, userid })
      console.log(user)
        if(user){
           return res.status(500).send("user already present")
        }
        const newlist =new playlistmodel({ userid,title, desc,isprivate})

        await newlist.save()
        res.send("playlist sucessfully")

    } catch (error) {
        console.log(error)
        res.status(404).send("faild to create")
    }
})
  




palylistrouter.post("/movie/:playid", async (req, res) => {
    try {
        const playlistid = req.params.playid;
        const { Title, poster, year, type } = req.body;
        console.log(Title, poster, year, type);
        const playlisttime = await playlistmodel.findById(playlistid);
        console.log(playlisttime);

        const user = playlisttime.playlist.find((item) => item.Title == Title);
        console.log(user)
        if (user) {
            return res.json({ msg: "Movie already present" });
        }
        playlisttime.playlist.push({ Title, poster, year, type });
        await playlisttime.save();
        res.send("Movie added to playlist successfully");
    } catch (error) {
        console.log(error);
        res.status(404).send("Failed to create");
    }

});



module.exports={palylistrouter}