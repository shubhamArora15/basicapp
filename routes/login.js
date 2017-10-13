var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');
var users = require("../models/users");


router.post('/', function(req, res, next){

      users.findOne({email: req.body.user.email}, function(err, data){

            if(data==null){
            res.send("not")
          }else{
            res.send("yes");
          }
        })
});

module.exports = router;
