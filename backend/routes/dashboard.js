var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const myPrivateKey = process.env.PRIVKEY;
require("dotenv").config();


// apppointments is dashboards 
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

  router.get("/", verify, function (req, res) {
      // console.log(req.user);
    if(req.user.is_proctor){
      db.query(
        `SELECT * FROM appointments ;`
      ).then((result) => {res.json(result.rows)})
      .catch (e=> (console.log(e)))
    }
    else {
      res.status(403).json("You are not allowed to see this information")
    }
  });

  router.post("/", function (req, res) {
    res.json("12344");
  });

  return router;
};
