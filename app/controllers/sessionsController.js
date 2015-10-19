var User = require('../models/user.js')
var jwt = require('jsonwebtoken')
var secret = require('../../config.js').secret
var bodyParser = require('body-parser')

function create(req, res, next){

	User.findOne({
		username: req.body.username
	}).select('name username password').exec(function(err, user){
		if(err) throw err

		if(!user){
			res.json({success: false, message: "Can't find user with this username"})
		} else if(user){
			var validPassword = user.comparePassword(req.body.password)
			if(!validPassword){
				res.json({success: false, message: "username and password don't match"})
			} else {
				var token = jwt.sign({
					name: user.name,
					username: user.username
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

module.exports = {
	create: create
}





