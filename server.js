'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const chalk = require('chalk')


const routes = require('./routes/')
const { connect } = require('../db/database')

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



//Middlewares about routes
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
