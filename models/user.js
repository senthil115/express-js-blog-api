const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9]{3,20}$/.test(v);
      },
      message: props => `${props.value} is not a valid username!`
    }
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.methods.comparePassword = function (plainTextPassword) {
  return this.password === plainTextPassword;
};

const User = mongoose.model('User', userSchema);

module.exports = User;