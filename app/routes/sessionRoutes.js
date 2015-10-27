var sessionsController = require('../controllers/sessionsController.js')
var authService = require('../middlewares/authService.js')

module.exports = function(app, express){
	var sessionsRouter = express.Router()

	sessionsRouter.post('/', sessionsController.create)
	sessionsRouter.get('/me', authService.isAuthenticated, sessionsController.me)

	return sessionsRouter
}



