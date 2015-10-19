var jwt = require('jsonwebtoken')
var config = require('../../config.js')
var secret = config.secret

function isAuthenticated(req, res, next){
	var token = req.body.token || req.query.token || req.headers['x-access-token']

	if(token){
		jwt.verify(token, secret, function(err, decoded){
			if(err){
				res.status(403).send({
					success: false,
					message: "couldn't authenticate token"
				})
			} else {
				req.decoded = decoded;
				next()
			}
		})
	} else {
		res.send(403).send({
			success: false,
			message: 'no token provided'
		})
	}

}


module.exports = {
	isAuthenticated: isAuthenticated
}










