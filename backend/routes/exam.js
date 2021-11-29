// const express = require("express");
// const router = express.Router();

// module.exports = (db) => {
//   //Delete function route

//   router.get("/:appointment_id", (req, res) => {
//     db.query(
//     `select questions.question, questions.answer1, questions.answer2, questions.answer3, questions
//       from appointments 
//       join tests on tests.id = appointments.test_id
//       join users on users.id = appointments.student_id
//       join questions where questions.test_id = tests.id 
//      where appointments.id = ${req.params.appointment_id}`
//     // ).then((result) => console.log("got it from the backend +++++ finish exam"));
//     ).then((result) => res.status(200).json({ questions: result.rows }));
//   });

//   // router.post("/:appointment_id", (req, res) => {
//   //   console.log("from backend ---post",req.params);
//   //   console.log("from backend ---post",req.body.start_date);

//   //   db.query(
//   //     `UPDATE appointments
//   //   SET start_date = '${req.body.start_date}'
//   //   WHERE id = '${req.params.appointment_id}' ; `
//   //   )
//   //   .then(()=>res.send({status:true})); ;
//   // });

//   return router;
// };
