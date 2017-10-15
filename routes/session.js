
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var multer  =   require('multer');

var session = require("../models/session");

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './images');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname);
  }
});
var upload = multer({ storage : storage }).array('sessionPhoto',3);

/* GET session listing. */

router.post('/', function(req, res, next) {

if(req.body.createSession){
  session.find({session:req.body.session.name},function(err, data){
    if(data.length > 0 ){
      res.send("already")
    }else{

      var sessionData = new session({
        session: req.body.session.name,
        photos: req.body.photos,
        userId: req.body.userId
      });

      sessionData.save(function(err, data){
        if(data){
          res.send(data);
        }else{
          res.send("nothing");
        }
    });
    }
  });
}else if(req.body.viewSession){
  session.find({userId:req.body.userId},function(err, data){
      if(data.length > 0){
        res.send(data)
      }  else{
        res.send("404");
      }
  });
}
});

module.exports = router;
