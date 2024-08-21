const express=require("express");
const userModel = require("../Model/userModel");
const bcrypt=require("bcryptjs")
const jwt = require("jsonwebtoken");
require("dotenv").config()
const userRoutes=express.Router()

userRoutes.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hash = await bcrypt.hash(password, 4);

        
        const role = email.endsWith('@alphaware.com') ? 'admin' : 'user';

        const user = new userModel({ name, email, password: hash, role });

        await user.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating user" });
        console.error(error);
    }
});

userRoutes.post("/login",async(req,res)=>{
    const { email, password } = req.body
    try {
        const User=await userModel.findOne({email})
     if(User){
        bcrypt.compare(password, User.password, function(err, result) {
           if(result){
            const token = jwt.sign({ id: User._id, role: User.role },process.env.secretkey)
            res.status(200).json({ token, message: "user login succesful",role:User.role });
           }
           else{
            res.status(200).json({message: "enter correct password"})

           }
        });
     }
     else{
        res.status(400).json({message:"Email not found"})

      
     }
        
    } catch (error) {
        res.status(500).json({ message: "Error logging in user" });
        console.log(error)
    }

})

module.exports=userRoutes
