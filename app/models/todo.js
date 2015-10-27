var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
	body: String,
	done: Boolean,
	user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

module.exports = mongoose.model('Todo', TodoSchema)






