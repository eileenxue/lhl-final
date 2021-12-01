const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //Delete function route

  router.get("/:appointment_id", (req, res) => {
    console.log("/exam/id backend", req.params.appointment_id);
    db.query(
    `select users.first_name as first_name, users.id as student_id, appointments.id as id, tests.type
      from appointments 
      join users on users.id = appointments.student_id
      join tests on tests.id = appointments.test_id
     where appointments.id = '${req.params.appointment_id}';`
    // ).then((result) => console.log("got it from the backend +++++ finish exam"));
    ).then((result) => res.status(200).json({ test: result.rows }));
        // ).then((result) => console.log(result));
  });

  // router.post("/:appointment_id", (req, res) => {
  //   console.log("from backend ---post",req.params);
  //   console.log("from backend ---post",req.body.start_date);

  //   db.query(
  //     `UPDATE appointments
  //   SET start_date = '${req.body.start_date}'
  //   WHERE id = '${req.params.appointment_id}' ; `
  //   )
  //   .then(()=>res.send({status:true})); ;
  // });

  return router;
};
