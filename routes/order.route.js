const express = require('express')
const { createOrder, getCustmerOrders, filterCustmerOrders, sortCustmerOrders } = require('../controllers/order.controller')
const { verifyToken } = require('../middlewares/authorization.middleware')


const router = express.Router()

router.post('/create-order', verifyToken, createOrder)

router.get('/customer-order', verifyToken, getCustmerOrders)

router.get('/filter-customer-orders', verifyToken, filterCustmerOrders)

router.get('/sort-customer-orders/:asc', verifyToken, sortCustmerOrders)

module.exports = router