var User  = require('../models/user.js')
var usersController = require('../controllers/usersController.js')

module.exports = function(app, express){
	var userRouter = express.Router()

	userRouter.get('/test', function(req, res){
		res.json({message: "userRouter works!"})
	})

	userRouter.get('/users', usersController.index)
	userRouter.post('/users', usersController.create)
	userRouter.get('/users/:id', usersController.show)
	userRouter.put('/users/:id', usersController.update)
	userRouter.patch('/users/:id', usersController.update)
	userRouter.delete('/users/:id', usersController.destroy)

	return userRouter
}


