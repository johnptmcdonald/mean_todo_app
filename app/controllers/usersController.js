var User = require('../models/user.js')

function index(req, res){
	User.find({}, function(err, users){
		if(err) res.send(err)
		res.json(users)
	})
}

function show(req, res){
	console.log(req.params.id)
	User.findById(req.params.id).populate('todos').exec(function(err, user){
		if(err) res.send(err)
		res.json(user)
	})
}

function create(req, res){
	var user = new User()

	user.name = req.body.name
	user.username = req.body.username
	user.password = req.body.password

	user.save(function(err){
		if(err){
			if(err.code == 11000){
				return res.json({success: false, message: "username already exists, sorry"})
			} else {
				return res.send(err)
			}
		}
		res.json({success: true, message: "user created"})
	})
}

function update(req, res){
	User.findById(req.params.id, function(err, user){
		if(err){
			res.send(err)
		} 

		if(req.body.name) user.name = req.body.name
		if(req.body.username) user.username = req.body.username
		if(req.body.password) user.password = req.body.password
		
		user.save(function(err){
			if(err) res.send(err)
			res.json({success: true, message: "user updated"})
		})
	})
}

function destroy(req, res){
	User.remove({
		_id: req.params.id
	}, function(err, user){
		if(err) res.send(err)
		res.json({success: true, message: "user deleted"})
	})
}

module.exports = {
	index: index,
	show: show,
	create: create,
	update: update,
	destroy: destroy
}

