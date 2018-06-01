var express = require('express');
var router = express.Router();
var youtube = require('./youtube');


/* GET home page. */
router.post('/api/upload', async function(req, res, next) {
  const youtubeResp = await youtube.upload(req.files.file);
  console.log(":: You Tube Respone  -  > ",youtubeResp);
  res.json({body: youtubeResp});
});

module.exports = router;
