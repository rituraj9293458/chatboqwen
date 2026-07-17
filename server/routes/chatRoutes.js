// ============================================================
// routes/chatRoutes.js — Express routes for the chat API
// ============================================================
// WHY THIS FILE EXISTS:
// Routes should ONLY handle HTTP concerns: receive requests,
// call the right functions, and send responses. No LLM logic,
// no database schema definitions — just routing.
//
// GET  /chat → returns all messages (for loading chat history)
// POST /chat → receives user message, gets AI response, returns both
// ============================================================

const express = require("express");
const Message = require("../models/Message");
const { getChatResponse } = require("../langchain/chat");

const router = express.Router();

// GET /chat — Load the full conversation history
router.get("/", async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /chat — Send a new message and get AI response
router.post("/", async (req, res) => {
    try {
        // 1. Validate the user's input
        const text = req.body.text?.trim();
        if (!text) {
            return res.status(400).json({ error: "Message text is required" });
        }

        // 2. Save the user's message to MongoDB
        await Message.create({ text, role: "user" });

        // 3. Load the full conversation history (including the message we just saved)
        const history = await Message.find().sort({ createdAt: 1 });

        // 4. Get the AI's response using LangChain
        //    We pass history WITHOUT the latest user message in it,
        //    because the prompt template adds it separately as {input}
        const pastMessages = history.slice(0, -1); // everything except the last message
        const aiText = await getChatResponse(pastMessages, text);

        // 5. Save the AI's response to MongoDB
        const aiMessage = await Message.create({ text: aiText, role: "ai" });

        // 6. Return the full updated conversation
        const conversation = await Message.find().sort({ createdAt: 1 });
        res.json({ userMessage: { text, role: "user" }, aiMessage, conversation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
