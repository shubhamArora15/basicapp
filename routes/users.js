var express = require('express');
var router = express.Router();

var users = require("../models/users");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  /*

    var userData = new users({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address
    });

      userData.save(function(err, data){
        if(data){
          res.send(data)
        }else{
        res.send(data)
      }

    });
  */
}).post('/login', function(req, res, next){

    /*
      users.findOne({email: req.body.email}, function(err, data){
        if(data!=null){
        res.send("successfully login")
      }
    })
    */
}).get('/verify', function(req, res, next){

    /*
      users.findOne({email: req.body.email}, function(err, data){
        if(data!=null){
        res.send("successfully login")
      }
    })
    */
});

module.exports = router;
