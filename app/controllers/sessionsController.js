var User = require('../models/user.js')
var jwt = require('jsonwebtoken')
var secret = require('../../config.js').secret
var bodyParser = require('body-parser')

function create(req, res, next){

	User.findOne({
		username: req.body.username
	}).select('name username password todos').exec(function(err, user){
		if(err) throw err

		if(!user){
			res.json({success: false, message: "Can't find user with this username"})
		} else if(user){
			var validPassword = user.comparePassword(req.body.password)
			if(!validPassword){
				res.json({success: false, message: "username and password don't match"})
			} else {
				var token = jwt.sign({
					username: user.username,
					_id: user._id,
					todos: user.todos
				}, secret, {
					expiresInMinutes: 1440
				})

				res.json({
					success: true, 
					message: "enjoy your token",
					token: token
				})
			}
		}
	})
}

function me(req, res){
	console.log(req.decoded)
	res.send(req.decoded)
}

module.exports = {
	create: create,
	me: me
}





