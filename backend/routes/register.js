const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

/* access all login  */
module.exports = () => {

  router.post("/", function (req, res) {
    res.send('TESTTESTESTRST');
  });

  return router;
};
