var mongoose = require('mongoose');

module.exports = mongoose.model('Creature', {
  creature: {type: Object, default: ''}
});
