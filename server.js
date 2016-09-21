'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const chalk = require('chalk')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)


const routes = require('./routes/')
const  connect  = require('./db/database').connect

const app = express();

//set a globabl port variable
const port = process.env.PORT || 3000
app.set('port', port)



// app.engine('handlebars', hbs());
// app.set('views', 'views');

//do not have to declare ejs / pug templates
app.set('view engine', 'pug');

if(process.env.NODE_ENV !== 'production') {
	app.locals.pretty = true
}
app.locals.company = "Pizza Tyler"
app.locals.user = {email: 'a@b.com'}
app.locals.errors = {} // errors & body added to avoid guard statements
app.locals.body = {}


//Middlewares about routes
//Add url: heroku env var to RedisStore
app.use(session({
  store: new RedisStore({
  	url: process.env.REDIS_URL || 'redis://localhost:6379'
  }),
  secret: 'pizzadescottsupersecretkey'
}))

app.use((req, res, next) => {
  app.locals.email = req.session.email
  next()
})

app.use((req, res, next) => {
	console.log(`${new Date()} ${chalk.cyan(req.method)} ${req.headers['user-agent']}`)
	//Call back to end the request
	next()
})



app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use(routes)


//404 catch and pass to error handler
app.use((req, res) => {
	res.render('404')
})

//Error handling middleware - at bottom
app.use((err, req, res, next) => {
	res.sendStatus(err.status || 500)
	console.log(`${new Date()} ${chalk.red(req.method)} Error (${res.statusCode}):${res.statusMessage} ${req.headers['user-agent']}`)
	console.error(err.stack)
})

connect()
	.then(() => {
		// Only opens the port after connecting to Mongo
		app.listen(port, () =>
			console.log(`Express server listening on port ${port}`)
		)
	})
	.catch(console.error)
