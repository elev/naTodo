var mongoose = require('mongoose');

module.exports = mongoose.model('Type', {
	text : String,
	parent : String
});