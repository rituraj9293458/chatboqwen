// ============================================================
// server.js — Application entry point
// ============================================================
// WHY THIS FILE EXISTS:
// This is the starting point of the backend. It does three things:
// 1. Creates the Express app with middleware (CORS, JSON parsing)
// 2. Connects to MongoDB
// 3. Mounts the chat routes and starts listening
//
// Notice how small this file is — all the logic lives in other
// files. This makes it easy to understand what the app does at
// a high level without getting lost in details.
// ============================================================

const express = require("express");
const cors = require("cors");
const connectdb = require("./config/db");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

// Middleware: allow cross-origin requests (so the React frontend can call this API)
app.use(cors());
// Middleware: parse JSON request bodies (so we can read req.body.text)
app.use(express.json());

// Connect to MongoDB
connectdb();

// Mount all chat routes under /chat
app.use("/chat", chatRoutes);

// Start the server
app.listen(7000, () => {
    console.log("Server started on http://localhost:7000");
});
