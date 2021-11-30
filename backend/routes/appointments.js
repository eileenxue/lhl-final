const express = require('express');
const router = express.Router();


module.exports = (db) => {
  router.get('/', function (req, res, next ) {
      db.query(
        `SELECT * FROM appointments ;`
      ).then((result) => {res.json(result.rows)})
      .catch (e=> (console.log(e)))
  })

  return router;
};

