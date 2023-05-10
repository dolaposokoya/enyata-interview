const express = require('express')
const { createCustomer, loginCustomer, checkIfCustomerExist } = require('../controllers/customer.controller')


const router = express.Router()

router.post('/create', checkIfCustomerExist, createCustomer)

router.post('/login', loginCustomer)

module.exports = router