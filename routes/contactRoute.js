'use strict';

const { Router } = require('express')
const router = Router()
const Contact = require('../models/contact')

// Do Stuff

router.get('/contact', (req,res) => {
		res.render('contact',  { page: 'contact' })
	})

router.post('/contact', (req, res, next) => {
	Contact
		.create(req.body)
		.then(() => res.redirect('/'))
		.catch(next)
})

module.exports = router
