const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Vnesi ime'],
  },
  email: {
    type: String,
    required: [true, 'Vnesi email'],
    lowercase: true, 
    validate: [validator.isEmail,'Pishi validen email'],
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'other'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Pass e potreben'],
    minlength: [6 , 'minimum 6'],
  },
});


userSchema.pre('save', async function(next){
  if (!this.isModified('password'))return next();
  this.password = await bcrypt.hash(this.password,12);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;