'use strict';

const { Router } = require('express')
const router = Router()
const bcrypt = require('bcrypt')
const register = require('../controllers/registerCtrl')




router.get('/register', register.new)

router.post('/register', register.create)

module.exports = router
