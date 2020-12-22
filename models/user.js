var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
  id: String,
  role: String,
  email: String,
  username: String,
  password: String,
  created: {type: Date, default: Date.now}
});
