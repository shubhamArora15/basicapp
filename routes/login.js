var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');
var users = require("../models/users");


router.post('/', function(req, res, next){
      console.log(req.body);
      users.find({email: req.body.user.email,password:req.body.user.password}, function(err, data){
          console.log(data);
          if(data.length == 0 || data == undefined){
          res.send("not")
        }else{
          res.send(data);
        }
      });
});

module.exports = router;
