const express = require('express');
const router = express.Router();


module.exports = (db) => {
  router.get('/', function (req, res, next ) {
   
      db.query(
        `SELECT * FROM questions;`
      ).then((result) => {res.json(result.rows)})
      .catch (e=> (console.log(e)))
  })

  router.get("/test/:id", function (req, res) {
    const {id} = req.params
    db.query(
      `SELECT * FROM questions
       WHERE test_id = ${id};`
    ).then((result) => {
      console.log(`Here are the questions for this exam:`, result.rows);
      res.status(200).json({questions: result.rows})
    })
    .catch(e=>console.log(e))
  })

  return router;
};

