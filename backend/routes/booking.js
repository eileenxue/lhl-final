const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', function (req, res, next ) {
   
      db.query(
        `SELECT * FROM tests;`
      ).then((result) => {res.json(result.rows)})
      .catch (e=> (console.log(e)))
      })

  router.post("/", function (req, res) {

    const info = req.body;

    db.query(
        `INSERT INTO appointments (
          student_id, 
          proctor_id,
          test_id,
          start_date) VALUES ($1,$2,$3,$4) returning * `,
        [
          info.student_id,
          1,
          info.test_id,
          info.start_date
        ]
      )
      .then((appointment) => {
        return res.json(appointment);
      })
      .catch((e) => {console.log(e)});
  })
    
  return router;
};

