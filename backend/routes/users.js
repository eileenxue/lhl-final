var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  const users = [
    {
      id: 1,
      first_name: "Bob",
      last_name: "1",
      email: "bob1@gmail.com",
      password: "123",
    },
    {
      id: 2,
      first_name: "Bob",
      last_name: "2",
      email: "bob2@gmail.com",
      password: "123",
    },
    {
      id: 3,
      first_name: "Bob",
      last_name: "3",
      email: "bob3@gmail.com",
      password: "123",
    },
  ];
  res.json(users);
  // res.send('TESTTESTESTRST');
});


router.get('/:user_id', function(req, res, next) {
  const user = {
    id: 2,
      first_name: "Bob",
      last_name: "2",
      email: "bob2@gmail.com",
      password: "123",
  }

  res.json({});
});


module.exports = router;


