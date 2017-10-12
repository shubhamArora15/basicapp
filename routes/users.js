
var express = require('express');
var router = express.Router();

var users = require("../models/users");

/* GET users listing. */
router.post('/', function(req, res, next) {

    var userData = new users({
      name: req.body.name,
      phone: req.body.user.phone,
      email: req.body.user.email,
      password: req.body.user.password,
    });

      userData.save(function(err, data){
        if(data){
          res.send(data);
        }else{
          res.send("nothing");
        }

    });

}).post('/login', function(req, res, next){

      users.findOne({email: req.body.user.email}, function(err, data){

            if(data==null){
            res.send("not")
          }else{
            res.send("yes");
          }
        })
}).post('/reset', function(req, res, next){

    /*
      users.findOne({email: req.body.email}, function(err, data){
        if(data!=null){
        res.send("successfully login")
        res.sendFile("views/signup.html")
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
