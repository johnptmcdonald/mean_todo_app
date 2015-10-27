var User  = require('../models/user.js')
var usersController = require('../controllers/usersController.js')
var authService = require('../middlewares/authService.js')

module.exports = function(app, express){
	var userRouter = express.Router()

	// unauthenticated route
	userRouter.post('/', usersController.create)

	// authenticated routes
	// these should have authService.isAuthenticated as middleware
	userRouter.get('/', authService.isAuthenticated, usersController.index)
	userRouter.get('/:id', authService.isAuthenticated, usersController.show)
	userRouter.put('/:id', authService.isAuthenticated, usersController.update)
	userRouter.patch('/:id', authService.isAuthenticated, usersController.update)
	userRouter.delete('/:id', authService.isAuthenticated, usersController.destroy)

	return userRouter
}


