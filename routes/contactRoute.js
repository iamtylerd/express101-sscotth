'use strict';

const { Router } = require('express')
const router = Router()

const contact = require('../controllers/contactCtrl')

// Do Stuff

router.get('/contact', contact.new)
router.post('/contact', contact.create)

module.exports = router
