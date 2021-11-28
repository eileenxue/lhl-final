const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //Delete function route

  router.post("/:appointment_id", (req, res) => {
    // console.log("delete???????");
    // console.log(req.params);
    db.query(
      `delete from appointments where id = ${req.params.appointment_id}; `
    ).then(() => res.send({status : true }));
  });

  return router;
};
