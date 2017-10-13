var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');
var users = require("../models/users");


router.post('/', function(req, res, next){

      users.update({email: req.body.email},{$set:{password:req.body.user.newPassword}}, function(err, data){

          if(data){
            res.send("yes");
          }else{
            res.send("no");
          }
        })
});

module.exports = router;
