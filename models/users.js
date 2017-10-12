var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name:{
    type: Number
  },
  phone:{
    type: String
  },
  email:{
    type:String
  },
  password:{
    type: String
  },
  address:{
    type:String
  }
});

var userModel = mongoose.model('user', userSchema);
module.exports = userModel
