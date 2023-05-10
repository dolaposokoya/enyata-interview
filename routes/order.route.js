const express = require('express')
const { createOrder, getCustmerOrders, filterCustmerOrders, sortCustmerOrders } = require('../controllers/order.controller')
const { verifyToken } = require('../middlewares/authorization.middleware')


const router = express.Router()

router.post('/create', verifyToken, createOrder)

router.get('/orders', verifyToken, getCustmerOrders)

router.get('/filter', verifyToken, filterCustmerOrders)

router.get('/sort/:asc', verifyToken, sortCustmerOrders)

module.exports = router