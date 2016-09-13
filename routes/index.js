'use strict';

const { Router } = require('express')
const router = Router()

const { db } = require('../database')

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

	router.get('/404', (req,res) => {
		res.render('404')
	})

	router.post('/contact', (req, res) => {
		db().collection('contact')
			.insertOne(req.body)
			.then(() => res.redirect('/'))
			.catch(() => res.send('BAD'))
	})

	module.exports = router;

