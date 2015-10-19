var sessionsController = require('../controllers/sessionsController.js')

module.exports = function(app, express){
	var sessionsRouter = express.Router()

	sessionsRouter.post('/authtoken', sessionsController.create)

	return sessionsRouter
}



