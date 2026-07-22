const express = require("express");
const router = express.Router();
const Message=require("../models/Message");
const bcrypt=require("bcrypt")
require("dotenv").config();
const jwt = require("jsonwebtoken");
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
        let found = await bcrypt.compare(req.body.password, exists.password);        
        
        // Fallback for older test accounts created before hashing was implemented
        if (!found && req.body.password === exists.password) {
             found = true;
        }

        if(!found)
        {
             return res.status(401).json({ message: "Invalid password" });
        }
        else
        {
           
            const token = jwt.sign
        (
            {
            id: exists._id,
            username: exists.username
            },
            process.env.JWT_SECRET,
            {
             expiresIn: "1h"
            },
            
        );
        res.status(200).json({message:"login successfull",token:token});
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