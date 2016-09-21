'use strict';

const { Router } = require('express')
const router = Router()
const { index } = require('../controllers/aboutCtrl')

router.get('/about', index)

module.exports = router
