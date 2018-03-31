var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
   res.send('enter.');
});
router.post('/', function(req, res){
   res.send('1POST home on things.');
});


router.get('/home', function(req, res){
   res.send('welcome');
});



//export this router to use in our index.js
module.exports = router;