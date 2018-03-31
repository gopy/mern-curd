var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
   res.send('1GET home on things.');
});
router.post('/', function(req, res){
   res.send('1POST home on things.');
});

router.post('/', function(req, res){
   res.send('1POST home on things.');
});

//export this router to use in our index.js
module.exports = router;