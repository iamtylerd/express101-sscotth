'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const chalk = require('chalk')


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


// Route
	app.get('/', (req,res) =>
		res.render('page')
	)

	app.get('/about', (req,res) => {
		res.render('about',  { page: 'about' })
	})

	app.get('/contact', (req,res) => {
		res.render('contact',  { page: 'contact' })
	})

	app.get('/404', (req,res) => {
		res.render('404')
	})

	app.post('/contact', (req, res) => {
		console.log(req.body)
		res.redirect('/')
	})


//404 catch and pass to error handler
app.use((req, res) => {
	// console.error('404')
	// const err = Error('Not Found')
	// err.status = 404
	// next(err)
	res.render('404')
})

//Error handling middleware - at bottom
app.use((err, req, res, next) => {
	res.sendStatus(err.status || 500)
	console.log(`${new Date()} ${chalk.red(req.method)} Error (${res.statusCode}):${res.statusMessage} ${req.headers['user-agent']}`)
})

app.listen(port, () =>
	console.log(`Express server listening on port ${port}`)
)
