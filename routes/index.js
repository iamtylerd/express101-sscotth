'use strict';

const { Router } = require('express')
const router = Router()
const bcrypt = require('bcrypt')

const Order = require('../models/order')
const Size = require('../models/size')
const Topping = require('../models/topping')
const User = require('../models/user')

const about = require('./aboutRoute')
const contact = require('./contactRoute')
const login = require('./loginRoute')
const logout = require('./logoutRoute')
const order = require('./orderRoute')
const register = require('./registerRoute')

// Route
router.get('/', (req,res) =>
	res.render('page')
)
//Public Routes
router.use(contact)
router.use(about)
router.use(login)
router.use(register)

router.get('/404', (req,res) => {
	res.render('404')
})

	// guard middleware
router.use((req, res, next) => {
	if(req.session.email) {
		next()
	} else {
		res.redirect('/login')
	}
})
//Private Routes
	router.use(order)
	router.use(logout)

	module.exports = router;
