const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

/* access all login  */
module.exports = (db) => {


  router.get("/", (req, res) => {
    // if (req.session.id === undefined) {
    //   res.redirect("login");
    // } else {

    //currently hardcoded 
    // const exam_id = 1; 
      db.query(
        `SELECT * FROM messages
                  WHERE appointment_id  = 1` 
      ).then((result) => {
        console.log(result.rows);
        res.json(result.rows)
      })
      .catch ((e)=> res.status(500).send(e));
    });

  

  router.post("/", function (req, res) {

    const info = req.body;
    console.log("==========from db", info)

    return db
      .query(
        `INSERT INTO messages (appointment_id,
          student_id, 
          timestamp, 
          message) VALUES ($1,$2,$3,$4) returning * `,
        [
          info.appointment_id,
          info.student_id,
          info.timestamp,
          info.eye
        ]
      )
      .then((message) => {
        if (!message) {
          console.log(`insert error ${error}!`);
          return;
        }
        console.log("message from db", message)
        return message;
      })
      .catch((e) => console.log(e));


  
  });

  return router;
};
