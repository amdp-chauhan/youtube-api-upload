var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(":: GET Returned from OAuth called :: ");
  console.log(":: GET req.body - > ",req.body);
  console.log(":: GET req.query - > ",req.query);
  console.log(":: GET req.params - > ",req.params);
  res.end("yo");
});

router.post('/', function(req, res, next) {
  console.log(":: POST Returned from OAuth called :: ");
  console.log(":: POST req.body - > ",req.body);
  console.log(":: POST req.query - > ",req.query);
  console.log(":: POST req.params - > ",req.params);
  res.end("yo");
});

module.exports = router;
