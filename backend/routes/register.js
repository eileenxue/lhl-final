const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

/* access all login  */
module.exports = (db) => {
  const registerNewUser = function (
    first_name,
    last_name,
    email,
    is_proctor,
    password
  ) {
    const salt = bcrypt.genSaltSync(10);
    const hashPW = function (userPW) {
      return bcrypt.hashSync(userPW, salt);
    };

    return db
      .query(
        `INSER INTO users (first_name, last_name, email, is_proctor, password) VALUES ($1,$2,$3,$4,$5) returning *  `,
        [
          first_name,
          last_name,
          ,
          email.toLowerCase(),
          is_proctor,
          hashPW(password),
        ]
      )
      .then((user) => {
        if (!user) {
          console.log("error!");
          return;
        }
        return user;
      })
      .catch((e) => console.log(e));
  };
  exports.registerNewUser = registerNewUser;

  router.post("/", function (req, res) {
    const info = req.body;

    registerNewUser(info.first_name, info.last_name, info.email, info.is_proctor, info.password).then(
      (result) => {

        if (!result) {
          res.status(500).send("wrong info!");
        } else {
          
        }
      })


  });

  return router;
};
