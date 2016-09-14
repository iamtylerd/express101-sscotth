'use strict';

const { Router } = require('express')
const router = Router()

const Contact = require('../models/contact')
const Order = require('../models/order')
const Size = require('../models/size')
const Topping = require('../models/topping')

// Route
	router.get('/', (req,res) =>
		res.render('page')
	)

	router.get('/about', (req,res) => {
		res.render('about',  { page: 'about' })
	})

	router.get('/contact', (req,res) => {
		res.render('contact',  { page: 'contact' })
	})

	router.get('/order', (req,res, err) =>
		Promise
			.all([
				Size.find().sort({ inches: 1 }),
				Topping.find().sort({name: 1})
			])
			.then(([sizes, toppings]) => res.render('order', {page: 'Order', sizes, toppings}))
			.catch(err)
	)

	router.get('/404', (req,res) => {
		res.render('404')
	})


	router.post('/contact', (req, res, next) => {
		Contact
			.create(req.body)
			.then(() => res.redirect('/'))
			.catch(next)
	})

	router.post('/order', (req, res) => {
		Order
			.create(req.body)
			.then(() => res.redirect('/'))
			.catch(() => res.send('BAD'))
	})

	module.exports = router;

