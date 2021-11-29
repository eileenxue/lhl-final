const express = require('express');
const router = express.Router();


module.exports = (db) => {
  router.get('/', function (req, res, next ) {
   
      db.query(
        `SELECT * FROM tests ;`
      ).then((result) => 
      // console.log("from edit page backend ", result));
      res.status(200).json({ testTypeList: result.rows }));

  })

  return router;
};

