var Todo = require('../models/todo.js')
var User = require('../models/user.js')

	function index(req, res){
		User.findById(req.decoded._id).populate('todos').exec(function(err, user){
			if(err) throw err
			if(!user){
				res.json({success: false, message: "Can't find user with this username"})
			} else if(user){
				res.send(user.todos)
			}
		})
	}

	function create(req, res){
		var todo = new Todo()
		todo.body = req.body.body
		todo.done = false

		User.findById(req.decoded._id).exec(function(err, user){
			if(err) throw err
			if(!user){
				res.json({success: false, message: "Can't find user with this username"})
			} else if(user){
				todo.user = user
				todo.save(function(err, todo){
					if(err){return next(err)} 
					user.todos.push(todo)
					user.save(function(err, user){
						if(err){return next(err)}
						res.json({success: "true", body: todo.body, done: false})
					})
												
				})				
			}
		})
	}

	function update(req, res){
		User.findById(req.decoded._id).exec(function(err, user){
			if(err) throw err
			if(!user){
				res.json({success: false, message: "Can't find user with this username"})
			} else if(user){
				if(user.todos.indexOf(req.params.todo_id) > 0){
					Todo.findById(req.params.todo_id).exec(function(err, todo){
						todo.done = !todo.done
						todo.save(function(err, todo){
							if(err){return next(err)}
							res.json(todo)
						})
					})
				}		
			}
		})		
	}


module.exports = {
	index: index,
	create: create,
	update: update
}









