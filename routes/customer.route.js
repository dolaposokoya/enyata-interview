const express = require('express')
const { createCustomer, loginCustomer } = require('../controllers/customer.controller')


const router = express.Router()

router.post('/create', createCustomer)

router.post('/login', loginCustomer)

module.exports = router