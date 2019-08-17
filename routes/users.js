var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res){
    console.log("login uid: " + req.body.uid + " psw:" + req.body.psw);
});

router.post('/logout', function(req, res){
    console.log("logout uid:" + req.body.uid);
});

router.post('/getData', function(req, res){

});

router.post('/setData', function(req, res){

});

module.exports = router;
