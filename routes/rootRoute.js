const { Router } = require('express')
const router = Router()
const { index } = require('../controllers/rootCtrl')

router.get('/', index)

module.exports = router
