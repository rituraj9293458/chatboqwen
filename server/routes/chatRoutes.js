

const express = require("express");
const Message = require("../models/Message");
const { getChatResponse } = require("../langchain/chat");

const router = express.Router();


router.get("/", async (req, res) => {
    try {
        const username = req.query.username;
        if (!username) {
            return res.status(400).json({ error: "Username is required" });
        }
        const user = await Message.findOne({ username });
        if (!user) {
            return res.json([]);
        }
        res.json(user.messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post("/", async (req, res) => {
    try {
        const text = req.body.text?.trim();
        const username = req.body.username;
        if (!text) {
            return res.status(400).json({ error: "Message text is required" });
        }
        if (!username) {
            return res.status(400).json({ error: "Username is required" });
        }

        const user = await Message.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const pastMessages = user.messages;

        user.messages.push({
            role: "user",
            text
        });
        await user.save();

        const aiText = await getChatResponse(pastMessages, text);

        user.messages.push({
            role: "ai",
            text: aiText
        });
        await user.save();

        res.json({
            userMessage: { text, role: "user" },
            aiMessage: { text: aiText, role: "ai" },
            conversation: user.messages
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
