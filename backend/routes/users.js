var express = require('express');
var router = express.Router();

/* GET users listing. */

module.exports = (db) => {
  router.get('/', function(req, res) {
    db.query(
      `SELECT * FROM users ;`
    ).then((result) => {res.json(result.rows)})
    .catch (e=> (console.log(e)))
    
    // res.send('TESTTESTESTRST')
  });
  

  return router;
};  
