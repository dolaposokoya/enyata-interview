const express = require('express')
const { createCustomer, loginCustomer } = require('../controllers/customer.controller')


const router = express.Router()

router.post('/create-customer', createCustomer)

router.post('/login-customer', loginCustomer)

module.exports = router