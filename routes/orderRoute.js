'use strict';

const { Router } = require('express')
const router = Router()
const order = require('../controllers/orderCtrl')

router.get('/order', order.new)

router.post('/order', order.create)

module.exports = router
