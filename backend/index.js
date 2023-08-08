const express = require("express")

const {connection}=require("./db")
const {userRouter}=require("./route/user.router")
const {palylistrouter}=require("./route/playlsit.router")
const cors =require("cors")

const app = express()
app.use(cors())
app.use(express.json())


app.use("/user",userRouter)
app.use("/play",palylistrouter)
// app.get("/",(req,res)=>{
//     res.send("home");
// })


app.listen(3000,async(req,res)=>{
    try {
        await connection;
        console.log("connected to db");
      } catch (error) {
        console.log(error);
      }
    
      console.log(`server is running at port ${process.env.PORT}`);
})