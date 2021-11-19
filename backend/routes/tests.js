const express = require('express');
const tests = express.Router();

/* access all test  */
tests.get('/', function(req, res, next) {
  res.json({})
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

module.exports = tests;
