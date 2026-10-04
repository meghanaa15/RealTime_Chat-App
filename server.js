import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import db from "./config/db.js";
import messageRoutes from "./routes/messageRoutes.js";

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer);

const PORT = process.env.PORT || 4000;

app.use(express.static("public"));

app.use(messageRoutes);

app.get("/", (req, res) => {
    res.send("Real-time chat server is running");
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


