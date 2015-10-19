var User  = require('../models/user.js')
var usersController = require('../controllers/usersController.js')
var authService = require('../middlewares/authService.js')

module.exports = function(app, express){
	var userRouter = express.Router()

	// unauthenticated route
	userRouter.post('/users', usersController.create)

	// authenticated routes
	userRouter.get('/users', authService.isAuthenticated, usersController.index)
	userRouter.get('/users/:id', authService.isAuthenticated, usersController.show)
	userRouter.put('/users/:id', authService.isAuthenticated, usersController.update)
	userRouter.patch('/users/:id', authService.isAuthenticated, usersController.update)
	userRouter.delete('/users/:id', authService.isAuthenticated, usersController.destroy)

	return userRouter
}


