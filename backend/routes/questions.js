const express = require('express');
const router = express.Router();


module.exports = (db) => {
  router.get('/', function (req, res, next ) {
   
      db.query(
        `SELECT * FROM questions;`
      ).then((result) => {res.json(result.rows)})
      .catch (e=> (console.log(e)))
      
      // res.send('TESTTESTESTRST')
  })

  return router;
};

