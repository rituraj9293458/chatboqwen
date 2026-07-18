const express = require("express");
const router = express.Router();
const Message=require("../models/Message");

router.post("/login", async (req, res) => {
    try {
        const username = req.body.username || req.body.name;
        const password = req.body.password;

        const exists = await Message.findOne({ 
            username: username, 
            password: password 
        });

        if (!exists) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        res.status(200).json({ message: "Login successful", user: exists });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post("/signup", async (req, res) => {
    try {
        const username = req.body.username 
        const password = req.body.password;
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