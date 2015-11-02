var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var morgan = require('morgan')
var config = require('./config.js')
var path = require('path')
var port = process.env.PORT || 8080

console.log(config.development.database)
console.log(app.settings.env)

mongoose.connect(config[app.settings.env]['database'])

app.use(express.static(__dirname + '/client'))

app.use(bodyParser.json())
app.use(morgan('dev'))

var userRoutes = require('./app/routes/userRoutes.js')(app, express)
app.use('/api/users', userRoutes)

var sessionRoutes = require('./app/routes/sessionRoutes.js')(app, express)
app.use('/api/sessions', sessionRoutes)


app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.listen(port)

console.log("listening on port", port)










