var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var morgan = require('morgan')
var config = require('./config.js')
var port = process.env.PORT || 8080

console.log(config.development.database)
console.log(app.settings.env)

mongoose.connect(config[app.settings.env]['database'])

app.use(bodyParser.json())
app.use(morgan('dev'))

var userRoutes = require('./app/routes/userRoutes.js')(app, express)
app.use('/api', userRoutes)

var sessionRoutes = require('./app/routes/sessionRoutes.js')(app, express)
app.use('/api', sessionRoutes)

app.listen(port)

console.log("listening on port", port)










