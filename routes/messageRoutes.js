import express from "express";
import { getAllMessages } from "../models/messageModel.js";

const router = express.Router();

router.get("/messages",(req,res)=>{

    getAllMessages((err,results)=>{
        if(err){
            console.error("Error fetching messages:",err.message);
            return res.status(500).json({ error:"Failed to fetch messages"});
        }
        res.json(results);
    });
});
export default router;