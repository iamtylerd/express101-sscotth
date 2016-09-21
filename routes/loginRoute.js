'use strict';

const { Router } = require('express')
const router = Router()
const bcrypt = require('bcrypt')
const login = require('../controllers/loginCtrl')

router.get('/login', login.new)

router.post('/login', login.create)

module.exports = router
