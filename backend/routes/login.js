const express = require('express');
const login = express.Router();

/* access all login  */
login.post('/', function(req, res, next) {
  res.json({})
});


module.exports = login;
