'use strict';

const { Router } = require('express')
const router = Router()
const bcrypt = require('bcrypt')

const Contact = require('../models/contact')
const Order = require('../models/order')
const Size = require('../models/size')
const Topping = require('../models/topping')
const User = require('../models/user')


// Route
	router.get('/', (req,res) =>
		res.render('page')
	)
	router.get('/login', (req,res) =>
		res.render('login', {page: 'login'})
	)

	router.post('/login', ({ body: { email, password } }, res, err) => {
  User.findOne({ email })
    .then(user => {
      if (user) {
        return new Promise((resolve, reject) => {
          bcrypt.compare(password, user.password, (err, matches) => {
            if (err) {
              reject(err)
            } else {
              resolve(matches)
            }
          })
        })
      } else {
        res.render('login', { msg: 'Email does not exist in our system' })
      }
    })
    .then((matches) => {
      if (matches) {
        res.redirect('/')
      } else {
        res.render('login', { msg: 'Password does not match' })
      }
    })
    .catch(err)
})

router.get('/register', (req, res) =>
  res.render('register')
)

router.post('/register', ({ body: { email, password, confirmation } }, res, err) => {
  if (password === confirmation) {
    User.findOne({ email })
      .then(user => {
        if (user) {
          res.render('register', { msg: 'Email is already registered' })
        } else {
        	// Create a new promise bcrypt does not support native promises
          return new Promise((resolve, reject) => {
            bcrypt.hash(password, 15, (err, hash) => {
              if (err) {
                reject(err)
              } else {
              	// Async fires and returns the hashed password
                resolve(hash)
              }
            })
          })
        }
      })
      .then(hash => User.create({ email, password: hash }))
      .then(() => res.redirect('/login'), { msg: 'User created' })
      .catch(err)
  } else {
    res.render('register', { msg: 'Password & password confirmation do not match' })
  }
})

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

	router.post('/order', (req, res, error) => {
		Order
			.create(req.body)
			.then(() => res.redirect('/'))
			.catch((error) => {
				const msg = Object.keys(error.errors).map(key => error.errors[key].message);
				 return Promise
					.all([
						Size.find().sort({ inches: 1 }),
						Topping.find().sort({name: 1})
			])
			.then(([sizes,toppings]) =>	{
				res.render('order', {page :'order', sizes, toppings, msg})
			});
		});
	});
	module.exports = router;

