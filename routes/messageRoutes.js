import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/messages",(req,res)=>{
    const sql = "SELECT * FROM messages ORDER BY id ASC";

    db.query(sql,(err,results)=>{
        if(err){
            console.error("Error fetching messages:",err.message);
            return res.status(500).json({ error:"Failed to fetch messages"});
        }
        res.json(results);
    });
});
export default router;