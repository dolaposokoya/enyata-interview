const express = require('express')
const { createOrder, getCustmerOrders, filterCustmerOrders } = require('../controllers/order.controller')
const { verifyToken } = require('../middlewares/authorization.middleware')


const router = express.Router()

router.post('/create-order', verifyToken, createOrder)

router.get('/customer-order', verifyToken, getCustmerOrders)

router.get('/filter-customer-orders', verifyToken, filterCustmerOrders)

module.exports = router