var mongoose = require('mongoose');

module.exports = mongoose.model('Album', {
  title: {type: String, default: ''},
  artist: {type: String, default: ''}
});
