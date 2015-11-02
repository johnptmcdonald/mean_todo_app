var Todo = require('../models/todo.js')
var User = require('../models/user.js')

	function index(req, res){
		var user;
		console.log(req.params.id)
		User.findById(req.params.id).populate('todos').exec(function(err, user){
			if(err) throw err
			if(!user){
				res.json({success: false, message: "Can't find user with this username"})
			} else if(user){
				res.send(user.todos)
			}
		})
	}

	function create(req, res){
		console.log(req.decoded)
		var user 
		console.log(req.body.body)
		var todo = new Todo()
		todo.body = req.body.body
		todo.done = false

		
		User.findById(req.params.id).exec(function(err, user){
			if(err) throw err
			if(!user){
				res.json({success: false, message: "Can't find user with this username"})
			} else if(user){
				todo.save(function(err, todo){
					if(err){return next(err)} 
					user.todos.push(todo)
					user.save(function(err, user){
						if(err){return next(err)}
						res.json(todo)
					})
												
				})				
			}
		})


	}


module.exports = {
	index: index,
	create: create
}









