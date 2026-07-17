// ============================================================
// models/Message.js — Mongoose schema and model for chat messages
// ============================================================
// WHY THIS FILE EXISTS:
// Defines the shape of every chat message stored in MongoDB.
// Each message has a "role" (who said it) and "text" (what they said).
// Timestamps are added automatically by Mongoose.
//
// This is the ONLY file that knows about the database structure.
// If you need to add fields (e.g., "conversationId" for multiple
// chat sessions), you only change this file.
// ============================================================

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        role: {
            type: String,
            enum: ["user", "ai"],
            
        },
        // The actual message content
        text: {
            type: String,
            
        },
    },
    {
        // Adds createdAt and updatedAt fields automatically
        timestamps: true,
    }
);

// "Message" is the model name, Mongoose will create a "messages" collection
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
