const express=require("express")
const cors=require("cors")
const Connection = require("./connection")
const userRoutes = require("./Routes/userRoute")
const JobRoutes = require("./Routes/jobRoute")
require("dotenv").config()
const app=express()
app.use(cors())
app.use(express.json())
app.use("/users",userRoutes)
app.use("/Job",JobRoutes)

app.listen(process.env.port,async()=>{
    try {
        await Connection
        console.log("server is runing")
    } catch (error) {
        console.log(error)
    }
})