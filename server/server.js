const express = require("express");
const cors = require("cors");
const connectdb = require("./config/db");
const chatRoutes = require("./routes/chatRoutes");
const authroutes=require("./routes/authroutes");
const app = express();

app.use(cors());
app.use(express.json());

connectdb();
app.use("/auth", authroutes);
app.use("/chat", chatRoutes);

app.listen(7000, () => {
    console.log("Server started on http://localhost:7000");
});
