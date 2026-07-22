const express = require("express");
const router = express.Router();
const Message=require("../models/Message");
const bcrypt=require("bcrypt")
router.post("/login", async (req, res) => {
    try {
        const username = req.body.username || req.body.name;
        const password = req.body.password;
         
        const exists = await Message.findOne({ 
            username: username, 
           
        });

        if (!exists) {
            return res.status(401).json({ message: "user not found!"});
        }
        else if(exists)
        {
        const found=await bcrypt.compare(req.body.password,exists.password);        
        
        if(!found)
        {
             return res.status(401).json({ message: "Invalid password" });
        }
        else
        {
           res.status(200).json({ message: "Login successful",  id: exists._id,
        username: exists.username});
        }
        }
        
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post("/signup", async (req, res) => {
    try {
        const username = req.body.username;
        const cp=req.body.password;
        if(!cp || !username)
        {
            return res.status(400).json({
             message: "Username and password are required"});
        }
        const hashw=await bcrypt.hash(cp,7);
       
        const password = hashw;
        const existingUser = await Message.findOne({ username });

       if (existingUser) {
           return res.status(409).json({
            message: "Username already exists",
          });
               }
       await Message.create({ username,
    password,})
    
       return res.status(201).json({message:"signup was successfull"})
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports=router;