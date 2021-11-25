const express = require('express');
const tests = express.Router();

/* access all test  */
module.exports = (db) => {
  tests.get('/', function(req, res, next) {
    db.query(
      `SELECT * FROM tests`
    ).then((result) => {
      res.json(result.rows)
    })
  });
  tests.get('/:test_id', function(req, res, next) {
    res.json({})
  });
  tests.get('/:test_id/questions', function(req, res, next) {
    res.json({})
  });
  tests.get('/:test_id/questions/:question_id', function(req, res, next) {
    res.json({})
  });
  return tests;  
}