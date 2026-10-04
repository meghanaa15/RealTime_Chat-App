import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import db from "./config/db.js";

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer);

const PORT = process.env.PORT || 4000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Real-time chat server is running");
});

app.get("/messages",(req,res)=>{

    const sql = "SELECT * FROM messages ORDER BY id ASC";

    db.query(sql,(err,results)=>{
        if(err){
            console.error("Error fetching messages:",err.message);
            return res.status(500).json({error:"Failed to fetch messages"});
        }
        res.json(results);
    });
});

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("chatMessage", (data) => {
        console.log("Message Received:", data);

        const sql = "INSERT INTO messages (username,message) VALUES (?,?)";

        db.query(sql,[data.username,data.message],(err,result)=>{
            if(err){
                console.error("Error saving message :",err.message);
                return;
            }
            console.log("Message saved to database");

        io.emit("chatMessage", data);

        });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


