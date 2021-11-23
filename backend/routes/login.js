var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const myPrivateKey = process.env.PRIVKEY;
require("dotenv").config();

module.exports = (db) => {
  router.get("/", function (req, res) {
    res.send("TESTTESTESTRST");
  });

  const getUserWithEmail = function (email) {
    return db
      .query(`SELECT * FROM users WHERE email = $1`, [email.toLowerCase()])
      .then((result) => {
        return result.rows[0];
      })
      .catch((err) => {
        return null;
      });
  };
  exports.getUserWithEmail = getUserWithEmail;

  const login = function (candidateEmail, candidatePassword) {
    return getUserWithEmail(candidateEmail).then((user) => {
      if (bcrypt.compareSync(candidatePassword, user.password)) {
        return user;
      }
      return null;
    });
  };
  exports.login = login;

  router.post("/", function (req, res) {
    const { email, password } = req.body;

    login(email, password).then((user) => {
      
      // if not find the user
      if (!user) {
        res.status(400).send("username or password incorrect");
      }
      // if find the user, generate access token
      const accessToken = jwt.sign(
        {
          id: user.id,
          is_proctor: user.is_proctor,
        },
        myPrivateKey
      );
      // grab information
      res.json({
        id: user.id,
        first_name: user.first_name,
        is_proctor: user.is_proctor,
        accessToken,
      });
    });
  });

  return router;
};
