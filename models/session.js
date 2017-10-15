var mongoose = require('mongoose');

var sessionSchema = mongoose.Schema({
  session:{
    type: String
  },
  photos:[],
  userId:{
    type:String
  }
});

var sessionModel = mongoose.model('session', sessionSchema);
module.exports = sessionModel
