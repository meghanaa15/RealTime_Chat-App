import db from "../config/db.js";

export const getAllMessages = (callback) => {

    const sql = "SELECT * FROM messages ORDER BY id ASC";
    db.query(sql,callback);

};