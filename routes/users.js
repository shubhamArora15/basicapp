
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

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

});

module.exports = router;
