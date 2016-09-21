'use strict';

const { Router } = require('express')
const router = Router()



router.post('/logout', (req, res) => {
		req.session.destroy((err) => {
			if (err) throw err
			res.redirect('/login')
		})
	})


router.get('/logout', (req, res) => {
			res.render('logout', {page: 'Logout'})
	})

module.exports = router
