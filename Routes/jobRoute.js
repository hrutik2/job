const express =require("express")
const jobModle = require("../Model/jobModle")
const authMiddleware = require("../authMiddleware")

const JobRoutes=express.Router()

JobRoutes.post("/AddJob" ,authMiddleware,async(req,res)=>{
  try {
    const Job=new jobModle(req.body)
    await Job.save()
    res.status(201).json({ message: "Job Added Successfully" })
    

  } catch (error) {
    res.status(500).json({ message: "Failed to add job" })
    
  }

})
JobRoutes.get("/getdata",authMiddleware,async(req,res)=>{
 try {
  const Job=await jobModle.find()
  res.status(200).json(Job)

  
 } catch (error) {
  res.status(500).json({error})

  
 }
})

module.exports=JobRoutes