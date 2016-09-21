'use strict';

const Contact = require('../models/contact')

module.exports.new = (req,res) => {
		res.render('contact',  { page: 'contact' })
	}

module.exports.create = (req, res, next) => {
	Contact
		.create(req.body)
		.then(() => res.redirect('/'))
		.catch(next)
}
