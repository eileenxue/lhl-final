const express = require('express');
const router = express.Router();


module.exports = (db) => {
  // router.get('/', function (req, res, next ) {
   
  //     db.query(
  //       `SELECT * FROM tests;`
  //     ).then((result) => {res.json(result.rows)})
  //     .catch (e=> (console.log(e)))
  // })

  router.get("/exam/:id", function (req, res) {
    // const {id} = req.params ----> here is the appointment id 
    // console.log('questions/exam/id params???', req.params);
    db.query(
      `SELECT users.first_name, tests.type, appointments.id as appointment_id, questions.*
      FROM questions
      Join tests on questions.test_id = tests.id 
      join appointments  on appointments.test_id = tests.id 
      join users on users.id = appointments.student_id
      WHERE appointments.id = ${req.params.id};`
    ).then((result) => {
      res.status(200).json({questions: result.rows})
    })
    .catch(e=>console.log(e))

  })


  router.post("/exam/:id", function (req,res) {
    console.log("equestions/exam/id post route", req.body , req.params)
  
    db.query(
      `UPDATE appointments
    SET final_score = '${req.body.score}'
    WHERE id = '${req.params.id}'; `
    ).then(() => res.send({ status: true }));

  })

  return router;
};

