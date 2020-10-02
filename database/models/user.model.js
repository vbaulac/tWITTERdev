const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const schema = mongoose.Schema;

const userSchema = schema({
  username: { type: String, required: true, unique: true },
  local: {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String }
  }
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hash(password, 10);
}

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.local.password);
}

const User = mongoose.model('user', userSchema);
module.exports = User;