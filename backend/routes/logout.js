var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const myPrivateKey = process.env.PRIVKEY;
require("dotenv").config();

module.exports = (db) => {
  
  const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
  
      jwt.verify(token, myPrivateKey, (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid!");
        }
  
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("You are not authenticated!");
    }
  };

  router.get("/", function (req, res) {
    res.send("TESTTESTESTRST");
  });

  router.post("/", verify, function (req, res) {
    const accessToken = req.body.token; 

    res.status(200).json("you logged out successfully")

  });



  return router;
};
