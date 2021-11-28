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

  // router.get("/", verify, function (req, res) {
  //   if(!req.user.is_proctor){ 
  //    return  res.status(403).json("You are not allowed to see this information")
  //   }
  //   db.query(
  //     `SELECT * FROM appointments ;`
  //   ).then((result) => {res.json(result.rows)})
  //   .catch (e=> (console.log(e)))
  // });

  router.post("/", function (req, res) {
    res.json("12344");
  });

  router.get("/student/:id", function (req, res) {
    const {id} = req.params
    db.query(
      `SELECT appointments.id, appointments.test_id, start_date, 
                student_id, tests.type
       FROM appointments 
       JOIN tests ON appointments.test_id=tests.id 
       WHERE student_id = ${id} and start_date >= CURRENT_DATE 
       order by  start_date ;`
    ).then((result) => {
      console.log("here it is:", result.rows);
      res.status(200).json({test: result.rows})
    })
    .catch(e=>console.log(e))
  })

  router.get("/admin/:id", function (req, res) {
    console.log("proctor appointments dashboard backend",req.params)
    console.log("proctor appointments dashboard backend",)
    const {id} = req.params
    db.query(
      `SELECT appointments.*, tests.type 
      FROM appointments 
      JOIN tests ON appointments.test_id=tests.id 
      WHERE proctor_id = ${id} and start_date = CURRENT_DATE ;`
    ).then((result) => {
      console.log("here it is:", result.rows);
      res.status(200).json({test: result.rows})
    })
    .catch(e=>console.log(e))
  })



  // router.get("/dashboard/admin/:id", function (req, res) {

  // })

  return router;
};
