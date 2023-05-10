const orderSchema = require("../models/order.model");


const createOrder = async (req, res) => {
    try {
        const { order_name, billing_address, quantity, price } = req.body
        const currentUser = req.user
        if (currentUser && currentUser?._id) {
            if (order_name && billing_address && quantity && price) {
                const total = parseFloat(price) * parseFloat(quantity)
                const order = new orderSchema(req.body)
                order.total = parseFloat(total)
                order.user_id = currentUser?._id
                order.date_ordered = new Date().getTime()
                const response = await order.save()
                if (response && response?._id) {
                    res.status(200).json({ message: 'Order created', success: true, payload: response, })
                }
                else {
                    res.status(400).json({ message: 'Unable to create order', success: false })
                }
            }
            else {
                res.status(400).json({ message: 'Some fields are empty', success: false })
            }
        }
        else {
            res.status(401).json({ message: 'Unauthorized access', success: false })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}

const getCustmerOrders = async (req, res, next) => {
    try {
        const currentUser = req.user
        if (currentUser && currentUser?._id) {
            const { limit, page } = req.query;
            const options = {
                page: page || 1,
                limit: limit || 5,
                sort: {
                    createdAt: -1,
                },
                populate: ['user_id']
            };
            const response = await orderSchema.paginate({}, options);
            if (response) {
                const { totalDocs, totalPages, pagingCounter, prevPage, nextPage, docs } = response
                const payload = {
                    orders: docs,
                    totalDocs, limit: response.limit, totalPages, page: response.page, pagingCounter, prevPage, nextPage
                };
                res.status(200).json({ message: 'Order retrieved', success: true, payload: payload, })
            }
            else {
                res.status(400).json({ message: 'Unable to get order', success: false })
            }
        } else {
            res.status(401).json({ message: 'Unauthorized access', success: false })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}

//NOTE - In the query pass in a startPrice and endPrice
const filterCustmerOrders = async (req, res, next) => {
    try {
        const currentUser = req.user
        const { price, asc } = req.query;
        const { startPrice, endPrice } = req.query;
        if (currentUser && currentUser?._id) {
            const response = await orderSchema.find({ price: { $gte: parseInt(startPrice), $lte: parseInt(endPrice) } })
            if (response) {
                res.status(200).json({ message: 'Order retrieved', success: true, payload: response })
            }
            else {
                res.status(400).json({ message: 'Unable to get order', success: false })
            }
        } else {
            res.status(401).json({ message: 'Unauthorized access', success: false })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}


//NOTE - To use sort pass asc=1 or -1 as url params for ascending and descending order
const sortCustmerOrders = async (req, res, next) => {
    try {
        const currentUser = req.user
        const { asc } = req.params
        if (currentUser && currentUser?._id) {
            const response = await orderSchema.find().sort({ "price": parseInt(asc), "_id": 1 })
            if (response) {
                res.status(200).json({ message: 'Order retrieved', success: true, payload: response })
            }
            else {
                res.status(400).json({ message: 'Unable to get order', success: false })
            }
        } else {
            res.status(401).json({ message: 'Unauthorized access', success: false })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}


module.exports = {
    createOrder,
    getCustmerOrders,
    filterCustmerOrders,
    sortCustmerOrders
}