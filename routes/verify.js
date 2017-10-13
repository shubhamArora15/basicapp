var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');

var users = require("../models/users");

router.post('/', function(req, res, next){
  // console.log(req);
  if((req.protocol+"://"+req.get('host'))==("http://localhost:3000"))
  {
      console.log("Domain is matched. Information is from Authentic email");
      if(true)
      {
          console.log("email is verified");
          res.end("<h1>Email "+"mailOptions.to"+" is been Successfully verified");
      }
      else
      {
          console.log("email is not verified");
          res.end("<h1>Bad Request</h1>");
      }
  }
  else
  {
      res.end("<h1>Request is from unknown source");
  }
});

module.exports = router;
