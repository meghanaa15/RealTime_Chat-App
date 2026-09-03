import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer);

const PORT = 5000;

app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.send("Real-time chat server is running");
});

io.on("connection",(socket)=>{
    console.log("A user connected");

    socket.on("chatMessage",(data)=>{
        console.log("Message Received:",data);

        io.emit("chatMessage",data);
    });

    socket.on("disconnect",()=>{
    console.log("User disconnected");
    });
});

httpServer.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

